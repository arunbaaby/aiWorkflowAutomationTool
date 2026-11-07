import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  type Connection,
  useNodesState,
  useEdgesState,
  useReactFlow,
  addEdge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import { WorkflowNode } from './WorkflowNode';
import { ConfigPanel } from './ConfigPanel';
import { API_BASE_URL } from '../config/api';

const nodeTypes = {
  workflowNode: WorkflowNode,
};

// Initial nodes preloaded to match the screenshot layout
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 120, y: 160 },
    data: {
      label: 'Nodq Input',
      nodeType: 'input',
      icon: '📥',
      fieldType: 'Text',
      params: { fieldName: '' },
    },
  },
  {
    id: '2',
    type: 'workflowNode',
    position: { x: 440, y: 180 },
    data: {
      label: 'Gemini',
      nodeType: 'gemini',
      icon: '✨',
      params: { systemPrompt: '', userPrompt: '' },
    },
  },
  {
    id: '3',
    type: 'workflowNode',
    position: { x: 800, y: 170 },
    data: {
      label: 'Output',
      nodeType: 'output',
      icon: '📧',
      params: {},
    },
  },
];

// Initial edges matching the screenshot connections and labels
const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    sourceHandle: 'output',
    targetHandle: 'user-prompt',
    label: '',
    animated: true,
    style: { stroke: '#60a5fa', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#60a5fa',
      width: 14,
      height: 14,
    },
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    sourceHandle: 'llm-response',
    targetHandle: 'input',
    label: '',
    animated: true,
    style: { stroke: '#60a5fa', strokeWidth: 2 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#60a5fa',
      width: 14,
      height: 14,
    },
  },
];

let idCounter = 4;
const getId = () => `node_${idCounter++}`;

export function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const [isRunning, setIsRunning] = useState<boolean>(false);

  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow/type');
      const label = event.dataTransfer.getData('application/reactflow/label');
      const icon = event.dataTransfer.getData('application/reactflow/icon');

      if (!type || !label) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type: 'workflowNode',
        position,
        data: {
          label,
          icon,
          nodeType: type,
          params: {},
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((currentEdges) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: { stroke: '#60a5fa', strokeWidth: 2 },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#60a5fa',
              width: 14,
              height: 14,
            },
          },
          currentEdges
        )
      ),
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onUpdateLabel = useCallback(
    (id: string, newLabel: string) => {
      setNodes((currentNodes: Node[]) =>
        currentNodes.map((node: Node) =>
          node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
        )
      );
      setSelectedNode((prev) =>
        prev && prev.id === id ? { ...prev, data: { ...prev.data, label: newLabel } } : prev
      );
    },
    [setNodes]
  );

  // const updateParams = useCallback(
  //   (id: string, key: string, value: any) => {
  //     setNodes((currentNodes: Node[]) =>
  //       currentNodes.map((node: Node) => {
  //         if (node.id === id) {
  //           const currentParams = (node.data?.params as Record<string, any>) || {};
  //           const updatedParams = { ...currentParams, [key]: value };
  //           return {
  //             ...node,
  //             data: {
  //               ...node.data,
  //               params: updatedParams,
  //             },
  //           };
  //         }
  //         return node;
  //       })
  //     );

  //     setSelectedNode((prev) =>
  //       prev && prev.id === id
  //         ? {
  //           ...prev,
  //           data: {
  //             ...prev.data,
  //             params: {
  //               ...((prev.data?.params as Record<string, any>) || {}),
  //               [key]: value,
  //             },
  //           },
  //         }
  //         : prev
  //     );
  //   },
  //   [setNodes]
  // );

  const onDeleteNode = useCallback(
    (id: string) => {
      setNodes((currentNodes: Node[]) => currentNodes.filter((node: Node) => node.id !== id));
      setEdges((currentEdges) =>
        currentEdges.filter((edge) => edge.source !== id && edge.target !== id)
      );
      setSelectedNode(null);
    },
    [setNodes, setEdges]
  );

  const handleRunWorkflow = async () => {
    setIsRunning(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/workflows/run`, {
        method: "POST",
        body: JSON.stringify({
          nodes,
          edges,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Workflow execution failed:", data);
        return;
      }

      console.log("Workflow execution response:", data);
    } catch (error) {
      console.error("Network or server error while running workflow:", error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <main className="flex-grow relative bg-[#f8fafc] overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
        attributionPosition="top-right"
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
      >
        <Background color="#cbd5e1" gap={20} size={1.2} />
        <Controls
          className="!bg-white !shadow-md !border !border-slate-200 !rounded-xl overflow-hidden !left-6 !bottom-6"
          showInteractive={false}
        />
      </ReactFlow>

      {/* Floating Bottom Action Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 pointer-events-auto">
        <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs tracking-wider px-6 py-2.5 rounded-xl shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5" onClick={handleRunWorkflow} disabled={isRunning}>
          <span>{isRunning ? "Running..." : "RUN"}</span>
        </button>
        <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-md transition-colors cursor-pointer">
          Deploy
        </button>
      </div>

      {
        selectedNode && (
          <ConfigPanel
            node={selectedNode}
            onUpdateLabel={onUpdateLabel}
            onDeleteNode={onDeleteNode}
            onClose={() => setSelectedNode(null)}
          />
        )
      }
    </main >
  );
}

import { ReactFlow, Background, Controls, type Node, type Edge, type Connection, useNodesState, useEdgesState, useReactFlow, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from 'react';
import { WorkflowNode } from './WorkflowNode';
import { ConfigPanel } from './ConfigPanel';

const nodeTypes = {
  workflowNode: WorkflowNode,
}

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

let id = 0;
// increment the id and return the new id for each node first node id = 0 second= +1
const getId = () => `node_${id++}`;

export function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData(
      "application/reactflow/type"
    );

    const label = event.dataTransfer.getData(
      "application/reactflow/label"
    );

    const icon = event.dataTransfer.getData(
      "application/reactflow/icon"
    );

    if (!type || !label || !icon) {
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
        params: {}
      },
    };

    setNodes((nodes) => nodes.concat(newNode));
  }, [screenToFlowPosition, setNodes]);

  const onConnect = useCallback(
    (connection: Connection) => setEdges((currentEdges) => addEdge(connection, currentEdges)),
    [setEdges]
  );

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const onUpdateLabel = useCallback((id: string, newLabel: string) => {
    setNodes((currentNodes: Node[]) =>
      currentNodes.map((node: Node) => node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node)
    );
    setSelectedNode((prev) =>
      prev && prev.id === id ? { ...prev, data: { ...prev.data, label: newLabel } } : prev
    );
  }, [setNodes]);

  const updateParams = useCallback((id: string, key: string, value: any) => {
    setNodes((currentNodes: Node[]) =>
      currentNodes.map((node: Node) => {
        if (node.id === id) {
          const currentParams = (node.data?.params as Record<string, any>) || {};
          const updatedParams = { ...currentParams, [key]: value };
          return {
            ...node,
            data: {
              ...node.data,
              params: updatedParams,
            },
          };
        }
        return node;
      })
    );

    setSelectedNode((prev) =>
      prev && prev.id === id
        ? {
          ...prev,
          data: {
            ...prev.data,
            params: {
              ...((prev.data?.params as Record<string, any>) || {}),
              [key]: value,
            },
          },
        }
        : prev
    );
  }, [setNodes]);


  const onDeleteNode = useCallback((id: string) => {
    setNodes((currentNodes: Node[]) => currentNodes.filter((node: Node) => node.id !== id));
    setEdges((currentEdges) =>
      currentEdges.filter((edge) =>
        edge.source !== id && edge.target !== id
      ));
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  return (
    <main className="flex-grow relative">
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
        <Background color="var(--color-canvas-dots)" gap={16} />
        <Controls className="shadow-lg border-none rounded-lg" />
      </ReactFlow>
      {selectedNode && (
        <ConfigPanel
          node={selectedNode}
          onUpdateLabel={onUpdateLabel}
          onDeleteNode={onDeleteNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </main>
  );
}

import type { CanonicalNode, CanonicalEdge } from '../types/workflow.types.js';
import {  InputExecutor } from '../executors/input.executor.js';
import type { SingleNodeExecutionResult } from '../executors/executor.types.js';

export function normalizeWorkflow(rawNodes: any[], rawEdges: any[]): {
    nodes: CanonicalNode[];
    edges: CanonicalEdge[];
} {
    const nodes: CanonicalNode[] = rawNodes.map((n) => ({
        id: n.id,
        type: (n.data?.nodeType || n.type || 'unknown').toLowerCase(),
        label: n.data?.label || n.id,
        params: (n.data?.params as Record<string, unknown>) || {},
    }));

    const edges: CanonicalEdge[] = rawEdges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: e.sourceHandle,
        targetHandle: e.targetHandle,
    }));

    return { nodes, edges };
};

export async function executeWorkflow(nodes:CanonicalNode[], executionOrder: string[]) {
    const inputExecutor = new InputExecutor();
    const context: Record<string, unknown> = {};
    const results: Record< string, SingleNodeExecutionResult> = {};
    
    for (const nodeId of executionOrder){
        const node = nodes.find((n)=>n.id === nodeId);
        if(!node) continue;
        if(node.type === 'input'){
            const result = await inputExecutor.execute(node, context);
            results[node.id] = result;
            if(result.status === 'SUCCESS'){
                context[node.id] = result.output;
            }
        }
    }
    
    return {executionOrder, results, context};
}
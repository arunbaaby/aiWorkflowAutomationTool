import type { CanonicalNode, CanonicalEdge } from '../types/workflow.types.js';

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
}
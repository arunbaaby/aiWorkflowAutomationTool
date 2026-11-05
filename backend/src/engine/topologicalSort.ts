import type { CanonicalEdge, CanonicalNode } from "../types/workflow.types.js";

export function buildGraph(nodes: CanonicalNode[], edges: CanonicalEdge[]) {
    const adjacencyList = new Map<string, string[]>();
    const inDegree = new Map<string, number>();

    for (const node of nodes) {
        adjacencyList.set(node.id, []);
        inDegree.set(node.id, 0);
    }

    for (const edge of edges) {
        const { source, target } = edge;
        adjacencyList.get(source)?.push(target);
        const currentInDegree = inDegree.get(target) || 0;
        inDegree.set(target, currentInDegree + 1);
    }

    return {
        adjacencyList, inDegree
    }
}

export function topologicalSort(nodes: CanonicalNode[], edges: CanonicalEdge[]) {
    const { adjacencyList, inDegree } = buildGraph(nodes, edges);

    const queue: string[] = [];
    const executionOrder: string[] = [];

    for (const [nodeId, degree] of inDegree.entries()) {
        if (degree === 0) {
            queue.push(nodeId);
        }
    }

    while (queue.length > 0) {
        const curr = queue.shift()!;
        executionOrder.push(curr);

        for (const neighbor of adjacencyList.get(curr) || []) {
            const currentInDegree = inDegree.get(neighbor) || 0;
            inDegree.set(neighbor, currentInDegree - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }
    if (executionOrder.length !== nodes.length) {
        throw new Error('Cycle detected in workflow graph');
    }
    return executionOrder;
}
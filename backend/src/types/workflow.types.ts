export interface CanonicalNode {
    id: string;
    type: string;
    label: string;
    params: Record<string, unknown>;
}

export interface CanonicalEdge {
    id?: string;
    source: string;
    target: string;
    sourceHandle?: string | null;
    targetHandle?: string | null;
}

export type ExecutionStatus = 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'SKIPPED';

export interface NodeExecutionInput {
    node: CanonicalNode;
    context: Record<string, unknown>;
}

import type { CanonicalNode, ExecutionStatus } from "../types/workflow.types.js";

export interface SingleNodeExecutionResult {
    nodeId: string;
    nodeType: string;
    status: ExecutionStatus;
    output?: unknown;
    error?: string;
    durationMs: number;
    isMock: boolean;
}

export interface INodeExecutor {
    execute(
        node: CanonicalNode,
        context: Record<string, unknown>
    ): Promise<SingleNodeExecutionResult>;
}
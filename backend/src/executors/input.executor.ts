import type { CanonicalNode } from "../types/workflow.types.js";
import type { INodeExecutor, SingleNodeExecutionResult } from "./executor.types.js";

export class InputExecutor implements INodeExecutor {
    async execute(node: CanonicalNode, context: Record<string, unknown>): Promise<SingleNodeExecutionResult> {
        const startTime = Date.now();
        const inputPayload = node.params.fieldName || node.params.inputData || 'Default input query';

        const durationMs = Date.now() - startTime;
        return {
            nodeId: node.id,
            nodeType: node.type,
            status: 'SUCCESS',
            output: {
                text: inputPayload,
                timestamp: new Date().toISOString(),
            },
            durationMs,
            isMock: true,
        };
    }
}

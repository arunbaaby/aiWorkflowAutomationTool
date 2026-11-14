import { GoogleGenAI } from "@google/genai";
import type { INodeExecutor, SingleNodeExecutionResult } from "./executor.types.js";
import type { CanonicalNode } from "../types/workflow.types.js";

export class GeminiExecutor implements INodeExecutor {
    private ai: GoogleGenAI;
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY || '';

        if (!apiKey) {
            console.warn('⚠️ WARNING: GEMINI_API_KEY is not defined in environment variables.');
        }

        this.ai = new GoogleGenAI({ apiKey });
    }
    async execute(node: CanonicalNode, context: Record<string, unknown>): Promise<SingleNodeExecutionResult> {
        const startTime = Date.now();
        try {
            const userPrompt = (node.params?.userPrompt as string) || '';
            const incomingTexts = Object.values(context)
                .map((val: any) => {

                    if (typeof val === 'object' && val?.text) {
                        return val.text;
                    }
                    else if (typeof val === 'string') {
                        return val;
                    }
                    else {
                        return '';
                    }
                })
                .filter(Boolean);

            // 3. Combine them: if incoming wire data exists, supply it with the prompt
            let finalPrompt = userPrompt;
            if (incomingTexts.length > 0) {
                finalPrompt = userPrompt
                    ? `${userPrompt}\n\nInput Context:\n${incomingTexts.join('\n')}`
                    : incomingTexts.join('\n');
            }
            if (!finalPrompt.trim()) {
                finalPrompt = 'Hello from NODQ workflow!';
            }
            // 4. Call Google Gemini API
            const response = await this.ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: finalPrompt,
            });
            const outputText = response.text || '';
            const durationMs = Date.now() - startTime;
            return {
                nodeId: node.id,
                nodeType: node.type,
                status: 'SUCCESS',
                output: {
                    text: outputText,
                    promptUsed: finalPrompt,
                    timestamp: new Date().toISOString(),
                },
                durationMs,
                isMock: false,
            };
        } catch (error: any) {
            const durationMs = Date.now() - startTime;
            return {
                nodeId: node.id,
                nodeType: node.type,
                status: 'FAILED',
                error: error.message || 'Gemini execution failed',
                durationMs,
                isMock: false,
            };
        }
    }
}
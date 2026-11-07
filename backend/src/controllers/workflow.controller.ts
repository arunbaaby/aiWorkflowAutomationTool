import type { Request, Response } from "express";
import { normalizeWorkflow } from "../services/workflow.service.js";
import { topologicalSort } from "../engine/topologicalSort.js";

export async function runWorkflowController(req: Request, res: Response) {
    try {

        const { nodes = [], edges = [] } = req.body;

        if (nodes.length <= 0) {
            return res.status(400).json({
                success: false,
                error: "Worflow must contain at least one node to execute."
            })
        }

        // renaming the nodes and  to canonical nodes and  for the ease of executionedges
        const { nodes: canonicalNodes, edges: canonicalEdges } = normalizeWorkflow(nodes, edges);

        const executionOrder = topologicalSort(canonicalNodes, canonicalEdges);

        return res.json({ success: true, executionOrder });

    } catch (error: any) {
        return res.status(400).json({ success: false, error: error.message || "Failed to execute workflow" });
    }
}
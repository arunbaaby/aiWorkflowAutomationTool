import express from 'express';
import cors from 'cors';
import { normalizeWorkflow } from './services/workflow.service.js';
import { topologicalSort } from './engine/topologicalSort.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/workflows/run', (req, res) => {
    // console.log('Received workflow from frontend:');
    // console.log('Nodes count:', req.body.nodes);
    // console.log('Edges count:', req.body.edges);

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

        console.log(executionOrder);

        return res.json({ success: true, executionOrder });

    } catch (error: any) {
        return res.status(400).json({ success: false, error: error.message || "Failed to execute workflow" });
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
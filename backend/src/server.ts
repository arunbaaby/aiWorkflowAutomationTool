import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/workflows/run', (req, res) => {
    console.log('Received workflow from frontend:');
    console.log('Nodes count:', req.body.nodes);
    console.log('Edges count:', req.body.edges);

    return res.json({
        success: true,
        message: 'Workflow received by backend successfully!',
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
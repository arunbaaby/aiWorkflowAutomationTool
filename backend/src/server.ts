import express from 'express';
import cors from 'cors';
import workflowRouter from './routes/workflow.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/workflows', workflowRouter);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
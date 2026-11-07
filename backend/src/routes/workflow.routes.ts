import { Router } from "express";
import { runWorkflowController } from "../controllers/workflow.controller.js";

const router = Router();
router.post('/run', runWorkflowController);

export default router;
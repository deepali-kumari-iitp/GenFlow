import { Router } from "express";
import {
  executeWorkflow,
  type WorkflowEdge,
  type WorkflowNode,
} from "../workflow/workflow.engine";

const router = Router();

router.post("/run", async (req, res) => {
  try {
    const { nodes, edges } = req.body as {
      nodes: WorkflowNode[];
      edges: WorkflowEdge[];
    };

    console.log("Workflow execution requested");

    const result = await executeWorkflow(
      nodes,
      edges,
    );

    console.log(
      "Workflow execution result:",
      result,
    );

    res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error(
      "Workflow execution error:",
      error,
    );

    res.status(500).json({
      success: false,
      message: "Workflow execution failed",
      error:
        error instanceof Error
          ? error.message
          : "Unknown error",
    });
  }
});

export default router;
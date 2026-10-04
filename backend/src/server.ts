import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import workflowRoutes from "./routes/workflow.routes";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/workflows", workflowRoutes);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "GenFlow backend is running",
  });
});

app.listen(PORT, () => {
  console.log(`GenFlow backend running on http://localhost:${PORT}`);
});
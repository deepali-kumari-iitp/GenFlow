import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type OnEdgesChange,
  type OnNodesChange,
} from "@xyflow/react";

import {
  ArrowLeft,
  Check,
  MoreHorizontal,
  Play,
  Save,
  Download,
  Upload,
  Sparkles,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import NodeLibrary from "../components/builder/NodeLibrary";

import CustomNode, {
  type WorkflowNodeData,
} from "../components/builder/CustomNode";

import NodeConfigPanel from "../components/builder/NodeConfigPanel";

import "@xyflow/react/dist/style.css";

/* =========================================================
   NODE TYPES
========================================================= */

const nodeTypes = {
  workflow: CustomNode,
};

/* =========================================================
   INITIAL NODES
========================================================= */

const initialNodes: Node<WorkflowNodeData>[] = [
  {
    id: "webhook-1",
    type: "workflow",
    position: {
      x: 180,
      y: 180,
    },
    data: {
      label: "Webhook Trigger",
      description: "Receive incoming data",
      category: "trigger",
      nodeType: "webhook",
    },
  },

  {
    id: "transform-1",
    type: "workflow",
    position: {
      x: 500,
      y: 180,
    },
    data: {
      label: "Transform Data",
      description: "Prepare workflow data",
      category: "data",
      nodeType: "transform",
    },
  },

  {
    id: "condition-1",
    type: "workflow",
    position: {
      x: 820,
      y: 180,
    },
    data: {
      label: "Condition",
      description: "Check workflow data",
      category: "logic",
      nodeType: "condition",
    },
  },

  {
    id: "email-1",
    type: "workflow",
    position: {
      x: 1130,
      y: 90,
    },
    data: {
      label: "Send Email",
      description: "Send notification",
      category: "action",
      nodeType: "email",
    },
  },
];

/* =========================================================
   INITIAL EDGES
========================================================= */

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "webhook-1",
    target: "transform-1",
    animated: true,
  },

  {
    id: "e2",
    source: "transform-1",
    target: "condition-1",
    animated: true,
  },

 {
  id: "e3",
  source: "condition-1",
  sourceHandle: "true",
  target: "email-1",
  animated: true,
},
];

/* =========================================================
   BUILDER CANVAS PROPS
========================================================= */

type BuilderCanvasProps = {
  nodes: Node<WorkflowNodeData>[];

  edges: Edge[];

  onNodesChange: OnNodesChange<Node<WorkflowNodeData>>;

  onEdgesChange: OnEdgesChange;

  onConnect: (connection: Connection) => void;

  onNodeSelect: (nodeId: string | null) => void;

  selectedNodeId: string | null;

  setNodes: React.Dispatch<
    React.SetStateAction<Node<WorkflowNodeData>[]>
  >;
};

/* =========================================================
   BUILDER CANVAS
========================================================= */

function BuilderCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeSelect,
  selectedNodeId,
  setNodes,
}: BuilderCanvasProps) {
  const { screenToFlowPosition } = useReactFlow();

  /* -------------------------------------------------------
     SELECTED NODE
  ------------------------------------------------------- */

  const selectedNode = nodes.find(
    (node) => node.id === selectedNodeId,
  );

  /* -------------------------------------------------------
     DROP NODE FROM LIBRARY
  ------------------------------------------------------- */

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const rawData =
        event.dataTransfer.getData(
          "application/genflow-node",
        );

      if (!rawData) {
        return;
      }

      try {
        const data = JSON.parse(rawData) as {
          type: string;
          label: string;
          description: string;
          category: WorkflowNodeData["category"];
        };

        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        const newNode: Node<WorkflowNodeData> = {
          id: `${data.type}-${Date.now()}`,
          type: "workflow",
          position,
          data: {
            label: data.label,
            description: data.description,
            category: data.category,
            nodeType: data.type,
          },
        };

        setNodes((currentNodes) => [
          ...currentNodes,
          newNode,
        ]);

        onNodeSelect(newNode.id);
      } catch (error) {
        console.error(
          "Failed to create workflow node:",
          error,
        );
      }
    },
    [
      screenToFlowPosition,
      setNodes,
      onNodeSelect,
    ],
  );

  /* -------------------------------------------------------
     UPDATE SELECTED NODE
  ------------------------------------------------------- */

  const updateSelectedNode = (
    updates: Partial<WorkflowNodeData>,
  ) => {
    if (!selectedNodeId) {
      return;
    }

    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              data: {
                ...node.data,
                ...updates,
              },
            }
          : node,
      ),
    );
  };

  /* -------------------------------------------------------
     CANVAS
  ------------------------------------------------------- */

  return (
    <div
      className="flex h-full min-h-0 flex-1"
      onDrop={onDrop}
      onDragOver={(event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }}
    >
      {/* =====================================================
          LEFT NODE LIBRARY
      ===================================================== */}

      <NodeLibrary
  onNodeSelect={(node) => {
    const newNode: Node<WorkflowNodeData> = {
      id: `${node.type}-${Date.now()}`,
      type: "workflow",
      position: {
        x: 300 + Math.random() * 200,
        y: 200 + Math.random() * 200,
      },
      data: {
        label: node.label,
        description: node.description,
        category: node.category,
        nodeType: node.type,
      },
    };

    setNodes((currentNodes) => [
      ...currentNodes,
      newNode,
    ]);

    onNodeSelect(newNode.id);
  }}
/>

      {/* =====================================================
          REACT FLOW CANVAS
      ===================================================== */}

      <div className="relative min-h-0 min-w-0 flex-1 h-full w-full">
        <ReactFlow
        style={{ width: "100%", height: "100%" }}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => {
            onNodeSelect(node.id);
          }}
          onPaneClick={() => {
            onNodeSelect(null);
          }}
          fitView
          deleteKeyCode={["Backspace", "Delete"]}
          className="bg-[#050507]"
        >
          <Background
            color="#27272a"
            gap={28}
            size={1}
          />

          <Controls />

          <MiniMap
            nodeColor="#7c3aed"
            maskColor="rgba(5, 5, 7, 0.75)"
          />
        </ReactFlow>

        {/* ===================================================
            CANVAS HELPER
        =================================================== */}

        <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-white/[0.08] bg-[#101016]/90 px-4 py-2 text-[10px] text-zinc-600 backdrop-blur-xl">
          Drag nodes from the library · Connect handles to
          build
        </div>
      </div>

      {/* =====================================================
          RIGHT CONFIGURATION PANEL
      ===================================================== */}

      {selectedNode && (
        <NodeConfigPanel
          data={selectedNode.data}
          onChange={updateSelectedNode}
          onClose={() => onNodeSelect(null)}
        />
      )}
    </div>
  );
}

/* =========================================================
   WORKFLOW BUILDER PAGE
========================================================= */

function WorkflowBuilderPage() {
  /* -------------------------------------------------------
     NODES
  ------------------------------------------------------- */

  const [nodes, setNodes] =
    useState<Node<WorkflowNodeData>[]>(() => {
      try {
        const savedWorkflow =
          localStorage.getItem("genflow-workflow");

        if (savedWorkflow) {
          const parsed = JSON.parse(savedWorkflow);

          if (
            Array.isArray(parsed.nodes) &&
            parsed.nodes.length > 0
          ) {
            return parsed.nodes as Node<WorkflowNodeData>[];
          }
        }
      } catch (error) {
        console.error(
          "Failed to load saved nodes:",
          error,
        );
      }

      return initialNodes;
    });

  const [runResult, setRunResult] = useState<{
    success: boolean;
    executionId: string;
    status: "completed" | "failed";
    executedNodes: string[];
    logs: string[];
  } | null>(null);

const [edges, setEdges] =
  useState<Edge[]>(() => {
    try {
      const savedWorkflow =
        localStorage.getItem("genflow-workflow");

      if (savedWorkflow) {
        const parsed = JSON.parse(savedWorkflow);

       if (Array.isArray(parsed.edges)) {
  return parsed.edges.map((edge: Edge) => {
    if (
      edge.source === "condition-1" &&
      !edge.sourceHandle
    ) {
      if (edge.target === "email-1") {
        return {
          ...edge,
          sourceHandle: "true",
        };
      }

      if (
        edge.target === "http-1" ||
        edge.target.startsWith("http-")
      ) {
        return {
          ...edge,
          sourceHandle: "false",
        };
      }
    }

    return edge;
  });
}
      }
    } catch (error) {
      console.error(
        "Failed to load saved edges:",
        error,
      );
    }

    return initialEdges;
  });

const [selectedNodeId, setSelectedNodeId] =
  useState<string | null>(null);

 const [workflowName] = useState("Customer Notification");

const [showTemplates, setShowTemplates] = useState(false);

const [saveStatus, setSaveStatus] = useState<

  "saved" | "unsaved"
>(() => {
  return localStorage.getItem(
    "genflow-workflow",
  )
    ? "saved"
    : "unsaved";
});

  /* -------------------------------------------------------
     RUN STATUS
  ------------------------------------------------------- */

  const [runStatus, setRunStatus] = useState<
    "idle" | "running" | "success"
  >("idle");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  /* -------------------------------------------------------
     MARK WORKFLOW UNSAVED WHEN NODES CHANGE
  ------------------------------------------------------- */

  /* -------------------------------------------------------
     NODE CHANGES
  ------------------------------------------------------- */

  const onNodesChange: OnNodesChange<
    Node<WorkflowNodeData>
  > = useCallback(
    (changes) => {
      setNodes((currentNodes) => {
        let updatedNodes = currentNodes;

        for (const change of changes) {
          if (change.type === "position") {
            updatedNodes = updatedNodes.map((node) =>
              node.id === change.id
                ? {
                    ...node,
                    position:
                      change.position ??
                      node.position,
                  }
                : node,
            );
          }

          if (change.type === "remove") {
            updatedNodes = updatedNodes.filter(
              (node) => node.id !== change.id,
            );
          }

          if (change.type === "select") {
            updatedNodes = updatedNodes.map(
              (node) =>
                node.id === change.id
                  ? {
                      ...node,
                      selected:
                        change.selected,
                    }
                  : node,
            );
          }
        }

        return updatedNodes;
      });
    },
    [],
  );

  /* -------------------------------------------------------
     EDGE CHANGES
  ------------------------------------------------------- */

  const onEdgesChange: OnEdgesChange =
    useCallback((changes) => {
      setEdges((currentEdges) => {
        let updatedEdges = currentEdges;

        for (const change of changes) {
          if (change.type === "remove") {
            updatedEdges = updatedEdges.filter(
              (edge) => edge.id !== change.id,
            );
          }
        }

        return updatedEdges;
      });
    }, []);

  /* -------------------------------------------------------
     CONNECT NODES
  ------------------------------------------------------- */

 const onConnect = useCallback(
  (connection: Connection) => {
    console.log("New connection:", connection);

    setEdges((currentEdges) => {
      const cleanedEdges =
        connection.sourceHandle
          ? currentEdges.filter(
              (edge) =>
                !(
                  edge.source === connection.source &&
                  edge.target === connection.target
                ),
            )
          : currentEdges;

      return addEdge(
        {
          ...connection,
          sourceHandle:
            connection.sourceHandle ?? null,
          animated: true,
        },
        cleanedEdges,
      );
    });
  },
  [],
);

  /* -------------------------------------------------------
     SAVE WORKFLOW
  ------------------------------------------------------- */

  const saveWorkflow = () => {
    try {
      const workflow = {
  name: workflowName,
  nodes,
  edges,
  savedAt: new Date().toISOString(),
};

      localStorage.setItem(
        "genflow-workflow",
        JSON.stringify(workflow),
      );

      setSaveStatus("saved");
    } catch (error) {
      console.error(
        "Failed to save workflow:",
        error,
      );
    }
  };
// export workflow
  const exportWorkflow = () => {
  const workflow = {
    name: "Customer Notification",
    nodes,
    edges,
    exportedAt: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(workflow, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "genflow-workflow.json";
  link.click();

  URL.revokeObjectURL(url);
};


  const validateWorkflow = (): string[] => {
  const errors: string[] = [];

  const triggers = nodes.filter(
    (node) => node.data.category === "trigger",
  );

  if (triggers.length === 0) {
    errors.push("Workflow must have at least one trigger.");
  }

  if (triggers.length > 1) {
    errors.push("Workflow can have only one starting trigger.");
  }

  nodes.forEach((node) => {
    const data = node.data as WorkflowNodeData & {
      condition?: {
        field?: string;
        operator?: string;
        value?: string;
      };
      http?: {
        method?: string;
        url?: string;
      };
    };

    if (data.nodeType === "condition") {
      if (!data.condition?.field?.trim()) {
        errors.push(`Condition "${data.label}" is missing a field.`);
      }

      if (!data.condition?.operator?.trim()) {
        errors.push(`Condition "${data.label}" is missing an operator.`);
      }

      if (!data.condition?.value?.trim()) {
        errors.push(`Condition "${data.label}" is missing a value.`);
      }
    }

    if (data.nodeType === "http") {
  const url = data.http?.url?.trim();

  if (!url) {
    errors.push(`HTTP Request "${data.label}" is missing a URL.`);
  } else {
    try {
      const parsedUrl = new URL(url);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        errors.push(
          `HTTP Request "${data.label}" must use an HTTP or HTTPS URL.`,
        );
      }
    } catch {
      errors.push(
        `HTTP Request "${data.label}" has an invalid URL.`,
      );
    }
  }
}
  });

  return errors;
};
const importWorkflow = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const importedWorkflow = JSON.parse(
        reader.result as string,
      );

      if (
        !Array.isArray(importedWorkflow.nodes) ||
        !Array.isArray(importedWorkflow.edges)
      ) {
        throw new Error("Invalid workflow file");
      }

      setNodes(importedWorkflow.nodes);
      setEdges(importedWorkflow.edges);

      setSelectedNodeId(null);
      setRunResult(null);
      setValidationErrors([]);
      setRunStatus("idle");
      setSaveStatus("unsaved");
    } catch {
      alert("Invalid GenFlow workflow file.");
    }
  };

  reader.readAsText(file);

  event.target.value = "";
};
  /* -------------------------------------------------------
     LOAD CUSTOMER NOTIFICATION TEMPLATE
  ------------------------------------------------------- */

  const loadCustomerNotificationTemplate = () => {
    const templateNodes: Node<
  WorkflowNodeData & {
    condition?: {
      field?: string;
      operator?: string;
      value?: string;
    };
    http?: {
      method?: string;
      url?: string;
    };
  }
>[] = [
      {
        id: "webhook-1",
        type: "workflow",
        position: {
          x: 100,
          y: 220,
        },
        data: {
          label: "Webhook Trigger",
          description: "Receive incoming data",
          category: "trigger",
          nodeType: "webhook",
        },
      },
      {
        id: "transform-1",
        type: "workflow",
        position: {
          x: 420,
          y: 220,
        },
        data: {
          label: "Transform Data",
          description: "Prepare workflow data",
          category: "data",
          nodeType: "transform",
        },
      },
      {
        id: "condition-1",
        type: "workflow",
        position: {
          x: 740,
          y: 220,
        },
        data: {
          label: "Condition",
          description: "Check workflow data",
          category: "logic",
          nodeType: "condition",
          condition: {
            field: "status",
            operator: "equals",
            value: "approved",
          },
        },
      },
      {
        id: "email-1",
        type: "workflow",
        position: {
          x: 1060,
          y: 100,
        },
        data: {
          label: "Send Email",
          description: "Send notification",
          category: "action",
          nodeType: "email",
        },
      },
      {
        id: "http-1",
        type: "workflow",
        position: {
          x: 1060,
          y: 360,
        },
        data: {
          label: "HTTP Request",
          description: "Call an API",
          category: "action",
          nodeType: "http",
          http: {
            method: "POST",
            url: "https://httpbin.org/post",
          },
        },
      },
    ];

    const templateEdges: Edge[] = [
      {
        id: "e1",
        source: "webhook-1",
        target: "transform-1",
        animated: true,
      },
      {
        id: "e2",
        source: "transform-1",
        target: "condition-1",
        animated: true,
      },
      {
        id: "e3",
        source: "condition-1",
        sourceHandle: "true",
        target: "email-1",
        animated: true,
      },
      {
        id: "e4",
        source: "condition-1",
        sourceHandle: "false",
        target: "http-1",
        animated: true,
      },
    ];

    setNodes(templateNodes);
    setEdges(templateEdges);
    setSelectedNodeId(null);
    setRunResult(null);
    setValidationErrors([]);
    setRunStatus("idle");
    setSaveStatus("unsaved");

   localStorage.setItem(
  "genflow-workflow",
  JSON.stringify({
    name: "Customer Notification",
    nodes: templateNodes,
    edges: templateEdges,
    savedAt: new Date().toISOString(),
  }),
);

setSaveStatus("saved");
  };
  /* -------------------------------------------------------
     RUN WORKFLOW
  ------------------------------------------------------- */

 const runWorkflow = async () => {
  if (runStatus === "running") {
    return;
  }

 const validationErrors = validateWorkflow();

if (validationErrors.length > 0) {
  console.error(
    "Workflow validation failed:",
    validationErrors,
  );

  setValidationErrors(validationErrors);
  setRunStatus("idle");
  return;
}

setValidationErrors([]);
setValidationErrors([]);
  setRunStatus("running");

  try {
    console.log("Starting workflow execution...");
    console.log("Nodes:", nodes);
    console.log("Edges:", edges);

    const response = await fetch(
      "http://localhost:5000/api/workflows/run",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Customer Notification",
          nodes,
          edges,
        }),
      },
    );

    console.log(
      "Backend response status:",
      response.status,
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Workflow execution failed: ${response.status} ${errorText}`,
      );
    }

    const result = await response.json();

console.log(
  "Workflow execution result:",
  result,
);

setRunResult(result);

setRunStatus("success");
} catch (error) {
  console.error(
    "Workflow execution error:",
    error,
  );

  setRunResult(null);
  setRunStatus("idle");
}
};
  /* -------------------------------------------------------
     RESET RUN STATUS
  ------------------------------------------------------- */

  useEffect(() => {
    if (runStatus !== "success") {
      return;
    }

    const timer = setTimeout(() => {
      setRunStatus("idle");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [runStatus]);

  /* -------------------------------------------------------
     RENDER
  ------------------------------------------------------- */

  return (
    <ReactFlowProvider>
      <div className="flex h-screen flex-col overflow-hidden bg-[#050507] text-white">
        {validationErrors.length > 0 && (
  <div className="absolute left-1/2 top-20 z-50 w-[420px] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-xl border border-red-500/20 bg-[#180b0d]/95 p-4 shadow-2xl backdrop-blur-xl">
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        !
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-red-300">
          Workflow cannot run
        </p>

        <div className="mt-2 space-y-1">
          {validationErrors.map((error, index) => (
            <p
              key={`${error}-${index}`}
              className="text-xs leading-relaxed text-red-200/70"
            >
              • {error}
            </p>
          ))}
        </div>
      </div>
    </div>
  </div>
)}
        {runResult && (
  <div className="absolute bottom-5 left-5 z-50 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d0d12]/95 shadow-2xl backdrop-blur-xl">

    <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
      <div>
        <p className="text-xs font-semibold text-white">
          Workflow Execution
        </p>

        <p className="mt-1 text-[10px] text-zinc-500">
          {runResult.executionId}
        </p>
      </div>

      <div
        className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
          runResult.success
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-red-500/10 text-red-400"
        }`}
      >
        {runResult.success ? "Completed" : "Failed"}
      </div>
    </div>

    <div className="max-h-56 overflow-y-auto px-4 py-3">
      <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
        Executed Nodes
      </p>

      <div className="space-y-2">
        {runResult.executedNodes.map((nodeId, index) => (
          <div
            key={nodeId}
            className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <Check size={11} />
            </span>

            <div className="min-w-0">
              <p className="text-xs text-zinc-200">
                Step {index + 1}
              </p>

              <p className="truncate text-[10px] text-zinc-500">
                {nodeId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <details className="border-t border-white/[0.07]">
      <summary className="cursor-pointer px-4 py-3 text-[10px] text-zinc-500 hover:text-zinc-300">
        View execution logs
      </summary>

      <div className="max-h-40 overflow-y-auto border-t border-white/[0.05] px-4 py-3">
        {runResult.logs.map((log, index) => (
          <p
            key={`${log}-${index}`}
            className="mb-1 font-mono text-[9px] leading-relaxed text-zinc-500"
          >
            {log}
          </p>
        ))}
      </div>
    </details>
  </div>
)}


        {/* =================================================
            TOP BAR
        ================================================= */}

        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#08080b] px-4">
          {/* -----------------------------------------------
              LEFT SIDE
          ----------------------------------------------- */}

          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
            >
              <ArrowLeft size={17} />
            </Link>

            <div className="hidden h-6 w-px bg-white/10 sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
                <Sparkles size={15} />
              </div>

              <div>
                <p className="text-xs font-medium">
                  Customer Notification
                </p>

                <p className="text-[10px] text-zinc-600">
                  {saveStatus === "saved"
                    ? "All changes saved"
                    : "Unsaved changes"}
                </p>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------
              RIGHT SIDE
          ----------------------------------------------- */}

      {/* ACTIONS */}
<div className="flex items-center gap-2">

  {/* SAVE */}
  <button
    type="button"
    onClick={saveWorkflow}
    className="hidden items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.05] hover:text-white sm:flex"
  >
    <Save size={14} />
    {saveStatus === "saved" ? "Saved" : "Save"}
  </button>
  {/* EXPORT */}

<button
  type="button"
  onClick={exportWorkflow}
  className="hidden items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.05] hover:text-white sm:flex"
>
  <Download size={14} />
  Export
</button>

{/* IMPORT */}

<label className="hidden cursor-pointer items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.05] hover:text-white sm:flex">
  <Upload size={14} />
  Import

  <input
    type="file"
    accept=".json,application/json"
    onChange={importWorkflow}
    className="hidden"
  />
</label>

  {/* RUN WORKFLOW */}
  <button
    type="button"
    onClick={runWorkflow}
    disabled={runStatus === "running"}
    className="flex items-center gap-2 rounded-lg bg-violet-500 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
  >
    <Play size={14} />

    {runStatus === "running"
      ? "Running..."
      : runStatus === "success"
        ? "Run Again"
        : "Run Workflow"}
  </button>

  {/* MORE OPTIONS */}
 <div className="relative">
  <button
    type="button"
    aria-label="More options"
    onClick={() => setShowTemplates((current) => !current)}
    className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
  >
    <MoreHorizontal size={17} />
  </button>

  {showTemplates && (
  <div className="absolute right-0 top-11 z-50 w-64 overflow-hidden rounded-xl border border-white/10 bg-zinc-950 shadow-2xl">
    <div className="border-b border-white/10 px-4 py-3">
      <p className="text-sm font-semibold text-white">Templates</p>
      <p className="mt-1 text-xs text-zinc-500">
        Start with a ready-made workflow
      </p>
    </div>

    <button
      type="button"
      onClick={() => {
        loadCustomerNotificationTemplate();
        setShowTemplates(false);
      }}
      className="w-full px-4 py-3 text-left transition hover:bg-white/5"
    >
      <p className="text-sm font-medium text-white">
        Customer Notification
      </p>
      <p className="mt-1 text-xs text-zinc-500">
        Webhook → Transform → Condition → Email / HTTP
      </p>
    </button>
  </div>
)}   


</div>

</div>
        </header>

        {/* =================================================
            BUILDER
        ================================================= */}

        <div className="flex min-h-0 flex-1">
          <BuilderCanvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeSelect={setSelectedNodeId}
            selectedNodeId={selectedNodeId}
            setNodes={setNodes}
          />
        </div>

        {/* =================================================
            STATUS
        ================================================= */}

        <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-white/[0.07] bg-[#101016]/95 px-3 py-2 text-[10px] text-zinc-500 shadow-2xl backdrop-blur-xl">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <Check size={10} />
          </span>

          {runStatus === "running"
            ? "Workflow running..."
            : runStatus === "success"
              ? "Workflow completed"
              : "Builder ready"}
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default WorkflowBuilderPage;
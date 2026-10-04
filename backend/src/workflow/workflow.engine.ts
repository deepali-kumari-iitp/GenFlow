export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  sourceHandle?: string | null;
}

export interface WorkflowNode {
  id: string;
  type?: string;
  position?: {
    x: number;
    y: number;
  };
  data: {
    label: string;
    description?: string;
    category: string;
    nodeType: string;
    [key: string]: unknown;
  };
}

export interface WorkflowExecutionResult {
  success: boolean;
  executionId: string;
  status: "completed" | "failed";
  executedNodes: string[];
  logs: string[];
}

type WorkflowData = Record<string, unknown>;

type ConditionConfig = {
  field?: string;
  operator?: string;
  value?: string;
};

/**
 * Temporary execution input.
 *
 * Later this will come from the webhook/API trigger.
 */
const executionData: WorkflowData = {
  status: "approved",
};

export async function executeWorkflow(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
): Promise<WorkflowExecutionResult> {
  const executionId = `exec-${Date.now()}`;

  const logs: string[] = [];
  const executedNodes: string[] = [];

  logs.push(
    `Workflow execution started: ${executionId}`,
  );

  // -------------------------------------------------------
  // VALIDATION
  // -------------------------------------------------------

  if (!nodes || nodes.length === 0) {
    return {
      success: false,
      executionId,
      status: "failed",
      executedNodes: [],
      logs: ["Workflow has no nodes"],
    };
  }

  if (!edges) {
    edges = [];
  }

  // -------------------------------------------------------
  // FIND START NODE
  // -------------------------------------------------------

  let currentNode = findStartNode(nodes, edges);

  if (!currentNode) {
    return {
      success: false,
      executionId,
      status: "failed",
      executedNodes: [],
      logs: [
        "Could not find a starting trigger node",
      ],
    };
  }

  logs.push(
    `Starting from: ${currentNode.data.label}`,
  );

  // -------------------------------------------------------
  // EXECUTION LOOP
  // -------------------------------------------------------

  const visited = new Set<string>();

  while (currentNode) {
    // Prevent infinite loops
    if (visited.has(currentNode.id)) {
      logs.push(
        `Cycle detected at node: ${currentNode.id}`,
      );

      return {
        success: false,
        executionId,
        status: "failed",
        executedNodes,
        logs,
      };
    }

    visited.add(currentNode.id);
    executedNodes.push(currentNode.id);

    logs.push(
      `Executing: ${currentNode.data.label}`,
    );

    // -----------------------------------------------------
    // EXECUTE CURRENT NODE
    // -----------------------------------------------------

    const executionResult = await executeNode(
      currentNode,
      logs,
      executionData,
    );

    // -----------------------------------------------------
    // FIND NEXT NODE
    // -----------------------------------------------------

    let nextNodeId: string | undefined;

    if (
      currentNode.data.nodeType === "condition"
    ) {
      const branch = executionResult.conditionResult
        ? "true"
        : "false";

      logs.push(
        `Condition result: ${branch.toUpperCase()}`,
      );

      nextNodeId = findNextNode(
        currentNode.id,
        edges,
        branch,
      );
    } else {
      nextNodeId = findNextNode(
        currentNode.id,
        edges,
      );
    }

    // -----------------------------------------------------
    // NO NEXT NODE
    // -----------------------------------------------------

    if (!nextNodeId) {
      logs.push(
        `No next node found after: ${currentNode.data.label}`,
      );

      break;
    }

    // -----------------------------------------------------
    // FIND TARGET NODE
    // -----------------------------------------------------

    const nextNode = nodes.find(
      (node) => node.id === nextNodeId,
    );

    if (!nextNode) {
      logs.push(
        `Target node not found: ${nextNodeId}`,
      );

      return {
        success: false,
        executionId,
        status: "failed",
        executedNodes,
        logs,
      };
    }

    currentNode = nextNode;
  }

  logs.push("Workflow execution completed");

  return {
    success: true,
    executionId,
    status: "completed",
    executedNodes,
    logs,
  };
}

// =======================================================
// FIND START NODE
// =======================================================

function findStartNode(
  nodes: WorkflowNode[],
  edges: WorkflowEdge[],
): WorkflowNode | undefined {
  const targetIds = new Set(
    edges.map((edge) => edge.target),
  );

  return nodes.find(
    (node) =>
      node.data.category === "trigger" &&
      !targetIds.has(node.id),
  );
}

// =======================================================
// FIND NEXT NODE
// =======================================================

function findNextNode(
  currentNodeId: string,
  edges: WorkflowEdge[],
  sourceHandle?: "true" | "false",
): string | undefined {
  // -------------------------------------------------------
  // CONDITION BRANCH
  // -------------------------------------------------------

  if (sourceHandle) {
    const branchEdge = edges.find(
      (edge) =>
        edge.source === currentNodeId &&
        edge.sourceHandle === sourceHandle,
    );

    return branchEdge?.target;
  }

  // -------------------------------------------------------
  // NORMAL NODE
  // -------------------------------------------------------

  const outgoingEdge = edges.find(
    (edge) => edge.source === currentNodeId,
  );

  return outgoingEdge?.target;
}

// =======================================================
// EXECUTE NODE
// =======================================================

async function executeNode(
  node: WorkflowNode,
  logs: string[],
  data: WorkflowData,
): Promise<{
  conditionResult: boolean;
}> {
  switch (node.data.nodeType) {
    // ---------------------------------------------------
    // WEBHOOK
    // ---------------------------------------------------

    case "webhook":
      logs.push("Webhook trigger received");

      logs.push(
        `Input data: ${JSON.stringify(data)}`,
      );

      return {
        conditionResult: true,
      };

    // ---------------------------------------------------
    // TRANSFORM
    // ---------------------------------------------------

    case "transform":
      logs.push(
        "Transforming workflow data",
      );

      return {
        conditionResult: true,
      };

    // ---------------------------------------------------
    // CONDITION
    // ---------------------------------------------------

    case "condition": {
      logs.push(
        "Evaluating workflow condition",
      );

      const condition =
        node.data.condition as
          | ConditionConfig
          | undefined;

      if (!condition) {
        logs.push(
          "No condition configuration found. Defaulting to TRUE.",
        );

        return {
          conditionResult: true,
        };
      }

      const field = condition.field ?? "";
      const operator =
        condition.operator ?? "equals";
      const expectedValue =
        condition.value ?? "";

      const actualValue = data[field];

      logs.push(
        `Condition field: ${field || "not configured"}`,
      );

      logs.push(
        `Actual value: ${String(actualValue ?? "")}`,
      );

      logs.push(
        `Operator: ${operator}`,
      );

      logs.push(
        `Expected value: ${expectedValue}`,
      );

      const result = evaluateCondition(
        actualValue,
        operator,
        expectedValue,
      );

      logs.push(
        `Condition evaluated to: ${result}`,
      );

      return {
        conditionResult: result,
      };
    }

    // ---------------------------------------------------
    // EMAIL
    // ---------------------------------------------------

    case "email":
      logs.push(
        "Preparing email notification",
      );

      logs.push(
        "Email action executed",
      );

      return {
        conditionResult: true,
      };

    // ---------------------------------------------------
    // HTTP
    // ---------------------------------------------------

    case "http": {
  logs.push("Preparing HTTP request");

  const httpConfig = node.data.http as
    | {
        method?: string;
        url?: string;
      }
    | undefined;

  const method = httpConfig?.method ?? "GET";
  const url = httpConfig?.url ?? "";

  if (!url) {
    logs.push("HTTP request failed: URL is not configured");

    return {
      conditionResult: true,
    };
  }

  logs.push(`HTTP ${method} ${url}`);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    logs.push(
      `HTTP response status: ${response.status}`,
    );

    logs.push(
      `HTTP request completed: ${response.ok ? "success" : "failed"}`,
    );
  } catch (error) {
    logs.push(
      `HTTP request failed: ${
        error instanceof Error
          ? error.message
          : "Unknown error"
      }`,
    );
  }

  return {
    conditionResult: true,
  };
}

    // ---------------------------------------------------
    // DATABASE
    // ---------------------------------------------------

    case "database":
      logs.push(
        "Executing database operation",
      );

      return {
        conditionResult: true,
      };

    // ---------------------------------------------------
    // SCHEDULE
    // ---------------------------------------------------

    case "schedule":
      logs.push(
        "Schedule trigger executed",
      );

      return {
        conditionResult: true,
      };

    // ---------------------------------------------------
    // MANUAL
    // ---------------------------------------------------

    case "manual":
      logs.push(
        "Manual trigger executed",
      );

      return {
        conditionResult: true,
      };

    // ---------------------------------------------------
    // DEFAULT
    // ---------------------------------------------------

    default:
      logs.push(
        `Node executed: ${node.data.nodeType}`,
      );

      return {
        conditionResult: true,
      };
  }
}

// =======================================================
// CONDITION EVALUATOR
// =======================================================

function evaluateCondition(
  actualValue: unknown,
  operator: string,
  expectedValue: string,
): boolean {
  const actual = String(
    actualValue ?? "",
  ).toLowerCase();

  const expected =
    expectedValue.toLowerCase();

  switch (operator) {
    case "equals":
      return actual === expected;

    case "not_equals":
      return actual !== expected;

    case "contains":
      return actual.includes(expected);

    case "not_contains":
      return !actual.includes(expected);

    case "greater_than": {
      const actualNumber = Number(actual);
      const expectedNumber = Number(expected);

      if (
        Number.isNaN(actualNumber) ||
        Number.isNaN(expectedNumber)
      ) {
        return false;
      }

      return actualNumber > expectedNumber;
    }

    case "less_than": {
      const actualNumber = Number(actual);
      const expectedNumber = Number(expected);

      if (
        Number.isNaN(actualNumber) ||
        Number.isNaN(expectedNumber)
      ) {
        return false;
      }

      return actualNumber < expectedNumber;
    }

    default:
      return false;
  }
}
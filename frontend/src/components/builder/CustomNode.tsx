import type { ReactNode } from "react";
import {
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";

import {
  Braces,
  Database,
  GitBranch,
  Globe,
  Mail,
  Play,
  Sparkles,
  Webhook,
  Zap,
} from "lucide-react";

export type WorkflowNodeData = {
  label: string;
  description: string;
  category: "trigger" | "action" | "logic" | "data";
  nodeType: string;
};

const iconMap: Record<string, ReactNode> = {
  webhook: <Webhook size={16} />,
  schedule: <Play size={16} />,
  manual: <Zap size={16} />,
  email: <Mail size={16} />,
  http: <Globe size={16} />,
  database: <Database size={16} />,
  condition: <GitBranch size={16} />,
  transform: <Braces size={16} />,
};

const categoryStyles = {
  trigger: {
    border: "border-violet-400/30",
    icon: "bg-violet-500/10 text-violet-400",
    glow: "hover:border-violet-400/50",
  },
  action: {
    border: "border-cyan-400/20",
    icon: "bg-cyan-500/10 text-cyan-400",
    glow: "hover:border-cyan-400/40",
  },
  logic: {
    border: "border-amber-400/20",
    icon: "bg-amber-500/10 text-amber-400",
    glow: "hover:border-amber-400/40",
  },
  data: {
    border: "border-emerald-400/20",
    icon: "bg-emerald-500/10 text-emerald-400",
    glow: "hover:border-emerald-400/40",
  },
};

export default function CustomNode({
  data,
  selected,
}: NodeProps) {
  const nodeData = data as WorkflowNodeData;
  const style = categoryStyles[nodeData.category];

  const isCondition = nodeData.nodeType === "condition";

  return (
    <div
      className={`relative min-w-[210px] rounded-xl border bg-[#111118] px-4 py-3 shadow-2xl shadow-black/30 transition ${style.border} ${style.glow} ${
        selected ? "ring-2 ring-violet-500/30" : ""
      }`}
    >
      {/* INPUT HANDLE */}
      {nodeData.category !== "trigger" && (
        <Handle
          type="target"
          position={Position.Left}
          className="!h-2.5 !w-2.5 !border-2 !border-[#08080c] !bg-violet-400"
        />
      )}

      {/* NODE CONTENT */}
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.icon}`}
        >
          {iconMap[nodeData.nodeType] ?? (
            <Sparkles size={16} />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {nodeData.label}
          </p>

          <p className="mt-0.5 max-w-[150px] truncate text-[10px] text-zinc-500">
            {nodeData.description}
          </p>
        </div>
      </div>

      {/* NORMAL OUTPUT HANDLE */}
      {!isCondition && nodeData.category !== "action" && (
        <Handle
          type="source"
          position={Position.Right}
          className="!h-2.5 !w-2.5 !border-2 !border-[#08080c] !bg-violet-400"
        />
      )}

      {/* CONDITION: TRUE / FALSE OUTPUTS */}
      {isCondition && (
        <>
          {/* TRUE */}
          <Handle
            id="true"
            type="source"
            position={Position.Right}
            style={{ top: "35%" }}
            className="!h-2.5 !w-2.5 !border-2 !border-[#08080c] !bg-emerald-400"
          />

          <span className="absolute right-[-42px] top-[28%] text-[9px] font-medium text-emerald-400">
            TRUE
          </span>

          {/* FALSE */}
          <Handle
            id="false"
            type="source"
            position={Position.Right}
            style={{ top: "65%" }}
            className="!h-2.5 !w-2.5 !border-2 !border-[#08080c] !bg-rose-400"
          />

          <span className="absolute right-[-45px] top-[58%] text-[9px] font-medium text-rose-400">
            FALSE
          </span>
        </>
      )}
    </div>
  );
}
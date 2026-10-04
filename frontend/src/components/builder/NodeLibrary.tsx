import {
  Braces,
  Database,
  GitBranch,
  Globe,
  Mail,
  Play,
  Search,
  Webhook,
  Zap,
} from "lucide-react";

import { useState } from "react";

type NodeCategory =
  | "trigger"
  | "action"
  | "logic"
  | "data";

export type NodeItem = {
  type: string;
  label: string;
  description: string;
  category: NodeCategory;
  icon: React.ReactNode;
};

type NodeLibraryProps = {
  onNodeSelect?: (node: NodeItem) => void;
};

const nodes: NodeItem[] = [
  {
    type: "webhook",
    label: "Webhook",
    description: "Receive incoming data",
    category: "trigger",
    icon: <Webhook size={15} />,
  },

  {
    type: "schedule",
    label: "Schedule",
    description: "Run on a schedule",
    category: "trigger",
    icon: <Play size={15} />,
  },

  {
    type: "manual",
    label: "Manual Trigger",
    description: "Start manually",
    category: "trigger",
    icon: <Zap size={15} />,
  },

  {
    type: "email",
    label: "Send Email",
    description: "Send an email",
    category: "action",
    icon: <Mail size={15} />,
  },

  {
    type: "http",
    label: "HTTP Request",
    description: "Call an API",
    category: "action",
    icon: <Globe size={15} />,
  },

  {
    type: "database",
    label: "Database",
    description: "Store or fetch data",
    category: "action",
    icon: <Database size={15} />,
  },

  {
    type: "condition",
    label: "Condition",
    description: "Branch workflow",
    category: "logic",
    icon: <GitBranch size={15} />,
  },

  {
    type: "transform",
    label: "Transform Data",
    description: "Modify workflow data",
    category: "data",
    icon: <Braces size={15} />,
  },
];

const categoryLabels: Record<
  NodeCategory,
  string
> = {
  trigger: "Triggers",
  action: "Actions",
  logic: "Logic",
  data: "Data",
};

export default function NodeLibrary({
  onNodeSelect,
}: NodeLibraryProps) {
  const [search, setSearch] = useState("");

  const filteredNodes = nodes.filter((node) =>
    `${node.label} ${node.description}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    node: NodeItem,
  ) => {
    event.dataTransfer.setData(
      "application/genflow-node",
      JSON.stringify({
        type: node.type,
        label: node.label,
        description: node.description,
        category: node.category,
      }),
    );

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="flex h-full w-[260px] shrink-0 flex-col border-r border-white/[0.07] bg-[#09090d]">
      {/* HEADER */}

      <div className="border-b border-white/[0.07] p-4">
        <p className="text-xs font-medium text-zinc-300">
          Node Library
        </p>

        <p className="mt-1 text-[10px] text-zinc-600">
          Click or drag nodes onto the canvas
        </p>

        {/* SEARCH */}

        <div className="mt-4 flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3">
          <Search
            size={14}
            className="text-zinc-600"
          />

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search nodes..."
            className="h-9 w-full bg-transparent text-xs text-white outline-none placeholder:text-zinc-700"
          />
        </div>
      </div>

      {/* NODE LIST */}

      <div className="flex-1 overflow-y-auto p-3">
        {(
          Object.keys(categoryLabels) as NodeCategory[]
        ).map((category) => {
          const categoryNodes =
            filteredNodes.filter(
              (node) =>
                node.category === category,
            );

          if (!categoryNodes.length) {
            return null;
          }

          return (
            <div
              key={category}
              className="mb-5"
            >
              <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                {categoryLabels[category]}
              </p>

              <div className="space-y-1">
                {categoryNodes.map((node) => (
                  <div
                    key={node.type}
                    draggable
                    onDragStart={(event) =>
                      onDragStart(event, node)
                    }
                    onClick={() => {
                      onNodeSelect?.(node);
                    }}
                    className="group flex cursor-pointer items-center gap-3 rounded-lg border border-transparent px-2.5 py-2.5 transition hover:border-white/[0.07] hover:bg-white/[0.03] active:cursor-grabbing"
                  >
                    {/* ICON */}

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-violet-400 transition group-hover:bg-violet-500/10">
                      {node.icon}
                    </div>

                    {/* TEXT */}

                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-zinc-300 group-hover:text-white">
                        {node.label}
                      </p>

                      <p className="mt-0.5 truncate text-[9px] text-zinc-600">
                        {node.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
import {
  Braces,
  ChevronDown,
  Database,
  Globe,
  Mail,
  Settings2,
  Sparkles,
  Webhook,
  X,
} from "lucide-react";

import type { WorkflowNodeData } from "./CustomNode";

type Props = {
  data: WorkflowNodeData;
  onChange: (updates: Partial<WorkflowNodeData>) => void;
  onClose: () => void;
};

type ConditionConfig = {
  field: string;
  operator: string;
  value: string;
};

const icons = {
  webhook: Webhook,
  email: Mail,
  http: Globe,
  database: Database,
  transform: Braces,
};

const operators = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not Equals" },
  { value: "contains", label: "Contains" },
  { value: "not_contains", label: "Does Not Contain" },
  { value: "greater_than", label: "Greater Than" },
  { value: "less_than", label: "Less Than" },
];

export default function NodeConfigPanel({
  data,
  onChange,
  onClose,
}: Props) {
  const Icon =
    icons[data.nodeType as keyof typeof icons] ??
    Sparkles;

  /*
   * Condition configuration is stored inside node.data
   * without changing the existing WorkflowNodeData type.
   */
  const nodeWithConfig = data as WorkflowNodeData & {
  condition?: ConditionConfig;
  http?: HttpConfig;
};

const http: HttpConfig = nodeWithConfig.http ?? {
  method: "GET",
  url: "",
};

const updateHttp = (
  updates: Partial<HttpConfig>,
) => {
  onChange({
    http: {
      ...http,
      ...updates,
    },
  } as Partial<WorkflowNodeData>);
};
  const condition: ConditionConfig = nodeWithConfig.condition ?? {
    field: "",
    operator: "equals",
    value: "",
  };
  type HttpConfig = {
  method: string;
  url: string;
};

  const updateCondition = (
    updates: Partial<ConditionConfig>,
  ) => {
    onChange({
      condition: {
        ...condition,
        ...updates,
      },
    } as Partial<WorkflowNodeData>);
  };

  return (
    <aside className="flex h-full w-[300px] shrink-0 flex-col border-l border-white/[0.07] bg-[#09090d]">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-4">
        <div className="flex items-center gap-2">
          <Settings2
            size={15}
            className="text-violet-400"
          />

          <span className="text-xs font-medium">
            Node Configuration
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-md p-1.5 text-zinc-600 transition hover:bg-white/5 hover:text-white"
        >
          <X size={15} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* NODE INFO */}
        <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
            <Icon size={17} />
          </div>

          <div>
            <p className="text-xs font-medium text-white">
              {data.label}
            </p>

            <p className="text-[10px] text-zinc-600">
              {data.nodeType}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {/* LABEL */}
          <label className="block">
            <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-600">
              Label
            </span>

            <input
              value={data.label}
              onChange={(event) =>
                onChange({
                  label: event.target.value,
                })
              }
              className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-xs text-white outline-none transition focus:border-violet-400/40"
            />
          </label>

          {/* DESCRIPTION */}
          <label className="block">
            <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-600">
              Description
            </span>

            <textarea
              value={data.description}
              onChange={(event) =>
                onChange({
                  description: event.target.value,
                })
              }
              rows={3}
              className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-xs text-white outline-none transition focus:border-violet-400/40"
            />
          </label>

          {/* NODE TYPE */}
          <label className="block">
            <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-600">
              Node Type
            </span>

            <div className="flex h-10 items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.03] px-3">
              <span className="text-xs text-zinc-400">
                {data.nodeType}
              </span>

              <ChevronDown
                size={14}
                className="text-zinc-600"
              />
            </div>
          </label>

          {/* =====================================================
              CONDITION CONFIGURATION
          ===================================================== */}
          {data.nodeType === "condition" && (
            <div className="space-y-4 rounded-xl border border-amber-400/10 bg-amber-500/[0.03] p-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                  <Sparkles size={14} />

                  Condition Rule
                </div>

                <p className="mt-1 text-[10px] leading-5 text-zinc-600">
                  Define when this workflow should continue
                  through the TRUE branch.
                </p>
              </div>

              {/* FIELD */}
              <label className="block">
                <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                  Field
                </span>

                <input
                  value={condition.field}
                  onChange={(event) =>
                    updateCondition({
                      field: event.target.value,
                    })
                  }
                  placeholder="e.g. status"
                  className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-xs text-white outline-none transition placeholder:text-zinc-700 focus:border-amber-400/40"
                />
              </label>

              {/* OPERATOR */}
              <label className="block">
                <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                  Operator
                </span>

                <div className="relative">
                  <select
                    value={condition.operator}
                    onChange={(event) =>
                      updateCondition({
                        operator: event.target.value,
                      })
                    }
                    className="h-10 w-full appearance-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 pr-9 text-xs text-white outline-none transition focus:border-amber-400/40"
                  >
                    {operators.map((operator) => (
                      <option
                        key={operator.value}
                        value={operator.value}
                        className="bg-[#111118] text-white"
                      >
                        {operator.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    size={14}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
                  />
                </div>
              </label>

              {/* VALUE */}
              <label className="block">
                <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                  Value
                </span>

                <input
                  value={condition.value}
                  onChange={(event) =>
                    updateCondition({
                      value: event.target.value,
                    })
                  }
                  placeholder="e.g. approved"
                  className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-xs text-white outline-none transition placeholder:text-zinc-700 focus:border-amber-400/40"
                />
              </label>

              {/* PREVIEW */}
              <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
                <p className="mb-1 text-[9px] uppercase tracking-wider text-zinc-600">
                  Rule Preview
                </p>

                <p className="text-[11px] text-zinc-400">
                  {condition.field || "field"}{" "}
                  <span className="text-amber-400">
                    {operators.find(
                      (operator) =>
                        operator.value ===
                        condition.operator,
                    )?.label.toLowerCase() ??
                      "equals"}
                  </span>{" "}
                  <span className="text-white">
                    {condition.value || "value"}
                  </span>
                </p>
              </div>
            </div>
          )}
          {/* HTTP CONFIGURATION */}
{data.nodeType === "http" && (
  <div className="space-y-4 rounded-xl border border-cyan-400/10 bg-cyan-500/[0.03] p-4">
    <div>
      <div className="flex items-center gap-2 text-xs font-medium text-cyan-300">
        <Globe size={14} />
        HTTP Request
      </div>

      <p className="mt-1 text-[10px] leading-5 text-zinc-600">
        Configure the API request for this workflow step.
      </p>
    </div>

    {/* METHOD */}
    <label className="block">
      <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-600">
        Method
      </span>

      <div className="relative">
        <select
          value={http.method}
          onChange={(event) =>
            updateHttp({
              method: event.target.value,
            })
          }
          className="h-10 w-full appearance-none rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 pr-9 text-xs text-white outline-none transition focus:border-cyan-400/40"
        >
          <option
            value="GET"
            className="bg-[#111118] text-white"
          >
            GET
          </option>

          <option
            value="POST"
            className="bg-[#111118] text-white"
          >
            POST
          </option>

          <option
            value="PUT"
            className="bg-[#111118] text-white"
          >
            PUT
          </option>

          <option
            value="PATCH"
            className="bg-[#111118] text-white"
          >
            PATCH
          </option>

          <option
            value="DELETE"
            className="bg-[#111118] text-white"
          >
            DELETE
          </option>
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
        />
      </div>
    </label>

    {/* URL */}
    <label className="block">
      <span className="mb-2 block text-[10px] font-medium uppercase tracking-wider text-zinc-600">
        URL
      </span>

      <input
        value={http.url}
        onChange={(event) =>
          updateHttp({
            url: event.target.value,
          })
        }
        placeholder="https://api.example.com/users"
        className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 text-xs text-white outline-none transition placeholder:text-zinc-700 focus:border-cyan-400/40"
      />
    </label>

    {/* PREVIEW */}
    <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
      <p className="mb-1 text-[9px] uppercase tracking-wider text-zinc-600">
        Request Preview
      </p>

      <p className="break-all text-[11px] text-zinc-400">
        <span className="text-cyan-400">
          {http.method}
        </span>{" "}
        {http.url || "https://api.example.com/endpoint"}
      </p>
    </div>
  </div>
)}

          {/* GENERAL CONFIGURATION */}
          {data.nodeType !== "condition" && (
            <div className="rounded-xl border border-violet-400/10 bg-violet-500/[0.04] p-3">
              <div className="flex items-center gap-2 text-xs text-violet-300">
                <Sparkles size={14} />

                Configuration
              </div>

              <p className="mt-2 text-[10px] leading-5 text-zinc-600">
                Node-specific configuration fields will be
                added as the execution engine is implemented.
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
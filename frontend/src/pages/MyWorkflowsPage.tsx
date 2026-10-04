import {
  ArrowLeft,
  GitBranch,
  Plus,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

const workflows = [
  {
    name: "Customer Notification",
    status: "Active",
    modified: "2 hours ago",
    description:
      "Webhook → Transform → Condition → Email / HTTP",
  },
  {
    name: "Lead Processing",
    status: "Active",
    modified: "1 day ago",
    description:
      "Process and qualify incoming leads",
  },
  {
    name: "Order Validation",
    status: "Draft",
    modified: "2 days ago",
    description:
      "Validate incoming order data",
  },
  {
    name: "Daily Report",
    status: "Active",
    modified: "3 days ago",
    description:
      "Generate and send daily reports",
  },
];

function MyWorkflowsPage() {
  return (
    <div className="min-h-screen bg-[#050507] text-white">
      {/* Header */}
      <header className="flex min-h-16 flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            aria-label="Back to dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
          >
            <ArrowLeft size={17} />
          </Link>

          <div>
            <p className="text-xs text-zinc-500">
              Workspace
            </p>

            <h1 className="text-sm font-medium text-white sm:text-base">
              My Workflows
            </h1>
          </div>
        </div>

        <Link
          to="/builder"
          className="flex items-center gap-2 rounded-lg bg-violet-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-violet-400 sm:px-4 sm:text-sm"
        >
          <Plus size={16} />
          <span>New Workflow</span>
        </Link>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Page heading */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold sm:text-2xl">
            All Workflows
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Manage and open your automation workflows.
          </p>
        </div>

        {/* Search */}
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
          <Search
            size={17}
            className="shrink-0 text-zinc-600"
          />

          <input
            type="text"
            placeholder="Search workflows..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
          />
        </div>

        {/* Workflow list */}
        <div className="space-y-3">
          {workflows.map((workflow) => (
            <Link
              key={workflow.name}
              to="/builder"
              className="group flex flex-col gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition hover:border-violet-400/20 hover:bg-white/[0.035] sm:flex-row sm:items-center"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                <GitBranch size={18} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-white">
                    {workflow.name}
                  </p>

                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                      workflow.status === "Active"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-zinc-500/10 text-zinc-400"
                    }`}
                  >
                    {workflow.status}
                  </span>
                </div>

                <p className="mt-1 truncate text-xs text-zinc-500">
                  {workflow.description}
                </p>

                <p className="mt-2 text-[11px] text-zinc-600">
                  Modified {workflow.modified}
                </p>
              </div>

              {/* Open indicator */}
              <span className="text-xs text-zinc-600 transition group-hover:text-violet-400">
                Open →
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MyWorkflowsPage;
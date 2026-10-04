import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  GitBranch,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const executions = [
  {
    workflow: "Customer Notification",
    status: "Success",
    duration: "1.8s",
    time: "2 min ago",
    trigger: "Webhook Trigger",
  },
  {
    workflow: "Lead Processing",
    status: "Success",
    duration: "2.4s",
    time: "18 min ago",
    trigger: "Manual Trigger",
  },
  {
    workflow: "Daily Report",
    status: "Failed",
    duration: "3.1s",
    time: "1 hour ago",
    trigger: "Schedule",
  },
  {
    workflow: "Order Validation",
    status: "Success",
    duration: "1.2s",
    time: "2 hours ago",
    trigger: "Webhook Trigger",
  },
  {
    workflow: "Customer Notification",
    status: "Success",
    duration: "2.0s",
    time: "3 hours ago",
    trigger: "Webhook Trigger",
  },
];

function ExecutionsPage() {
  const successfulRuns = executions.filter(
    (execution) => execution.status === "Success",
  ).length;

  const failedRuns = executions.filter(
    (execution) => execution.status === "Failed",
  ).length;

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

            <h1 className="text-sm font-medium sm:text-base">
              Executions
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2">
          <Activity
            size={15}
            className="text-violet-400"
          />

          <span className="text-xs text-zinc-400">
            Live execution history
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Heading */}
        <div className="mb-7">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Execution History
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Monitor recent workflow runs and their execution status.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                <Activity size={17} />
              </div>

              <span className="text-xs text-zinc-600">
                Total
              </span>
            </div>

            <p className="mt-5 text-2xl font-semibold">
              {executions.length}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Recent executions
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-400">
                <CheckCircle2 size={17} />
              </div>

              <span className="text-xs text-zinc-600">
                Healthy
              </span>
            </div>

            <p className="mt-5 text-2xl font-semibold">
              {successfulRuns}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Successful runs
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-400/10 text-red-400">
                <XCircle size={17} />
              </div>

              <span className="text-xs text-zinc-600">
                Attention
              </span>
            </div>

            <p className="mt-5 text-2xl font-semibold">
              {failedRuns}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Failed runs
            </p>
          </div>
        </div>

        {/* Execution list */}
        <section className="mt-7 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
          <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-medium">
                  Recent Runs
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                  Latest workflow execution activity
                </p>
              </div>

              <Clock3
                size={17}
                className="text-zinc-600"
              />
            </div>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {executions.map((execution, index) => (
              <div
                key={`${execution.workflow}-${index}`}
                className="flex flex-col gap-4 px-5 py-5 transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:px-6"
              >
                {/* Icon */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    execution.status === "Success"
                      ? "bg-emerald-400/10 text-emerald-400"
                      : "bg-red-400/10 text-red-400"
                  }`}
                >
                  {execution.status === "Success" ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <XCircle size={18} />
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">
                      {execution.workflow}
                    </p>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                        execution.status === "Success"
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-red-400/10 text-red-400"
                      }`}
                    >
                      {execution.status}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600">
                    <span className="flex items-center gap-1.5">
                      <GitBranch size={12} />
                      {execution.trigger}
                    </span>

                    <span>
                      Duration: {execution.duration}
                    </span>

                    <span>
                      {execution.time}
                    </span>
                  </div>
                </div>

                <span className="text-xs text-zinc-600">
                  Run #{String(index + 1).padStart(3, "0")}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ExecutionsPage;
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  GitBranch,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Settings,
  Sparkles,
  Workflow,
  XCircle,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const workflows = [
  {
    name: "Customer Notification",
    status: "Active",
    modified: "2 hours ago",
    lastRun: "Success · 2 hours ago",
  },
  {
    name: "Lead Processing",
    status: "Active",
    modified: "1 day ago",
    lastRun: "Success · 1 day ago",
  },
  {
    name: "Order Validation",
    status: "Draft",
    modified: "2 days ago",
    lastRun: "Not run yet",
  },
  {
    name: "Daily Report",
    status: "Active",
    modified: "3 days ago",
    lastRun: "Failed · 3 days ago",
  },
];

function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#050507] text-white">
      <div className="flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/[0.06] bg-[#08080b] lg:flex lg:flex-col">
          <Sidebar />
        </aside>

        <main className="min-w-0 flex-1">
          {/* Topbar */}
          <header className="flex h-16 items-center justify-between border-b border-white/[0.06] px-5 sm:px-7">
            <div>
              <p className="text-sm text-zinc-500">Workspace</p>
              <h1 className="font-medium">Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/builder"
                className="hidden items-center gap-2 rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium transition hover:bg-violet-400 sm:flex"
              >
                <Plus size={16} />
                New Workflow
              </Link>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 text-sm text-violet-300">
                D
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-7">
            {/* Mobile intro */}
            <div className="mb-8 lg:hidden">
              <p className="text-sm text-zinc-500">Welcome back</p>
              <h2 className="mt-1 text-2xl font-semibold">
                Build something useful.
              </h2>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<Workflow size={18} />}
                label="Total Workflows"
                value="12"
                trend="+3 this month"
              />

              <StatCard
                icon={<Activity size={18} />}
                label="Active Workflows"
                value="8"
                trend="66% active"
              />

              <StatCard
                icon={<CheckCircle2 size={18} />}
                label="Successful Runs"
                value="248"
                trend="+18% this week"
                positive
              />

              <StatCard
                icon={<XCircle size={18} />}
                label="Failed Runs"
                value="7"
                trend="Needs attention"
                negative
              />
            </div>

            {/* Main grid */}
            <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_320px]">
              {/* Workflows */}
              <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                  <div>
                    <h2 className="font-medium">Recent Workflows</h2>
                    <p className="mt-1 text-xs text-zinc-500">
                      Your latest automation projects
                    </p>
                  </div>

                  <Link
                    to="/builder"
                    className="text-xs text-violet-400 transition hover:text-violet-300"
                  >
                    View all →
                  </Link>
                </div>

                <div className="divide-y divide-white/[0.06]">
                  {workflows.map((workflow) => (
                    <div
                      key={workflow.name}
                      className="flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.02]"
                    >
                      <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] sm:flex">
                        <GitBranch size={16} className="text-violet-400" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {workflow.name}
                        </p>

                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-zinc-600">
                          <span>{workflow.modified}</span>
                          <span>{workflow.lastRun}</span>
                        </div>
                      </div>

                      <StatusBadge status={workflow.status} />

                      <button
                        type="button"
                        aria-label={`More options for ${workflow.name}`}
                        className="hidden rounded-lg p-2 text-zinc-600 transition hover:bg-white/5 hover:text-white sm:block"
                      >
                        <MoreHorizontal size={17} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick actions */}
              <section className="rounded-2xl border border-white/[0.07] bg-white/[0.02]">
                <div className="border-b border-white/[0.07] px-5 py-4">
                  <h2 className="font-medium">Quick Actions</h2>
                  <p className="mt-1 text-xs text-zinc-500">
                    Start building faster
                  </p>
                </div>

                <div className="space-y-2 p-4">
                  <QuickAction
                    icon={<Plus size={17} />}
                    title="Create Workflow"
                    description="Start from a blank canvas"
                    href="/builder"
                  />

                  <QuickAction
                    icon={<Sparkles size={17} />}
                    title="Use Template"
                    description="Start with a prebuilt workflow"
                    href="/builder"
                  />

                  <QuickAction
                    icon={<Zap size={17} />}
                    title="Run Test"
                    description="Test your latest workflow"
                    href="/builder"
                  />

                  <QuickAction
                    icon={<Clock3 size={17} />}
                    title="Executions"
                    description="Inspect recent workflow runs"
                    href="/executions"
                  />
                </div>
              </section>
            </div>

            {/* Activity */}
            <section className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]">
              <div className="border-b border-white/[0.07] px-5 py-4">
                <h2 className="font-medium">Recent Activity</h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Latest execution events
                </p>
              </div>

              <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
                <ActivityItem
                  icon={<CheckCircle2 size={15} />}
                  title="Customer Notification"
                  detail="Workflow completed"
                  time="2 min ago"
                />

                <ActivityItem
                  icon={<CheckCircle2 size={15} />}
                  title="Lead Processing"
                  detail="Workflow completed"
                  time="18 min ago"
                />

                <ActivityItem
                  icon={<XCircle size={15} />}
                  title="Daily Report"
                  detail="HTTP Request failed"
                  time="1 hr ago"
                  error
                />

                <ActivityItem
                  icon={<Activity size={15} />}
                  title="Order Validation"
                  detail="Workflow saved"
                  time="2 hr ago"
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-white/[0.06] px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
          <Sparkles size={16} />
        </div>

        <span className="font-semibold">
          Gen<span className="text-violet-400">Flow</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        <SidebarItem
          icon={<LayoutDashboard size={17} />}
          label="Dashboard"
          active
        />

    <SidebarItem
  icon={<Workflow size={17} />}
  label="My Workflows"
  onClick={() => {
    window.location.href = "/workflows";
  }}
/>

        <SidebarItem
  icon={<Sparkles size={17} />}
  label="Templates"
  onClick={() => {
    window.location.href = "/builder";
  }}
/>

       <SidebarItem
  icon={<Activity size={17} />}
  label="Executions"
  onClick={() => {
    window.location.href = "/executions";
  }}
/>

      <SidebarItem
  icon={<Settings size={17} />}
  label="Settings"
  onClick={() => {
    window.location.href = "/settings";
  }}
/>
      </nav>

      <div className="m-3 rounded-xl border border-violet-400/10 bg-violet-500/[0.05] p-4">
        <p className="text-xs font-medium text-white">Build faster</p>
        <p className="mt-1 text-[11px] leading-5 text-zinc-500">
          Create reusable workflows and automate repetitive tasks.
        </p>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
   <button
  type="button"
  onClick={onClick}
  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
        active
          ? "bg-violet-500/10 text-violet-300"
          : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-200"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  icon,
  label,
  value,
  trend,
  positive = false,
  negative = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-violet-400">
          {icon}
        </div>

        <ArrowUpRight size={15} className="text-zinc-700" />
      </div>

      <p className="mt-5 text-xs text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>

      <p
        className={`mt-2 text-[11px] ${
          positive
            ? "text-emerald-400"
            : negative
              ? "text-red-400"
              : "text-zinc-600"
        }`}
      >
        {trend}
      </p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const active = status === "Active";

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
        active
          ? "bg-emerald-400/10 text-emerald-400"
          : "bg-zinc-500/10 text-zinc-400"
      }`}
    >
      {status}
    </span>
  );
}

function QuickAction({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.015] p-3 transition hover:border-violet-400/20 hover:bg-white/[0.035]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium">{title}</p>
        <p className="mt-0.5 truncate text-[10px] text-zinc-600">
          {description}
        </p>
      </div>
    </Link>
  );
}

function ActivityItem({
  icon,
  title,
  detail,
  time,
  error = false,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
  time: string;
  error?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
      <div className={error ? "text-red-400" : "text-emerald-400"}>
        {icon}
      </div>

      <p className="mt-3 truncate text-xs font-medium">{title}</p>
      <p className="mt-1 truncate text-[10px] text-zinc-600">{detail}</p>
      <p className="mt-2 text-[10px] text-zinc-700">{time}</p>
    </div>
  );
}

export default DashboardPage;
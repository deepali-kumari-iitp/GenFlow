import {
  ArrowRight,
  Check,
  GitBranch,
  Layers3,
  Play,
  RotateCcw,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const features = [
  {
    icon: Workflow,
    title: "Visual workflows",
    description:
      "Build automation by connecting triggers, actions and logic on a visual canvas.",
  },
  {
    icon: GitBranch,
    title: "Smart conditions",
    description:
      "Create branches that make decisions based on your workflow data.",
  },
  {
    icon: Layers3,
    title: "Data transformation",
    description:
      "Move, transform and format information between every workflow step.",
  },
  {
    icon: RotateCcw,
    title: "Reliable execution",
    description:
      "Track failures, inspect logs and retry operations when appropriate.",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Choose a trigger",
    text: "Start with a webhook, schedule or manual trigger.",
  },
  {
    number: "02",
    title: "Connect actions",
    text: "Build your automation visually with reusable nodes.",
  },
  {
    number: "03",
    title: "Run and monitor",
    text: "Execute your workflow and inspect every step.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050507] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative px-5 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] px-3 py-1.5 text-xs text-violet-300">
              <Sparkles size={13} />
              Visual Workflow Automation Platform
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Automate your work.
              <span className="block bg-gradient-to-r from-violet-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
                Visually.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              Build powerful workflows by connecting triggers, actions,
              conditions and data transformations — without writing repetitive
              automation code.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="group flex items-center justify-center gap-2 rounded-xl bg-violet-500 px-6 py-3.5 text-sm font-medium text-white shadow-xl shadow-violet-500/20 transition hover:bg-violet-400"
              >
                Create Workflow
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-zinc-200 transition hover:bg-white/[0.06]"
              >
                <Play size={15} />
                See How It Works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-500">
              <span className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                Visual builder
              </span>

              <span className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                Real execution
              </span>

              <span className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                Execution logs
              </span>
            </div>
          </div>

          {/* Workflow preview */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-violet-500/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b10]/90 shadow-2xl shadow-black/50">
              <div className="flex h-12 items-center gap-2 border-b border-white/[0.07] px-4">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

                <span className="ml-3 text-xs text-zinc-500">
                  Customer Notification
                </span>
              </div>

              <div className="relative min-h-[400px] overflow-hidden bg-[#08080c] p-8">
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(#71717a_1px,transparent_1px)] [background-size:24px_24px]" />

                <div className="relative flex min-h-[330px] items-center justify-center">
                  <div className="flex w-full max-w-md flex-col items-center gap-5">
                    <WorkflowNode
                      icon={<Zap size={16} />}
                      title="Webhook Trigger"
                      subtitle="Receives incoming data"
                      type="trigger"
                    />

                    <div className="h-6 w-px bg-gradient-to-b from-violet-400 to-indigo-400" />

                    <WorkflowNode
                      icon={<Layers3 size={16} />}
                      title="Transform Data"
                      subtitle="Prepare workflow data"
                    />

                    <div className="h-6 w-px bg-gradient-to-b from-violet-400 to-indigo-400" />

                    <WorkflowNode
                      icon={<GitBranch size={16} />}
                      title="Condition"
                      subtitle="amount > ₹5000"
                      type="condition"
                    />

                    <div className="grid w-full grid-cols-2 gap-4">
                      <WorkflowNode
                        icon={<Sparkles size={15} />}
                        title="Send Email"
                        subtitle="Manager notification"
                        type="success"
                      />

                      <WorkflowNode
                        icon={<Layers3 size={15} />}
                        title="Save Order"
                        subtitle="Database action"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 rounded-xl border border-emerald-400/20 bg-[#0d1110]/95 px-4 py-3 shadow-xl backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
                <div>
                  <p className="text-xs font-medium text-white">
                    Workflow running
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    4 / 5 nodes completed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-white/[0.06] px-5 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-violet-400">POWERFUL BY DESIGN</p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to automate.
            </h2>

            <p className="mt-4 text-zinc-500">
              A focused workflow platform built around visibility, reliability
              and control.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-violet-400/20 hover:bg-white/[0.035]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-400">
                    <Icon size={19} />
                  </div>

                  <h3 className="mt-5 font-medium">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="px-5 py-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium text-violet-400">HOW IT WORKS</p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Design. Connect. Automate.
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-zinc-500">
                Turn an idea into an executable workflow without getting lost
                in implementation details.
              </p>
            </div>

            <div className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {workflowSteps.map((step) => (
                <div
                  key={step.number}
                  className="grid gap-4 py-7 sm:grid-cols-[70px_1fr]"
                >
                  <span className="text-sm text-violet-400">{step.number}</span>

                  <div>
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="templates"
        className="px-5 pb-24 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.12] via-white/[0.03] to-indigo-500/[0.08] p-8 sm:p-12">
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative max-w-2xl">
              <p className="text-sm text-violet-300">READY TO BUILD?</p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Turn your next process into a workflow.
              </h2>

              <p className="mt-4 text-sm leading-6 text-zinc-400">
                Start with a blank canvas or use a reusable workflow template.
              </p>

              <Link
                to="/dashboard"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Open GenFlow
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 GenFlow</span>
          <span>Design. Connect. Automate.</span>
        </div>
      </footer>
    </div>
  );
}

function WorkflowNode({
  icon,
  title,
  subtitle,
  type = "default",
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  type?: "default" | "trigger" | "condition" | "success";
}) {
  const styles = {
    default: "border-white/10 bg-[#111118]",
    trigger: "border-violet-400/30 bg-violet-500/[0.08]",
    condition: "border-amber-400/25 bg-amber-500/[0.06]",
    success: "border-emerald-400/25 bg-emerald-500/[0.06]",
  };

  return (
    <div
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 backdrop-blur-xl ${styles[type]}`}
    >
      <div className="text-violet-400">{icon}</div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-zinc-100">{title}</p>
        <p className="mt-0.5 truncate text-[10px] text-zinc-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
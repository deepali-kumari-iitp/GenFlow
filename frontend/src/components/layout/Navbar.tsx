import {
  ArrowRight,
  Menu,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#050507]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-500/20">
            <Sparkles size={17} className="text-white" />
          </div>

          <span className="text-lg font-semibold tracking-tight text-white">
            Gen<span className="text-violet-400">Flow</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            How it works
          </a>

          <a
            href="#templates"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Templates
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/dashboard"
            className="px-3 py-2 text-sm text-zinc-300 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/dashboard"
            className="group flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Get Started
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-lg border border-white/10 p-2 text-zinc-300 md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[#08080b] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            <a
              href="#features"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-zinc-300"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-zinc-300"
            >
              How it works
            </a>

            <a
              href="#templates"
              onClick={() => setMobileOpen(false)}
              className="text-sm text-zinc-300"
            >
              Templates
            </a>

            <Link
              to="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black"
            >
              <Play size={14} />
              Open GenFlow
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
import { Shield, Menu } from "lucide-react";
import Button from "../common/Button";

export default function Navbar({ activePage, onNavigate }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/70 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-glow">
            <Shield size={20} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Cyber Shield AI</p>
            <p className="text-xs text-slate-400">Multimodal cybersecurity assistant</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {[
            ["home", "Home"],
            ["dashboard", "Dashboard"],
            ["assistant", "Assistant"],
            ["reports", "Reports"],
          ].map(([id, label]) => (
            <Button
              key={id}
              className={activePage === id ? "bg-cyan-400/20 text-white" : "bg-transparent"}
              onClick={() => onNavigate(id)}
            >
              {label}
            </Button>
          ))}
        </div>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
          onClick={() => onNavigate("assistant")}
          aria-label="Open assistant"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}


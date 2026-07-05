import { Shield, MessageSquare } from "lucide-react";
import Card from "../common/Card";
import Button from "../common/Button";
import Badge from "../common/Badge";

const navItems = [
  { id: "home", label: "Home", icon: Shield },
  { id: "assistant", label: "Assistant", icon: MessageSquare },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-[96px] lg:h-[calc(100vh-120px)]">
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Cybersecurity Chat</p>
            <p className="text-xs text-slate-400">Focused on security-only conversations</p>
          </div>
          <Badge className="border-cyan-400/20 bg-cyan-500/10 text-cyan-200">Secure</Badge>
        </div>

        <div className="space-y-2">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                activePage === id ? "bg-cyan-400/15 text-white" : "bg-white/0 text-slate-300 hover:bg-white/5"
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Scope</p>
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4 text-sm leading-6 text-slate-300">
          This assistant is limited to cybersecurity conversation only. It does not provide unrelated assistance.
        </div>
      </Card>
    </aside>
  );
}

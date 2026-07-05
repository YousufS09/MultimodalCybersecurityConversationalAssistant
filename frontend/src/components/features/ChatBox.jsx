import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { api } from "../../services/api";
import { bumpDashboardSummary } from "../../utils/helpers";

export default function ChatBox({ onSummaryChange }) {
  const [history, setHistory] = useState([
    { role: "assistant", content: "I can help analyze threats, logs, URLs, indicators, and reports." },
  ]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    if (!message.trim()) return;
    const nextHistory = [...history, { role: "user", content: message.trim() }];
    setHistory(nextHistory);
    setMessage("");
    setError("");
    setLoading(true);
    try {
      const data = await api.chat({ message: nextHistory[nextHistory.length - 1].content, history });
      const updated = [...nextHistory, { role: "assistant", content: data.response }];
      setHistory(updated);
      onSummaryChange && bumpDashboardSummary(onSummaryChange);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white">Cybersecurity AI Chat</p>
          <p className="text-xs text-slate-400">Ask for detection, hardening, or remediation guidance.</p>
        </div>
        <Button onClick={() => setHistory([{ role: "assistant", content: "Chat reset." }])}>Reset</Button>
      </div>

      <div className="max-h-[420px] space-y-3 overflow-auto rounded-2xl border border-white/5 bg-slate-950/40 p-4">
        {history.map((item, index) => (
          <div key={index} className={`rounded-2xl p-4 ${item.role === "user" ? "ml-auto max-w-[85%] bg-cyan-500/10" : "max-w-[92%] bg-white/5"}`}>
            <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-slate-400">{item.role}</p>
            <p className="text-sm leading-6 text-slate-100 whitespace-pre-wrap">{item.content}</p>
          </div>
        ))}
        {loading ? <Loader /> : null}
      </div>

      {error ? <p className="text-sm text-rose-300">{error}</p> : null}

      <div className="flex gap-3">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about a suspicious pattern, log entry, or attack chain..."
          className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/30"
        />
        <Button onClick={handleSend} disabled={loading}>
          Send
        </Button>
      </div>
    </Card>
  );
}

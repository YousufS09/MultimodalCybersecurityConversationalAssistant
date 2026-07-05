import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import Loader from "../common/Loader";
import Badge from "../common/Badge";
import { api } from "../../services/api";
import { riskColors } from "../../utils/constants";
import { bumpDashboardSummary } from "../../utils/helpers";

export default function LogAnalyzer({ onSummaryChange, onAnalysis }) {
  const [logs, setLogs] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!logs.trim()) return;
    setLoading(true);
    try {
      const data = await api.analyzeLogs({ logs, title: "Server log review" });
      setResult(data);
      onAnalysis?.(data);
      onSummaryChange && bumpDashboardSummary(onSummaryChange, data.risk_level);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">Log Analysis</p>
          <p className="text-xs text-slate-400">Paste server, auth, firewall, or application logs.</p>
        </div>
        <Badge className={result ? riskColors[result.risk_level] || "border-white/10 bg-white/5 text-white" : "border-white/10 bg-white/5 text-slate-300"}>
          {result ? result.risk_level : "Waiting"}
        </Badge>
      </div>

      <textarea
        value={logs}
        onChange={(e) => setLogs(e.target.value)}
        rows={8}
        className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/30"
        placeholder="Example: Failed login from 185.XX.XX.12... repeated attempts..."
      />

      <div className="flex items-center gap-3">
        <Button onClick={analyze} disabled={loading}>
          Analyze Logs
        </Button>
        {loading ? <Loader /> : null}
      </div>

      {result ? (
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Summary", result.summary],
            ["Threat Type", result.possible_threat_type],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-100">{value}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Evidence</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-100">
              {result.evidence?.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Recommended Actions</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-100">
              {result.recommended_actions?.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </Card>
  );
}

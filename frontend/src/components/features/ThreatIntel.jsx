import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import Loader from "../common/Loader";
import Badge from "../common/Badge";
import { api } from "../../services/api";
import { riskColors } from "../../utils/constants";
import { bumpDashboardSummary } from "../../utils/helpers";

export default function ThreatIntel({ onSummaryChange, onAnalysis }) {
  const [indicator, setIndicator] = useState("");
  const [indicatorType, setIndicatorType] = useState("ip");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!indicator.trim()) return;
    setLoading(true);
    try {
      const data = await api.analyzeIndicator({ indicator, indicator_type: indicatorType });
      setResult(data);
      onAnalysis?.(data);
      onSummaryChange && bumpDashboardSummary(onSummaryChange, data.risk_level);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">Threat Intelligence Helper</p>
          <p className="text-xs text-slate-400">Inspect IPs, hashes, domains, email headers, and IOCs.</p>
        </div>
        <Badge className={result ? riskColors[result.risk_level] || "border-white/10 bg-white/5 text-white" : "border-white/10 bg-white/5 text-slate-300"}>
          {result ? result.risk_level : "Waiting"}
        </Badge>
      </div>

      <div className="grid gap-3 md:grid-cols-[160px_minmax(0,1fr)]">
        <select
          value={indicatorType}
          onChange={(e) => setIndicatorType(e.target.value)}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
        >
          <option value="ip">IP</option>
          <option value="hash">Hash</option>
          <option value="domain">Domain</option>
          <option value="email">Email Header</option>
          <option value="ioc">IOC</option>
        </select>
        <input
          value={indicator}
          onChange={(e) => setIndicator(e.target.value)}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/30"
          placeholder="Paste the indicator value"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={analyze} disabled={loading}>
          Analyze Indicator
        </Button>
        {loading ? <Loader /> : null}
      </div>

      {result ? (
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Meaning</p>
            <p className="mt-2 text-sm leading-6 text-slate-100">{result.summary}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Next Steps</p>
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

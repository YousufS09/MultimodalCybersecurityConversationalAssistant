import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import Loader from "../common/Loader";
import Badge from "../common/Badge";
import { api } from "../../services/api";
import { riskColors } from "../../utils/constants";
import { bumpDashboardSummary } from "../../utils/helpers";

export default function UrlAnalyzer({ onSummaryChange, onAnalysis }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!url.trim()) return;
    setLoading(true);
    try {
      const data = await api.analyzeUrl({ url });
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
          <p className="text-sm font-semibold text-white">URL / Phishing Analysis</p>
          <p className="text-xs text-slate-400">Check suspicious links, redirects, and domain patterns.</p>
        </div>
        <Badge className={result ? riskColors[result.risk_level] || "border-white/10 bg-white/5 text-white" : "border-white/10 bg-white/5 text-slate-300"}>
          {result ? result.risk_level : "Waiting"}
        </Badge>
      </div>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/30"
        placeholder="https://example.com/login"
      />

      <div className="flex items-center gap-3">
        <Button onClick={analyze} disabled={loading}>
          Analyze URL
        </Button>
        {loading ? <Loader /> : null}
      </div>

      {result ? (
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Summary</p>
            <p className="mt-2 text-sm leading-6 text-slate-100">{result.summary}</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Threat Type</p>
            <p className="mt-2 text-sm text-slate-100">{result.possible_threat_type}</p>
          </div>
        </div>
      ) : null}
    </Card>
  );
}

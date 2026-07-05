import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import Loader from "../common/Loader";
import Badge from "../common/Badge";
import { api } from "../../services/api";
import { riskColors } from "../../utils/constants";
import { bumpDashboardSummary } from "../../utils/helpers";

export default function FileAnalyzer({ onSummaryChange }) {
  const [file, setFile] = useState(null);
  const [context, setContext] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function analyze() {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", "Uploaded artifact analysis");
      formData.append("context", context);
      const data = await api.uploadAnalyze(formData);
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
          <p className="text-sm font-semibold text-white">File / Screenshot Analysis</p>
          <p className="text-xs text-slate-400">Upload TXT, CSV, JSON, PDF, or image screenshots.</p>
        </div>
        <Badge className={result ? riskColors[result.risk_level] || "border-white/10 bg-white/5 text-white" : "border-white/10 bg-white/5 text-slate-300"}>
          {result ? result.risk_level : "Waiting"}
        </Badge>
      </div>

      <input
        type="file"
        accept=".txt,.csv,.json,.pdf,.png,.jpg,.jpeg,.webp"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-xl file:border-0 file:bg-cyan-400/15 file:px-4 file:py-2 file:text-cyan-100 hover:file:bg-cyan-400/20"
      />

      <textarea
        value={context}
        onChange={(e) => setContext(e.target.value)}
        rows={4}
        className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/30"
        placeholder="Add context like incident number, system name, or why this file matters."
      />

      <div className="flex items-center gap-3">
        <Button onClick={analyze} disabled={loading || !file}>
          Analyze File
        </Button>
        {loading ? <Loader /> : null}
      </div>

      {result ? (
        <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Summary</p>
          <p className="mt-2 text-sm leading-6 text-slate-100">{result.summary}</p>
        </div>
      ) : null}
    </Card>
  );
}

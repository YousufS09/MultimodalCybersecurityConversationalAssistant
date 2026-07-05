import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { api } from "../../services/api";
import { downloadText } from "../../utils/helpers";

export default function ReportGenerator({ latestAnalysis }) {
  const [title, setTitle] = useState("Security Investigation Report");
  const [subject, setSubject] = useState("Suspicious activity review");
  const [notes, setNotes] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const data = await api.generateReport({
        title,
        subject,
        notes,
        analysis: latestAnalysis || report?.analysis || {},
      });
      setReport(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-white">Report Generator</p>
        <p className="text-xs text-slate-400">Create a structured report for copying or downloading.</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          placeholder="Report title"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          placeholder="Subject"
        />
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none"
        placeholder="Optional notes for the report"
      />

      <div className="flex flex-wrap gap-3">
        <Button onClick={generate} disabled={loading}>
          Generate Report
        </Button>
        {loading ? <Loader /> : null}
        {report ? (
          <Button onClick={() => navigator.clipboard.writeText(report.report_markdown)}>Copy Report</Button>
        ) : null}
        {report ? (
          <Button onClick={() => downloadText("security-report.md", report.report_markdown)}>Download</Button>
        ) : null}
      </div>

      {report ? (
        <pre className="max-h-[420px] overflow-auto rounded-2xl border border-white/5 bg-slate-950/60 p-4 text-xs leading-6 text-slate-200 whitespace-pre-wrap">
          {report.report_markdown}
        </pre>
      ) : null}
    </Card>
  );
}

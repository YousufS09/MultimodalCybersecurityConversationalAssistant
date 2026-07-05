import ReportGenerator from "../components/features/ReportGenerator";
import Card from "../components/common/Card";

export default function Reports({ latestAnalysis }) {
  return (
    <div className="space-y-6">
      <ReportGenerator latestAnalysis={latestAnalysis} />
      <Card className="space-y-3">
        <p className="text-sm font-semibold text-white">Saved Reports</p>
        <div className="rounded-2xl border border-dashed border-cyan-400/20 bg-cyan-400/5 p-6 text-sm text-slate-300">
          No saved reports yet. Generate one from analysis results or export the current markdown.
        </div>
      </Card>
    </div>
  );
}

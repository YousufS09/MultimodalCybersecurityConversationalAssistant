import DashboardCards from "../components/features/DashboardCards";
import Card from "../components/common/Card";

export default function Dashboard({ summary }) {
  return (
    <div className="space-y-6">
      <DashboardCards summary={summary} />
      <Card className="space-y-4">
        <p className="text-sm font-semibold text-white">Recent Activity</p>
        <div className="space-y-3 text-sm text-slate-300">
          {[
            "Phishing campaign summary generated from URL analysis.",
            "Multiple failed login bursts identified in authentication logs.",
            "Suspicious spreadsheet upload reviewed for malicious macros and payload hints.",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
              {item}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}


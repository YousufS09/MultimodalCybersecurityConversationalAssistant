import Card from "../common/Card";
import Badge from "../common/Badge";

const categories = [
  { label: "Phishing", value: 34, bar: "from-cyan-400 to-sky-500" },
  { label: "Brute Force", value: 22, bar: "from-emerald-400 to-cyan-400" },
  { label: "Malware", value: 16, bar: "from-violet-400 to-cyan-400" },
  { label: "Privilege Escalation", value: 11, bar: "from-rose-400 to-orange-400" },
];

export default function DashboardCards({ summary }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
      <Card className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-title">Security Dashboard</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Operational threat overview</h3>
          </div>
          <Badge className="border-emerald-400/20 bg-emerald-500/10 text-emerald-200">Active monitoring</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Total scans", summary.totalScans],
            ["High risk", summary.highRiskFindings],
            ["Recent", summary.recentAnalyses],
            ["Common", summary.commonThreat],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="text-xs text-slate-400">{label}</p>
              <p className="mt-2 text-xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-4">
        <p className="text-sm font-semibold text-white">Threat Categories</p>
        <div className="space-y-4">
          {categories.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-300">{item.label}</span>
                <span className="text-slate-400">{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/5">
                <div className={`h-2 rounded-full bg-gradient-to-r ${item.bar}`} style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}


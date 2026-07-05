import { useMemo, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Assistant from "./pages/Assistant";
import Reports from "./pages/Reports";

const pages = {
  home: Home,
  dashboard: Dashboard,
  assistant: Assistant,
  reports: Reports,
};

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [latestAnalysis, setLatestAnalysis] = useState(null);
  const [dashboardSummary, setDashboardSummary] = useState({
    totalScans: 128,
    highRiskFindings: 19,
    recentAnalyses: 8,
    commonThreat: "Phishing",
  });

  const PageComponent = useMemo(() => pages[activePage] || Home, [activePage]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_30%)]" />
      <div className="fixed inset-0 -z-20 bg-cyber-grid bg-[size:22px_22px] opacity-20" />

      <Navbar activePage={activePage} onNavigate={setActivePage} />

      <div className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1600px] grid-cols-1 gap-6 px-4 pb-6 pt-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-6">
        <Sidebar activePage={activePage} onNavigate={setActivePage} summary={dashboardSummary} />
        <main className="space-y-6">
          <PageComponent
          summary={dashboardSummary}
          onSummaryChange={setDashboardSummary}
          onAnalysis={setLatestAnalysis}
          onNavigate={setActivePage}
          latestAnalysis={latestAnalysis}
        />
          <Footer />
        </main>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Assistant from "./pages/Assistant";

const pages = {
  home: Home,
  assistant: Assistant,
};

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const PageComponent = useMemo(() => pages[activePage] || Home, [activePage]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_30%)]" />
      <div className="fixed inset-0 -z-20 bg-cyber-grid bg-[size:22px_22px] opacity-20" />

      <Navbar activePage={activePage} onNavigate={setActivePage} />

      <div className="mx-auto min-h-[calc(100vh-72px)] max-w-[1200px] px-4 pb-6 pt-6 lg:px-6">
        <main className="space-y-6">
          <PageComponent onNavigate={setActivePage} />
          <Footer />
        </main>
      </div>
    </div>
  );
}

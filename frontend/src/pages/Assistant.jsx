import { useState } from "react";
import Card from "../components/common/Card";
import ChatBox from "../components/features/ChatBox";
import LogAnalyzer from "../components/features/LogAnalyzer";
import UrlAnalyzer from "../components/features/UrlAnalyzer";
import FileAnalyzer from "../components/features/FileAnalyzer";
import ThreatIntel from "../components/features/ThreatIntel";

const tabs = [
  ["chat", "Chat"],
  ["logs", "Logs"],
  ["url", "URL"],
  ["file", "File"],
  ["intel", "Threat Intel"],
];

export default function Assistant({ onSummaryChange, onAnalysis }) {
  const [tab, setTab] = useState("chat");

  return (
    <div className="space-y-6">
      <Card className="flex flex-wrap gap-2">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              tab === id ? "bg-cyan-400/20 text-white" : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            {label}
          </button>
        ))}
      </Card>

      {tab === "chat" ? <ChatBox onSummaryChange={onSummaryChange} /> : null}
      {tab === "logs" ? <LogAnalyzer onSummaryChange={onSummaryChange} onAnalysis={onAnalysis} /> : null}
      {tab === "url" ? <UrlAnalyzer onSummaryChange={onSummaryChange} onAnalysis={onAnalysis} /> : null}
      {tab === "file" ? <FileAnalyzer onSummaryChange={onSummaryChange} onAnalysis={onAnalysis} /> : null}
      {tab === "intel" ? <ThreatIntel onSummaryChange={onSummaryChange} onAnalysis={onAnalysis} /> : null}
    </div>
  );
}

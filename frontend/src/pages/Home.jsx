import Card from "../components/common/Card";
import Button from "../components/common/Button";
import SectionTitle from "../components/common/SectionTitle";

export default function Home({ onNavigate }) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="section-title">Multimodal Cybersecurity AI</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              Detect suspicious activity, explain threats, and accelerate response.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              A sleek Groq-powered assistant for logs, URLs, files, screenshots, indicators, and incident reports.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => onNavigate("assistant")}>Open Assistant</Button>
              <Button className="bg-white/5 text-white" onClick={() => onNavigate("dashboard")}>
                View Dashboard
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              ["Dark theme", "Glassmorphism dashboard with subtle neon accents."],
              ["Multimodal analysis", "Text, logs, URLs, files, and screenshots."],
              ["Defensive only", "Safety-first guidance with remediation focus."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-3xl border border-white/5 bg-white/5 p-5">
                <p className="text-lg font-semibold text-white">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <SectionTitle
        eyebrow="What it does"
        title="Designed for security operations"
        description="Everything is organized into a compact workflow so analysts can move from triage to reporting without leaving the interface."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Chat", "Ask questions, explain alerts, and get remediation guidance."],
          ["Analysis", "Review logs, URLs, indicators, and uploaded files."],
          ["Reports", "Compile findings into a shareable security report."],
        ].map(([title, body]) => (
          <Card key={title}>
            <p className="text-xl font-semibold text-white">{title}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}


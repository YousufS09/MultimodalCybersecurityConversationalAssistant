import Card from "../components/common/Card";
import Button from "../components/common/Button";
import SectionTitle from "../components/common/SectionTitle";

export default function Home({ onNavigate }) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <p className="section-title">Cybersecurity Conversational AI</p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
              A cybersecurity-only assistant for focused conversations.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              This project is intentionally scoped to cybersecurity discussions only. It helps users talk through
              threats, attack patterns, defenses, incident response, and security best practices.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => onNavigate("assistant")}>Open Assistant</Button>
            </div>
          </div>

          <div className="grid gap-4">
            {[
              ["Cybersecurity only", "Built to stay within security-related conversations."],
              ["Defensive guidance", "Focused on awareness, explanation, and best practices."],
              ["Clear boundaries", "No unrelated assistance beyond cybersecurity topics."],
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
        title="Designed for cybersecurity conversation"
        description="The interface is intentionally simple so users can ask cybersecurity questions and get focused, defensive answers."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["Chat", "Discuss threats, defenses, and security concepts."],
          ["Boundaries", "Outside cybersecurity, the assistant politely refuses."],
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

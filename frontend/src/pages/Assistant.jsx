import Card from "../components/common/Card";
import ChatBox from "../components/features/ChatBox";

export default function Assistant() {
  return (
    <div className="space-y-6">
      <Card className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Cybersecurity Assistant</p>
          <p className="text-xs text-slate-400">Conversation is limited to cybersecurity topics only.</p>
        </div>
        <div className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
          Chat mode
        </div>
      </Card>

      <ChatBox />
    </div>
  );
}

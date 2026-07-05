export function formatList(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function downloadText(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function bumpDashboardSummary(setter, riskLevel = null) {
  setter((current) => ({
    ...current,
    totalScans: current.totalScans + 1,
    recentAnalyses: current.recentAnalyses + 1,
    highRiskFindings:
      riskLevel === "High" || riskLevel === "Critical" ? current.highRiskFindings + 1 : current.highRiskFindings,
  }));
}

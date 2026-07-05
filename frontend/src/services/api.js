import { API_BASE_URL } from "../utils/constants";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || data.detail || "Request failed");
  }
  return data;
}

export const api = {
  chat: (payload) => request("/api/chat", { method: "POST", body: JSON.stringify(payload) }),
  analyzeLogs: (payload) => request("/api/analyze/logs", { method: "POST", body: JSON.stringify(payload) }),
  analyzeUrl: (payload) => request("/api/analyze/url", { method: "POST", body: JSON.stringify(payload) }),
  analyzeIndicator: (payload) => request("/api/analyze/indicator", { method: "POST", body: JSON.stringify(payload) }),
  generateReport: (payload) => request("/api/report/generate", { method: "POST", body: JSON.stringify(payload) }),
  uploadAnalyze: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/api/upload/analyze`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || data.detail || "Upload failed");
    }
    return data;
  },
};


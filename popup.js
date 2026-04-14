const copyBtn = document.getElementById("copy-btn");
const prettifyBtn = document.getElementById("prettify-btn");
const transcriptBtn = document.getElementById("transcript-btn");
const chatgptBtn = document.getElementById("chatgpt-btn");
const claudeBtn = document.getElementById("claude-btn");
const status = document.getElementById("status");

function setStatus(msg, type) {
  status.textContent = msg;
  status.className = type;
}

function setAllDisabled(disabled) {
  copyBtn.disabled = disabled;
  prettifyBtn.disabled = disabled;
  transcriptBtn.disabled = disabled;
  chatgptBtn.disabled = disabled;
  claudeBtn.disabled = disabled;
}

// ── Show transcript button only on YouTube watch pages ──────────
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  if (tab?.url && tab.url.includes("youtube.com/watch")) {
    transcriptBtn.style.display = "block";
  }
});

// ── Copy Full Page ──────────────────────────────────────────────
copyBtn.addEventListener("click", () => {
  setAllDisabled(true);
  setStatus("Copying…", "loading");

  chrome.runtime.sendMessage(
    { action: "copyAsMarkdown", mode: "full" },
    (response) => {
      setAllDisabled(false);
      if (chrome.runtime.lastError) {
        setStatus("Error: " + chrome.runtime.lastError.message, "error");
        return;
      }
      if (response?.success) {
        setStatus("✓ Copied to clipboard!", "success");
      } else {
        setStatus(response?.error || "Something went wrong.", "error");
      }
    },
  );
});

// ── Prettify & Copy ─────────────────────────────────────────────
prettifyBtn.addEventListener("click", () => {
  setAllDisabled(true);
  setStatus("Prettifying…", "loading");

  chrome.runtime.sendMessage(
    { action: "copyAsMarkdown", mode: "prettify" },
    (response) => {
      setAllDisabled(false);
      if (chrome.runtime.lastError) {
        setStatus("Error: " + chrome.runtime.lastError.message, "error");
        return;
      }
      if (response?.success) {
        const saved = response.tokensSaved
          ? ` (~${response.tokensSaved}% leaner)`
          : "";
        setStatus(`✓ Prettified & copied!${saved}`, "success");
      } else {
        setStatus(response?.error || "Something went wrong.", "error");
      }
    },
  );
});

// ── Copy Transcript (YouTube only) ─────────────────────────────
transcriptBtn.addEventListener("click", () => {
  setAllDisabled(true);
  setStatus("Fetching transcript…", "loading");

  chrome.runtime.sendMessage({ action: "copyTranscript" }, (response) => {
    setAllDisabled(false);
    if (chrome.runtime.lastError) {
      setStatus("Error: " + chrome.runtime.lastError.message, "error");
      return;
    }
    if (response?.success) {
      setStatus("✓ Transcript copied!", "success");
    } else {
      setStatus(response?.error || "Could not get transcript.", "error");
    }
  });
});

// ── Send to ChatGPT ─────────────────────────────────────────────
chatgptBtn.addEventListener("click", () => {
  setAllDisabled(true);
  setStatus("Copying & opening ChatGPT…", "loading");

  chrome.runtime.sendMessage(
    {
      action: "openAI",
      url: "https://chat.openai.com/?model=gpt-4o",
      ai: "ChatGPT",
    },
    (response) => {
      setAllDisabled(false);
      if (response?.success) {
        setStatus("✓ Just press ⌘V in ChatGPT!", "success");
      } else {
        setStatus(response?.error || "Something went wrong.", "error");
      }
    },
  );
});

// ── Send to Claude ──────────────────────────────────────────────
claudeBtn.addEventListener("click", () => {
  setAllDisabled(true);
  setStatus("Copying & opening Claude…", "loading");

  chrome.runtime.sendMessage(
    {
      action: "openAI",
      url: "https://claude.ai/new",
      ai: "Claude",
    },
    (response) => {
      setAllDisabled(false);
      if (response?.success) {
        setStatus("✓ Just press ⌘V in Claude!", "success");
      } else {
        setStatus(response?.error || "Something went wrong.", "error");
      }
    },
  );
});

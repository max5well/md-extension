// background.js — Manifest V3 service worker
// Listens for messages from popup.js and orchestrates script injection + copy.

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "copyAsMarkdown") {
    const mode = message.mode || "full"; // 'full' | 'prettify'

    (async () => {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (!tab?.id) {
          sendResponse({ success: false, error: "No active tab found." });
          return;
        }

        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["turndown.js"],
        });
        const results = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: runContentScript,
          args: [mode],
        });

        const result = results?.[0]?.result;
        if (!result?.success) {
          sendResponse({
            success: false,
            error: result?.error || "Could not extract page content.",
          });
          return;
        }
        sendResponse({ success: true, tokensSaved: result.tokensSaved });
      } catch (err) {
        sendResponse({ success: false, error: err.message });
      }
    })();
    return true;
  }

  if (message.action === "copyTranscript") {
    (async () => {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (!tab?.id) {
          sendResponse({ success: false, error: "No active tab found." });
          return;
        }

        const results = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: runTranscriptScript,
          world: "MAIN",
        });

        const result = results?.[0]?.result;
        if (!result?.success) {
          sendResponse({
            success: false,
            error: result?.error || "Could not get transcript.",
          });
          return;
        }
        sendResponse({ success: true });
      } catch (err) {
        sendResponse({ success: false, error: err.message });
      }
    })();
    return true;
  }

  if (message.action === "openAI") {
    const { url, ai } = message;

    (async () => {
      try {
        // 1. Copy the current tab's content first
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        if (!tab?.id) {
          sendResponse({ success: false, error: "No active tab found." });
          return;
        }

        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["turndown.js"],
        });
        const results = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: runContentScript,
          args: ["prettify"],
        });

        const result = results?.[0]?.result;
        if (!result?.success) {
          sendResponse({
            success: false,
            error: result?.error || "Could not extract page content.",
          });
          return;
        }

        // 2. Open the AI tab
        const newTab = await chrome.tabs.create({ url });

        // 3. Wait for the tab to finish loading, then inject the paste banner
        const onUpdated = (tabId, info) => {
          if (tabId !== newTab.id || info.status !== "complete") return;
          chrome.tabs.onUpdated.removeListener(onUpdated);

          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            func: injectPasteBanner,
            args: [ai],
          });
        };
        chrome.tabs.onUpdated.addListener(onUpdated);

        sendResponse({ success: true });
      } catch (err) {
        sendResponse({ success: false, error: err.message });
      }
    })();
    return true;
  }
});

// Injected into the AI tab — shows a floating "press Cmd+V" banner
function injectPasteBanner(ai) {
  // Don't inject twice
  if (document.getElementById("mdcopy-banner")) return;

  const isMac = navigator.platform.toUpperCase().includes("MAC");
  const shortcut = isMac ? "⌘V" : "Ctrl+V";

  const banner = document.createElement("div");
  banner.id = "mdcopy-banner";
  banner.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">
      <span style="font-size:20px;">📋</span>
      <div>
        <div style="font-weight:700;font-size:14px;color:#fff;line-height:1.2;">
          Page copied as Markdown
        </div>
        <div style="font-size:12px;color:rgba(255,255,255,0.65);margin-top:2px;">
          Press <kbd style="background:rgba(255,255,255,0.15);border-radius:4px;padding:1px 5px;font-family:monospace;font-size:12px;">${shortcut}</kbd> to paste into ${ai}
        </div>
      </div>
      <button id="mdcopy-dismiss" style="margin-left:auto;background:none;border:none;color:rgba(255,255,255,0.5);font-size:18px;cursor:pointer;line-height:1;padding:0 4px;">×</button>
    </div>
  `;

  Object.assign(banner.style, {
    position: "fixed",
    top: "16px",
    right: "16px",
    zIndex: "2147483647",
    background: "linear-gradient(135deg, #EC008C 0%, #00DCC8 100%)",
    borderRadius: "12px",
    padding: "12px 14px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
    maxWidth: "320px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    animation: "mdcopy-slide-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  });

  // Add keyframe animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes mdcopy-slide-in {
      from { opacity: 0; transform: translateY(-12px) scale(0.95); }
      to   { opacity: 1; transform: translateY(0)    scale(1);    }
    }
    @keyframes mdcopy-fade-out {
      from { opacity: 1; transform: translateY(0); }
      to   { opacity: 0; transform: translateY(-8px); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(banner);

  function dismiss() {
    banner.style.animation = "mdcopy-fade-out 0.2s ease forwards";
    setTimeout(() => banner.remove(), 200);
  }

  document.getElementById("mdcopy-dismiss").addEventListener("click", dismiss);

  // Also auto-dismiss after 8 seconds
  setTimeout(dismiss, 8000);

  // Try to focus the chat input so user can paste immediately
  setTimeout(() => {
    const selectors = [
      "#prompt-textarea", // ChatGPT
      '[data-testid="chat-input-view"] div[contenteditable]', // Claude
      "textarea[placeholder]",
      'div[contenteditable="true"]',
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) {
        el.focus();
        break;
      }
    }
  }, 800);
}

// Injected as a function so we can pass `mode` as an argument
function runContentScript(mode) {
  try {
    const turndownService = new TurndownService({
      headingStyle: "atx",
      hr: "---",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      fence: "```",
      emDelimiter: "_",
      strongDelimiter: "**",
      linkStyle: "inlined",
    });

    // Work on a clone so we never mutate the live DOM
    const container = document.createElement("div");

    const source =
      document.querySelector("main") ||
      document.querySelector("article") ||
      document.querySelector('[role="main"]') ||
      document.body;

    container.innerHTML = source.innerHTML;

    // ── Always remove structural noise ──────────────────────────
    const baseRemove = [
      "script",
      "style",
      "noscript",
      "iframe",
      "nav",
      "header",
      "footer",
      "aside",
      '[role="navigation"]',
      '[role="banner"]',
      '[role="contentinfo"]',
      ".nav",
      ".navbar",
      ".header",
      ".footer",
      ".sidebar",
      ".cookie-banner",
      ".ad",
      ".ads",
      ".advertisement",
    ];
    baseRemove.forEach((sel) =>
      container.querySelectorAll(sel).forEach((el) => el.remove()),
    );

    // ── Prettify mode: extra aggressive cleaning ─────────────────
    if (mode === "prettify") {
      const prettifyRemove = [
        // Images and media
        "img",
        "figure",
        "picture",
        "video",
        "audio",
        "canvas",
        "svg",
        // Interactive / social junk
        "button",
        "form",
        "input",
        "select",
        "textarea",
        '[class*="share"]',
        '[class*="social"]',
        '[class*="comment"]',
        '[class*="related"]',
        '[class*="recommend"]',
        '[class*="suggest"]',
        '[class*="promo"]',
        '[class*="banner"]',
        '[class*="popup"]',
        '[class*="modal"]',
        '[class*="newsletter"]',
        '[class*="subscribe"]',
        '[class*="cta"]',
        '[class*="author-bio"]',
        '[class*="tags"]',
        '[class*="breadcrumb"]',
        '[class*="pagination"]',
        '[class*="toc"]',
        // Tables of contents, skip-nav
        '[id*="toc"]',
        '[id*="table-of-contents"]',
      ];
      prettifyRemove.forEach((sel) =>
        container.querySelectorAll(sel).forEach((el) => el.remove()),
      );

      // Strip all hyperlinks but keep their text
      container.querySelectorAll("a").forEach((a) => {
        const span = document.createElement("span");
        span.innerHTML = a.innerHTML;
        a.replaceWith(span);
      });
    }

    // ── Build Markdown ───────────────────────────────────────────
    const title = document.title ? `# ${document.title}\n\n` : "";
    const url = mode === "full" ? `> Source: ${window.location.href}\n\n` : "";
    const rawMarkdown = turndownService.turndown(container.innerHTML);

    // Collapse excessive blank lines (3+ → 2)
    const body = rawMarkdown.replace(/\n{3,}/g, "\n\n").trim();

    const markdown = title + url + body;

    // ── Token savings estimate ───────────────────────────────────
    let tokensSaved = null;
    if (mode === "prettify") {
      const fullContainer = document.createElement("div");
      fullContainer.innerHTML = source.innerHTML;
      baseRemove.forEach((sel) =>
        fullContainer.querySelectorAll(sel).forEach((el) => el.remove()),
      );
      const fullLen = turndownService.turndown(fullContainer.innerHTML).length;
      const prettyLen = body.length;
      if (fullLen > 0) {
        tokensSaved = Math.round(((fullLen - prettyLen) / fullLen) * 100);
      }
    }

    // ── Copy to clipboard ────────────────────────────────────────
    const ta = document.createElement("textarea");
    ta.value = markdown;
    ta.style.cssText =
      "position:fixed;top:0;left:0;opacity:0;pointer-events:none;";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    if (!ok) throw new Error("execCommand copy failed");

    return { success: true, tokensSaved };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

// Injected into the page's MAIN world to access YouTube's JS globals
async function runTranscriptScript() {
  try {
    let playerResponse =
      window.ytInitialPlayerResponse ||
      window.ytplayer?.config?.args?.raw_player_response;
    if (
      !playerResponse &&
      window.ytplayer?.config?.args?.player_response_json
    ) {
      playerResponse = JSON.parse(
        window.ytplayer.config.args.player_response_json,
      );
    }

    if (!playerResponse)
      throw new Error("No transcript data found. Try reloading the page.");

    const tracks =
      playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!tracks || tracks.length === 0)
      throw new Error("No transcript available for this video.");

    const track =
      tracks.find((t) => t.languageCode && t.languageCode.startsWith("en")) ||
      tracks[0];

    if (!track?.baseUrl) throw new Error("Transcript URL not found.");

    const url =
      track.baseUrl +
      "&lang=" +
      encodeURIComponent(track.languageCode) +
      (track.name?.simpleText
        ? "&name=" + encodeURIComponent(track.name.simpleText)
        : "");
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Transcript fetch failed: ${resp.status}`);
    const xml = await resp.text();
    if (!xml || xml.trim().length === 0)
      throw new Error("Transcript response was empty.");

    // Parse XML transcript: <text start="..." dur="...">content</text>
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, "text/xml");
    const nodes = Array.from(doc.querySelectorAll("text"));
    if (nodes.length === 0)
      throw new Error("No transcript segments found in response.");

    const lines = nodes
      .map((node) => {
        // Decode HTML entities (YouTube encodes & as &amp; etc.)
        const ta = document.createElement("textarea");
        ta.innerHTML = node.textContent;
        return ta.value.replace(/\n/g, " ").trim();
      })
      .filter(Boolean);

    if (lines.length === 0) throw new Error("Transcript is empty.");

    const rawTitle = document.title
      .replace(/\s*[-–|]\s*YouTube\s*$/, "")
      .trim();
    const title = rawTitle ? `# ${rawTitle}\n\n` : "";
    const markdown = title + lines.join("\n");

    const ta = document.createElement("textarea");
    ta.value = markdown;
    ta.style.cssText =
      "position:fixed;top:0;left:0;opacity:0;pointer-events:none;";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    if (!ok) throw new Error("execCommand copy failed.");

    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

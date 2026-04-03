// background.js — Manifest V3 service worker
// Listens for messages from popup.js and orchestrates script injection + copy.

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action !== 'copyAsMarkdown') return;

  const mode = message.mode || 'full'; // 'full' | 'prettify'

  (async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab?.id) {
        sendResponse({ success: false, error: 'No active tab found.' });
        return;
      }

      // Inject Turndown library first, then the conversion script
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['turndown.js'],
      });

      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: runContentScript,
        args: [mode],
      });

      const result = results?.[0]?.result;

      if (!result?.success) {
        sendResponse({ success: false, error: result?.error || 'Could not extract page content.' });
        return;
      }

      sendResponse({ success: true, tokensSaved: result.tokensSaved });
    } catch (err) {
      sendResponse({ success: false, error: err.message });
    }
  })();

  return true; // keep message channel open for async response
});

// Injected as a function so we can pass `mode` as an argument
function runContentScript(mode) {
  try {
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      hr: '---',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced',
      fence: '```',
      emDelimiter: '_',
      strongDelimiter: '**',
      linkStyle: 'inlined',
    });

    // Work on a clone so we never mutate the live DOM
    const container = document.createElement('div');

    const source =
      document.querySelector('main') ||
      document.querySelector('article') ||
      document.querySelector('[role="main"]') ||
      document.body;

    container.innerHTML = source.innerHTML;

    // ── Always remove structural noise ──────────────────────────
    const baseRemove = [
      'script', 'style', 'noscript', 'iframe',
      'nav', 'header', 'footer', 'aside',
      '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]',
      '.nav', '.navbar', '.header', '.footer', '.sidebar',
      '.cookie-banner', '.ad', '.ads', '.advertisement',
    ];
    baseRemove.forEach(sel => container.querySelectorAll(sel).forEach(el => el.remove()));

    // ── Prettify mode: extra aggressive cleaning ─────────────────
    if (mode === 'prettify') {
      const prettifyRemove = [
        // Images and media
        'img', 'figure', 'picture', 'video', 'audio', 'canvas', 'svg',
        // Interactive / social junk
        'button', 'form', 'input', 'select', 'textarea',
        '[class*="share"]', '[class*="social"]', '[class*="comment"]',
        '[class*="related"]', '[class*="recommend"]', '[class*="suggest"]',
        '[class*="promo"]', '[class*="banner"]', '[class*="popup"]',
        '[class*="modal"]', '[class*="newsletter"]', '[class*="subscribe"]',
        '[class*="cta"]', '[class*="author-bio"]', '[class*="tags"]',
        '[class*="breadcrumb"]', '[class*="pagination"]', '[class*="toc"]',
        // Tables of contents, skip-nav
        '[id*="toc"]', '[id*="table-of-contents"]',
      ];
      prettifyRemove.forEach(sel => container.querySelectorAll(sel).forEach(el => el.remove()));

      // Strip all hyperlinks but keep their text
      container.querySelectorAll('a').forEach(a => {
        const span = document.createElement('span');
        span.innerHTML = a.innerHTML;
        a.replaceWith(span);
      });
    }

    // ── Build Markdown ───────────────────────────────────────────
    const title = document.title ? `# ${document.title}\n\n` : '';
    const url   = mode === 'full' ? `> Source: ${window.location.href}\n\n` : '';
    const rawMarkdown = turndownService.turndown(container.innerHTML);

    // Collapse excessive blank lines (3+ → 2)
    const body = rawMarkdown.replace(/\n{3,}/g, '\n\n').trim();

    const markdown = title + url + body;

    // ── Token savings estimate ───────────────────────────────────
    let tokensSaved = null;
    if (mode === 'prettify') {
      const fullContainer = document.createElement('div');
      fullContainer.innerHTML = source.innerHTML;
      baseRemove.forEach(sel => fullContainer.querySelectorAll(sel).forEach(el => el.remove()));
      const fullLen = turndownService.turndown(fullContainer.innerHTML).length;
      const prettyLen = body.length;
      if (fullLen > 0) {
        tokensSaved = Math.round(((fullLen - prettyLen) / fullLen) * 100);
      }
    }

    // ── Copy to clipboard ────────────────────────────────────────
    const ta = document.createElement('textarea');
    ta.value = markdown;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    if (!ok) throw new Error('execCommand copy failed');

    return { success: true, tokensSaved };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

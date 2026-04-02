// content.js — injected into the active tab by the background service worker
// Expects turndown.js to have been injected first.
// Converts the page to Markdown AND writes it to the clipboard directly,
// then returns a status object so background.js knows what happened.

(async function () {
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

    // Work on a temporary container so we don't mutate the live DOM
    const container = document.createElement('div');

    // Prefer <main> or <article> if present, else fall back to <body>
    const source =
      document.querySelector('main') ||
      document.querySelector('article') ||
      document.querySelector('[role="main"]') ||
      document.body;

    container.innerHTML = source.innerHTML;

    const removeSelectors = [
      'script', 'style', 'noscript', 'iframe',
      'nav', 'header', 'footer', 'aside',
      '[role="navigation"]', '[role="banner"]', '[role="contentinfo"]',
      '.nav', '.navbar', '.header', '.footer', '.sidebar',
      '.cookie-banner', '.ad', '.ads', '.advertisement',
    ];
    removeSelectors.forEach(sel => {
      container.querySelectorAll(sel).forEach(el => el.remove());
    });

    const title = document.title ? `# ${document.title}\n\n` : '';
    const url = `> Source: ${window.location.href}\n\n`;
    const body = turndownService.turndown(container.innerHTML);
    const markdown = title + url + body;

    // navigator.clipboard requires document focus, which is lost when the popup opens.
    // Fall back to the execCommand approach which works regardless of focus.
    const ta = document.createElement('textarea');
    ta.value = markdown;
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    if (!ok) throw new Error('execCommand copy failed');
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
})();

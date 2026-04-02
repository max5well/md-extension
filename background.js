// background.js — Manifest V3 service worker
// Listens for messages from popup.js and orchestrates script injection + copy.

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action !== 'copyAsMarkdown') return;

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
        files: ['content.js'],
      });

      const result = results?.[0]?.result;

      if (!result?.success) {
        sendResponse({ success: false, error: result?.error || 'Could not extract page content.' });
        return;
      }

      sendResponse({ success: true });
    } catch (err) {
      sendResponse({ success: false, error: err.message });
    }
  })();

  // Keep message channel open for async response
  return true;
});

const copyBtn     = document.getElementById('copy-btn');
const prettifyBtn = document.getElementById('prettify-btn');
const chatgptBtn  = document.getElementById('chatgpt-btn');
const claudeBtn   = document.getElementById('claude-btn');
const status      = document.getElementById('status');

function setStatus(msg, type) {
  status.textContent = msg;
  status.className = type;
}

function setAllDisabled(disabled) {
  copyBtn.disabled     = disabled;
  prettifyBtn.disabled = disabled;
  chatgptBtn.disabled  = disabled;
  claudeBtn.disabled   = disabled;
}

// ── Copy Full Page ──────────────────────────────────────────────
copyBtn.addEventListener('click', () => {
  setAllDisabled(true);
  setStatus('Copying…', 'loading');

  chrome.runtime.sendMessage({ action: 'copyAsMarkdown', mode: 'full' }, (response) => {
    setAllDisabled(false);
    if (chrome.runtime.lastError) {
      setStatus('Error: ' + chrome.runtime.lastError.message, 'error');
      return;
    }
    if (response?.success) {
      setStatus('✓ Copied to clipboard!', 'success');
    } else {
      setStatus(response?.error || 'Something went wrong.', 'error');
    }
  });
});

// ── Prettify & Copy ─────────────────────────────────────────────
prettifyBtn.addEventListener('click', () => {
  setAllDisabled(true);
  setStatus('Prettifying…', 'loading');

  chrome.runtime.sendMessage({ action: 'copyAsMarkdown', mode: 'prettify' }, (response) => {
    setAllDisabled(false);
    if (chrome.runtime.lastError) {
      setStatus('Error: ' + chrome.runtime.lastError.message, 'error');
      return;
    }
    if (response?.success) {
      const saved = response.tokensSaved ? ` (~${response.tokensSaved}% leaner)` : '';
      setStatus(`✓ Prettified & copied!${saved}`, 'success');
    } else {
      setStatus(response?.error || 'Something went wrong.', 'error');
    }
  });
});

// ── Send to ChatGPT ─────────────────────────────────────────────
chatgptBtn.addEventListener('click', () => {
  setAllDisabled(true);
  setStatus('Copying & opening ChatGPT…', 'loading');

  chrome.runtime.sendMessage({
    action: 'openAI',
    url: 'https://chat.openai.com/?model=gpt-4o',
    ai: 'ChatGPT',
  }, (response) => {
    setAllDisabled(false);
    if (response?.success) {
      setStatus('✓ Just press ⌘V in ChatGPT!', 'success');
    } else {
      setStatus(response?.error || 'Something went wrong.', 'error');
    }
  });
});

// ── Send to Claude ──────────────────────────────────────────────
claudeBtn.addEventListener('click', () => {
  setAllDisabled(true);
  setStatus('Copying & opening Claude…', 'loading');

  chrome.runtime.sendMessage({
    action: 'openAI',
    url: 'https://claude.ai/new',
    ai: 'Claude',
  }, (response) => {
    setAllDisabled(false);
    if (response?.success) {
      setStatus('✓ Just press ⌘V in Claude!', 'success');
    } else {
      setStatus(response?.error || 'Something went wrong.', 'error');
    }
  });
});

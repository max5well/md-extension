const btn = document.getElementById('copy-btn');
const status = document.getElementById('status');

function setStatus(msg, type) {
  status.textContent = msg;
  status.className = type;
}

btn.addEventListener('click', async () => {
  btn.disabled = true;
  setStatus('Copying…', 'loading');

  chrome.runtime.sendMessage({ action: 'copyAsMarkdown' }, (response) => {
    btn.disabled = false;
    if (chrome.runtime.lastError) {
      setStatus('Error: ' + chrome.runtime.lastError.message, 'error');
      return;
    }
    if (response?.success) {
      setStatus('Copied to clipboard!', 'success');
    } else {
      setStatus(response?.error || 'Something went wrong.', 'error');
    }
  });
});

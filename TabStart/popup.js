document.getElementById('saveBtn').addEventListener('click', () => {
  const url = document.getElementById('urlInput').value;
  if (url) {
    chrome.storage.local.set({ targetUrl: url }, () => {
      const status = document.getElementById('status');
      status.textContent = "Saved! This page will open on startup.";
      setTimeout(() => { status.textContent = ""; }, 3000);
    });
  }
});

chrome.storage.local.get("targetUrl", (data) => {
  if (data.targetUrl) {
    document.getElementById('urlInput').value = data.targetUrl;
  }
});
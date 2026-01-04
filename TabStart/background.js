chrome.runtime.onStartup.addListener(() => {
  chrome.storage.local.get("targetUrl", (data) => {
    if (data.targetUrl) {
      chrome.tabs.create({ url: data.targetUrl, active: true });
    }
  });
});
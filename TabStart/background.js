function openStartupTab() {
  chrome.storage.local.get("targetUrl", (data) => {
    if (data.targetUrl) {
      // Önce bir pencere var mı kontrol ediyoruz
      chrome.windows.getLastFocused((window) => {
        if (window) {
          // Pencere hazırsa sekmeyi aç
          chrome.tabs.create({ url: data.targetUrl, active: true });
        } else {
          // Pencere henüz hazır değilse, 1 saniye sonra tekrar dene
          setTimeout(openStartupTab, 1000);
        }
      });
    }
  });
}

// Chrome her açıldığında tetiklenir
chrome.runtime.onStartup.addListener(() => {
  openStartupTab();
});

// Kurulumda veya güncellemede çalışır
chrome.runtime.onInstalled.addListener(() => {
  console.log("TabStart Ready!");
});
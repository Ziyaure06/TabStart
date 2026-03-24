// URL'yi formatlayan ve doğrulayan yardımcı fonksiyon
function formatAndValidateUrl(inputUrl) {
  // Başındaki ve sonundaki boşlukları temizle
  let url = inputUrl.trim();

  // Eğer boş girildiyse null dön
  if (!url) return null;

  // Eğer url http:// veya https:// ile başlamıyorsa, başına https:// ekle
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  // URL'nin gerçekten geçerli bir formatta olup olmadığını kontrol et
  try {
    new URL(url); 
    return url; // Geçerliyse düzenlenmiş URL'yi döndür
  } catch (error) {
    return null; // URL geçerli değilse null döndür
  }
}

document.getElementById('saveBtn').addEventListener('click', () => {
  const rawUrl = document.getElementById('urlInput').value;
  const status = document.getElementById('status');
  
  // URL'yi doğrula ve formatla
  const validUrl = formatAndValidateUrl(rawUrl);

  if (validUrl) {
    // Geçerli URL ise kaydet
    chrome.storage.local.set({ targetUrl: validUrl }, () => {
      // Input kutusundaki metni düzenlenmiş haliyle (https:// eklenmiş vb.) güncelle
      document.getElementById('urlInput').value = validUrl;
      
      // Başarı mesajını göster
      status.style.color = "green";
      status.textContent = "Kaydedildi! Bu sayfa başlangıçta açılacak.";
      setTimeout(() => { status.textContent = ""; }, 3000);
    });
  } else {
    // Geçersiz URL ise hata mesajı göster
    status.style.color = "red";
    status.textContent = "Lütfen geçerli bir URL girin!";
    setTimeout(() => { status.textContent = ""; }, 3000);
  }
});

// Sayfa yüklendiğinde kaydedilmiş URL'yi kutuya getir
chrome.storage.local.get("targetUrl", (data) => {
  if (data.targetUrl) {
    document.getElementById('urlInput').value = data.targetUrl;
  }
});

# Depo İnceleme – Telefon Uygulaması (PWA)

Sahada telefondan doldurulan, internetsiz de çalışan inceleme formu. Fotoğraflar ve Excel, Power Automate üzerinden SharePoint'e gönderilir.

## 1. Dosyalar

| Dosya | Görevi |
|---|---|
| `index.html` | Uygulamanın kendisi |
| `sw.js` | Çevrimdışı çalışmayı sağlar |
| `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` | Ana ekran simgesi ve uygulama bilgisi |
| `xlsx.min.js` | Excel üretimi (internetsiz çalışsın diye pakete dahil) |

## 2. Yayınlama (HTTPS şart)

Telefon uygulamayı yalnızca **https** adresinden "uygulama" olarak yükler. Klasörün tamamını aşağıdakilerden birine koyun:

- **Şirket web sunucusu / Azure Static Web Apps / Azure Storage "static website"**: BT onayı gerekebilir. Kurumsal veriler için en doğru yol budur.
- **GitHub Pages / Netlify / Cloudflare Pages**: Hızlıdır. Uygulamada hiçbir veri ve şifre yoktur (akış adresi her telefonda ayrıca girilir). Yine de şirket politikasına uygunluğunu BT'ye sorun.

Yayınladıktan sonra adresi telefonda açın.

## 3. Telefona yükleme

- **Android (Chrome):** ⋮ menüsü, "Uygulamayı yükle" (veya Ayarlar ekranındaki düğme).
- **iPhone (Safari):** Paylaş simgesi, "Ana Ekrana Ekle". iPhone'da mutlaka Safari kullanın.

Bir kez internetle açıldıktan sonra uygulama internetsiz de açılır. Veriler telefondaki uygulama deposunda kalır. Tarayıcı verisini silerseniz gönderilmemiş incelemeler kaybolur; sahadan dönünce gönderin.

## 4. Power Automate akışı

Amaç: uygulamadan gelen fotoğraf ve Excel dosyalarını SharePoint klasörüne yazmak.

1. Power Automate, **Oluştur → Anlık bulut akışı → Bir HTTP isteği alındığında** tetikleyicisini seçin (adı örn. `Depo Inceleme Yukle`).
2. Tetikleyicide **Request Body JSON Schema** alanını boş bırakın. Uygulama gövdeyi `text/plain` olarak yollar (tarayıcı ön kontrolü olmasın diye).
3. **Veri İşlemleri → Compose** ekleyin. Girdisi: `json(triggerBody())`
   - Gövde `text/plain` geldiği için bazı ortamlarda `triggerBody()` metin olarak gelir; `json(...)` bunu nesneye çevirir. Zaten nesne ise de sorunsuz çalışır.
4. **Koşul** ekleyin: `outputs('Compose')?['type']` eşittir `photo`.
   - **Evet:** SharePoint **Dosya oluştur (Create file)**
     - Site adresi: hedef site
     - Klasör yolu: örn. `/Shared Documents/Depo Incelemeleri/Fotograflar`
     - Dosya adı: `outputs('Compose')?['fileName']`
     - Dosya içeriği: `base64ToBinary(outputs('Compose')?['contentBase64'])`
   - **Hayır:** ikinci bir koşul: `type` eşittir `xlsx`
     - **Evet:** yine **Dosya oluştur**, klasör örn. `/Shared Documents/Depo Incelemeleri/Excel`, aynı dosya adı ve içerik ifadeleri.
     - **Hayır:** (ping) bir şey yapmayın.
5. Koşulların **dışına, en sona** **Yanıt (Response)** adımı ekleyin:
   - Durum kodu: `200`
   - Üst bilgiler: `Access-Control-Allow-Origin` = `*`
   - Gövde: `{"ok":true}`
   - Yanıt adımı olmazsa dosyalar yüklenir ama uygulama sonucu okuyamaz ve "doğrulanamadı" uyarısı verir.
6. Kaydedin. Kaydedince tetikleyicide **HTTP POST URL** oluşur. Bu adresi kopyalayın.
7. Telefonda uygulamada **⚙ Ayarlar → Power Automate akış adresi** alanına yapıştırın, **Kaydet**, sonra **Bağlantıyı dene**'ye basın. "Bağlantı çalışıyor ✓" görmelisiniz.

Notlar:
- Akış adresi gizli bir anahtardır, adresi bilen herkes klasöre dosya yazabilir. Paylaşmayın. Sızarsa akışta adresi yeniden oluşturun.
- Akışı çalıştıran hesabın hedef SharePoint klasöründe **yazma** yetkisi olmalı. Bağlantıyı (connection) kendi hesabınızla oluşturursanız dosyalar sizin adınıza yazılır.
- HTTP tetikleyicisi bazı kurumsal kiracılarda (premium bağlayıcı lisansı, DLP politikası) kapalı olabilir. Bu durumda BT'den izin isteyin.
- Tek istekte yaklaşık 100 MB'a kadar gövde kabul edilir. Uygulama fotoğrafları 1600 piksele küçültür (genelde 300-600 KB), bu yüzden sorun olmaz.
- Aynı adda dosya "Dosya oluştur" adımını hata ile bitirir. Uygulama dosya adlarına kısa bir kimlik ve zaman damgası ekler, yani her gönderim benzersizdir.

## 5. Sahada kullanım

1. **+ Yeni inceleme**, depo adını yazın, bölümleri doldurun. Her bölümde **+ Fotoğraf** ile çekim yapın (telefon kamerası açılır).
2. Her değişiklik anında telefona kaydedilir.
3. İnternet olduğunda formda **SharePoint'e gönder**. Önce fotoğraflar, sonra Excel gider. Gönderilen fotoğraflarda ✓ görünür. Hata olursa kalan fotoğraflar işaretsiz kalır, tekrar basınca kaldığı yerden devam eder.
4. **Excel indir**: tek incelemeyi, listedeki **Tümünü Excel'e aktar**: tüm incelemeleri yan yana (her inceleme bir kolon) indirir.
5. İncelemede değişiklik yaparsanız liste "Gönderilmedi" gösterir, tekrar gönderebilirsiniz. Excel yeni adla yeni dosya olarak yazılır.

## 6. Güncelleme

`index.html` değiştirdiğinizde `sw.js` içindeki `CACHE` adını (`depo-inceleme-v1`) `v2` yapın, yoksa telefonlar eski sürümü gösterir.

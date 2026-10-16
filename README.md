# Depo İnceleme – Telefon Uygulaması (PWA)

Sahada telefondan doldurulan, internetsiz de çalışan inceleme formu. Rapor (Excel + fotoğraflar) telefonun Paylaş menüsüyle e-postaya eklenir.

## Dosyalar
`index.html` (uygulama), `sw.js` (çevrimdışı çalışma), `manifest.webmanifest` + simgeler, `exceljs.min.js` (Excel raporu üretimi, pakete dahil).

## Yayınlama (HTTPS şart)
Klasörün **içindeki tüm dosyaları** bir https adresine koyun (ör. GitHub Pages: repo → Settings → Pages → main / root). Şirket verisi uygulamada tutulmaz; her şey telefonda kalır.

## Telefona yükleme
- **iPhone:** Safari'de adresi açın → Paylaş (veya ⋯) → "Ana Ekrana Ekle" (listeyi yukarı kaydırın).
- **Android:** Chrome ⋮ menüsü → "Uygulamayı yükle".

İlk açılışı internetliyken yapın; sonra internetsiz de çalışır.

## Sahada kullanım
1. **+ Yeni inceleme** → depo adı → bölümleri doldurun. Her bölümde **+ Fotoğraf** ile kamera açılır.
2. Her değişiklik anında telefona kaydedilir.
3. Gezi bitince formda **E-postayla gönder**: Paylaş menüsü açılır → **Mail** → kendi adresinizi yazın → Gönder. Ekte Excel raporu ve (Ayarlar'da açıksa) orijinal fotoğraflar olur.
4. Listede **Tümünü e-postala**: tüm depoları tek Excel'de (her depo bir satır / bir sütun) gönderir.
5. **Excel indir**: raporu dosya olarak indirir.

## Excel raporu
- **İnceleme Özeti:** Portföy Takip Raporu düzeninde (başlık, banner, GENEL / LOKASYON / KARAR / TEKNİK BİLGİLER grupları). ÖZET kolonu portföy raporundaki ÖZET satırlarıyla aynı mantıkta; hedefi karşılayan değerler yeşil, karşılamayanlar kırmızı.
- **Detaylar:** Tüm kriterler, depolar yan yana, hedef kolonuyla.
- **Fotoğraflar:** Depo ve bölüm bazında küçük resimler.

## Notlar
- Alıcıyı Paylaş menüsünde (Mail'de) siz seçersiniz; uygulama alıcı dolduramaz. Ayarlar'daki adres yalnızca Paylaş menüsü olmayan tarayıcılarda otomatik doldurulur.
- Çok fazla fotoğraf varsa telefon yalnızca Excel'i ekleyebilir; Excel'in "Fotoğraflar" sayfasında küçük hâlleri zaten bulunur.
- Tarayıcı verisini silerseniz gönderilmemiş incelemeler kaybolur; sahadan dönünce raporu e-postalayın.
- Güncelleme: `index.html` değişirse `sw.js` içindeki `CACHE` adını artırın (`depo-inceleme-v4` → `v5`). Yeni sürüm, uygulamayı bir kez internetliyken açıp kapatınca yüklenir.

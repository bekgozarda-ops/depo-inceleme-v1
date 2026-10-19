# Depo İnceleme – Telefon Uygulaması (PWA)

Sahada telefondan doldurulan, internetsiz de çalışan inceleme formu. Rapor (Excel + fotoğraflar) telefonun Paylaş menüsüyle e-postaya eklenir.

## Dosyalar
`index.html` (uygulama), `sw.js` (çevrimdışı çalışma), `manifest.webmanifest` + simgeler, `exceljs.min.js` (Excel raporu üretimi), `heic2any.min.js` (iPhone HEIC fotoğraflarını JPG'e çevirir; bilgisayarda/Edge'de gerekir). İkisi de pakete dahil.

## Yayınlama (HTTPS şart)
Klasörün **içindeki tüm dosyaları** bir https adresine koyun (ör. GitHub Pages: repo → Settings → Pages → main / root). Şirket verisi uygulamada tutulmaz; her şey telefonda kalır.

## Telefona yükleme
- **iPhone:** Safari'de adresi açın → Paylaş (veya ⋯) → "Ana Ekrana Ekle" (listeyi yukarı kaydırın).
- **Android:** Chrome ⋮ menüsü → "Uygulamayı yükle".

İlk açılışı internetliyken yapın; sonra internetsiz de çalışır.

## Sahada kullanım
1. **+ Yeni inceleme** → depo adı → bölümleri doldurun. Her bölümde **+ Fotoğraf** ile kamera açılır.
2. Her değişiklik anında telefona kaydedilir.
3. Gezi bitince formda **E-postayla gönder**: rapor hazırlanır (birkaç saniye), alttaki yeşil **Mail'e ekle ve gönder** düğmesi çıkar. Ona dokunun → Paylaş menüsünde **Mail** → kendi adresinizi yazın → Gönder. Ekte PDF rapor ve (Ayarlar'da açıksa) orijinal fotoğraflar olur. iPhone Excel dosyasını doğrudan eklemeye izin vermeyebilir; bu durumda yeşil düğmenin yanındaki **Excel** düğmesiyle Excel'i Dosyalar'a kaydedip Mail'de "Ek ekle" ile ekleyin.
4. **Birden fazla depo (ör. Ankara gezisi):** Ana sayfada **Excel raporu** (veya siyah posta düğmesi) → üstteki mavi **Rapora alınacak depolar** çubuğuna dokunun; yukarıdan açılan pencerede depoları işaretleyip **Tamam**'a basın. **Excel indir**, **PDF** ve **E-posta** yalnızca seçili depoları tek dosyada verir. Formdan **Excel** açarsanız o depo seçili gelir, diğerlerini de ekleyebilirsiniz.
5. Kat bilgisi: formda **Kat ve depolama** bölümünde her kat için ad, depolama m² ve (varsa) mezanin m² girilir; toplamlar otomatik hesaplanır. Eski kayıtlardaki Zemin/Bodrum değerleri otomatik kat satırına dönüşür.

## Rapora fotoğraf seçimi
Formda her fotoğrafın altındaki **✓ Raporda / Rapor dışı** düğmesi veya rapor ekranında **Fotoğraflar** sekmesinde fotoğrafa dokunarak, Excel/PDF/e-postaya girecek fotoğrafları seçersiniz (varsayılan: hepsi).

## Bilgisayarda e-posta
Bilgisayar tarayıcısında (Edge/Chrome) paylaşım menüsü yoktur ve web uygulaması e-postayı kendisi gönderemez. **E-posta** düğmesi, raporları ekli bir **.eml taslağı** olarak indirir; dosyaya çift tıklayınca Outlook/Mail yeni e-posta olarak açar, alıcıyı yazıp gönderirsiniz.

## Excel raporu
- **İnceleme Özeti:** Portföy Takip Raporu düzeninde (başlık, GENEL / LOKASYON / KARAR / TEKNİK BİLGİLER grupları; KAPALI ALAN'dan sonra KAT SAYISI, BULUNDUĞU KAT, KAT DEPOLAMA, DEPOLAMA TOPLAM, MEZANİN KAT, KAT MEZANİN, MEZANİN TOPLAM — her kat ayrı satırda). ÖZET kolonu portföy raporundaki ÖZET satırlarıyla aynı mantıkta; hedefi karşılayan değerler yeşil, karşılamayanlar kırmızı.
- **Detaylar:** Tüm kriterler, depolar yan yana, hedef kolonuyla.
- **Fotoğraflar:** Depo ve bölüm bazında küçük resimler.
- **PDF rapor:** Birden fazla depoda ilk sayfada karşılaştırma tablosu, her depo için özet kutuları + ÖZET + kriterler + seçili fotoğraflar. Aynı içerik, telefonda ve Mail'de doğrudan açılır; direktöre iletmek için uygundur.

## Notlar
- Alıcıyı Paylaş menüsünde (Mail'de) siz seçersiniz; uygulama alıcı dolduramaz. Ayarlar'daki adres yalnızca Paylaş menüsü olmayan tarayıcılarda otomatik doldurulur.
- Çok fazla fotoğraf varsa telefon yalnızca Excel'i ekleyebilir; Excel'in "Fotoğraflar" sayfasında küçük hâlleri zaten bulunur.
- Tarayıcı verisini silerseniz gönderilmemiş incelemeler kaybolur; sahadan dönünce raporu e-postalayın.
- Güncelleme: dosyaları GitHub'a aynı isimlerle yükleyin. Bu sürümden sonra uygulama internetliyken her açılışta en yeni sürümü kendisi alır ve yeniler (Ayarlar'ın altında sürüm yazar). `sw.js` içindeki `CACHE` adını artırmak yine iyi olur.

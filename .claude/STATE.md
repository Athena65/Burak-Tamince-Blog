# BTblog — çalışma durumu

Son güncelleme: 2026-09-07 (oturum 2 sonu). Bu dosya, oturum kesilirse kaldığı yerden devam edebilmek için tutuluyor.

## Proje

- **Repo:** `Athena65/btblog` · **Dal:** `bt/fixes` (ana dal `main`)
- **Yığın:** Vite 5 + React 18 + Tailwind 3.4, router yok, tek sayfa + çapa (anchor) navigasyonu
- **Barındırma:** GitHub Pages, özel alan adı `buraktamince.net.tr` (`CNAME` + `public/CNAME`)
- **Deploy:** `.github/workflows/deploy.yml` — **yalnızca `main`'e push'ta** çalışır. `bt/fixes`'e push canlıyı güncellemez, `main`'e merge gerekir.
- **Backend yok ve olamaz.** Pages saf statik sunucu. Sunucu tarafı iş gerekirse: GitHub Actions (cron ile JSON üret), Cloudflare Workers, Formspree/Web3Forms, Giscus.

### Komutlar
```bash
npm run dev      # geliştirme (5173, doluysa 5174)
npm run build    # üretim derlemesi
npm run preview  # dist'i sun
```

---

## Tasarım sistemi (frontend-design skill'e göre yeniden kuruldu)

Eski hâli jenerik "siyah zemin + tek mavi vurgu + her bölüm aynı cam kart" kalıbıydı. Yeni kimlik:

**Renk** (`tailwind.config.js`)
| Token | Değer | Kullanım |
|---|---|---|
| `ink` / `ink-2` / `ink-3` | `#0A1418` / `#0E1B21` / `#132630` | zemin, yüzey, yükseltilmiş yüzey |
| `rule` / `rule-strong` | `#1E3843` / `#2A4C5A` | saç teli çizgiler |
| `paper` / `paper-dim` / `paper-mute` | `#E6EFF1` / `#A3B5BB` / `#6E8590` | metin kademeleri |
| `accent` (çini turkuazı) | `#2EC4B6` | etkileşim, aktif durum, bağlantı |
| `brass` (pirinç) | `#E4B363` | **yalnızca veri**: tarih, süre, GPA, yıldız, seviye |

**Tipografi:** Archivo (variable, genişlik ekseni — `stretch-wide` / `stretch-xwide` yardımcı sınıfları) başlıklar + IBM Plex Sans gövde. Roboto/Raleway/Poppins kaldırıldı.

**Yapı:** Bölümler yuvarlak kart değil, üstten tek `border-t border-rule` ile ayrılan düz bantlar. Ortak `src/components/SectionHeader.jsx` (sola hizalı, asimetrik başlık + açıklama). Gradient alt çizgiler, blur "glow" daireleri, `backdrop-blur`, `hover:-translate-y` kaldırıldı.

**Yasaklı sınıflar:** `uppercase`, `tracking-wide*`, `italic`, `font-mono`, `bg-black/`, `bg-white/`, `border-white/`, `text-white`, `blur-[`, `backdrop-blur`, `rounded-xl/2xl`, `shadow-2xl`, `·`, `→`.

**Arka plan:** `body::before` = fotoğraf katmanı (%55 opaklık), `body::after` = ışık + okunabilirlik yıkaması. Bölümler `rgba(10,20,24,0.5)` yarı saydam.

---

## Tamamlananlar

### Tasarım
- [x] Tüm bileşenler yeni tasarım sistemine geçirildi (Hero, Header, About, Languages, Skills, Certificates, Resume, Portfolio, Videos, Footer, ScrollTop, MouseTrail)
- [x] Hero: sahte terminal penceresi ("create-react-app" yazıyordu, oysa proje Vite) kaldırıldı → gerçek verili **"Şu anda"** paneli (Rapidsol + Waytogo rolleri, dönemler, GPA)
- [x] Arka plan fotoğrafı: `hero-bg.jpg` (yakın selfie, geniş ekranda hep surat olarak kırpılıyordu) → `me266.jpg` snowboard karesi. İki kırpım üretildi:
  - `public/assets/img/site-bg.webp` (2400×1350, geniş ekran)
  - `public/assets/img/site-bg-portrait.webp` (1080×1440, `@media (max-aspect-ratio: 1/1)`)
  - İkisi de karartılıp (`brightness 0.42`) mürekkep paletine tint'lendi; max parlaklık 255 → ~120, metin kontrastı güvende
- [x] Erişilebilirlik: global `:focus-visible`, ikon butonlarda `aria-label`, progress bar `aria-valuenow`, `prefers-reduced-motion`
- [x] Hover efektleri: sertifika + proje kartlarında kenarlık + görsel yakınlaşma + "tam boyutta gör" katmanı; görsele tıklayınca lightbox

### İçerik düzeltmeleri
- [x] 4 video kaldırıldı (Money-Levent Kırca, David Blaine, Forza Horizon 5, Forza Horizon 4) → 4 snowboard videosu kaldı
- [x] Yanlış bilgi düzeltildi: "Arduino and IoT projects" ve "with Bedrock" ifadeleri kaldırıldı
- [x] Eğitim bilgisi `ranks.jpeg` plaketlerinden okundu ve düzeltildi: **2025 — Bilgisayar Mühendisliği bölüm birincisi, Mühendislik Fakültesi birincisi, üniversite üçüncüsü**, GPA 3.88
- [x] Sertifika kurum/tarih bilgileri görsellerden okundu:
  - `javacert.jpg` → TÜBİTAK BİLGEM YTE Bootcamp 2023: Java Eğitimi, 14.10.2023
  - `mikroserviscert.jpg` → Mikroservis Mimarileri Eğitimi, 15.10.2023
  - `uxcert.jpg` → Kullanıcı Deneyimi ve Kullanılabilirlik Eğitimi, 14.10.2023
  - `ranks.jpeg` → İstanbul Gedik Üniversitesi, 2025
- [x] CV PDF'inin iç başlığı `Europass` → `Burak Tamince - CV` (pdf-lib ile). Yedek: `public/assets/resume/BT_1611_CV.pdf.bak`
- [x] Resume hover önizlemesi kesiliyordu → mutlak konumlu kapsayıcının genişliği butona sıkışıyordu; `w-max` + kare `object-contain` ile düzeltildi

### SEO
- [x] `buraktamince` araması: keywords'e eklendi, Person şemasına `alternateName`, WebSite şemasına `alternateName`, `ProfilePage` düğümü eklendi
- [x] `og:image`: profil fotoğrafı (3456×4608 dikey, kırpılıyordu) → özel **1200×630** kart `public/assets/img/og-card.png` (sharp ile üretildi; script `scratchpad/ogcard.js`)
- [x] `hreflang`: en / tr / x-default
- [x] `sitemap.xml` tarihleri güncellendi
- [x] Kullanılmayan Font Awesome CDN bağlantısı kaldırıldı

### i18n (Türkçe + İngilizce)
- [x] `src/i18n/LanguageContext.jsx` — `useLanguage()` → `{ lang, setLang, t }`
- **Desen:** merkezî sözlük **yok**. Çeviriler kullanıldıkları yerde: `t({ en: 'Projects', tr: 'Projeler' })`. Paralel ajan çakışmasını önlemek için böyle seçildi — merkezî sözlük dosyası oluşturmayın.
- Dil tespiti sırası: `?lang=tr` → `localStorage` (`bt-lang`) → tarayıcı dili → `en`
- [x] Tüm bileşenler çevrildi. Çevrilmeyenler: kişi/şirket adları, teknoloji adları, URL'ler, e-posta, YouTube id'leri
- [x] **Dikkat:** `Skills.jsx` içindeki `period` dizeleri ("Feb 2025 – Present") İngilizce kalmalı — `tenureMonthsFromPeriod` bunları ayrıştırıyor
- [x] `src/components/LanguageToggle.jsx` — tek buton switch, rail'in **en üstünde**, 44px plaka (diğer nav item'larla aynı), üstünde mevcut dilin kodu, hover'da yana açılıp hedef dili gösteriyor

### Analytics (GA4)
- [x] `src/utils/analytics.js` — `trackEvent`, `trackOutbound`, `trackCvDownload`
- [x] `src/components/AnalyticsDebugPanel.jsx` — **`?debug=analytics`** ile açılır, olayları canlı listeler. `window.__btEvents` dizisinden de okunabilir
- Olaylar: `cv_download`, `cv_open`, `outbound_click`, `filter_used`, `lightbox_open`, `language_change`

### Diğer
- [x] `public/404.html` — bağımsız, iki dilli, ortalı ve responsive (GitHub Pages bilinmeyen yolda bunu sunar). Not: `_redirects` Netlify'a özgüdür, Pages'te işe yaramaz
- [x] Portfolio: **Isotope + imagesLoaded kaldırıldı** → düz CSS grid (`grid gap-6 sm:grid-cols-2 lg:grid-cols-3`), kartlar `h-full` ile eşit yükseklikte. "Show/hide key features" düğmesi kaldırıldı, özellikler hep görünür — hizalama sorununun sebebi buydu. JS paketi 300 kB → 271 kB
- [x] Proje kartlarına canlı GitHub verisi (yıldız + son güncelleme), tokensiz public REST ile, sessizce başarısız oluyor
- [x] `404.html` ortalandı ve responsive yapıldı (dikey+yatay ortalı, iki dil yan yana, dar ekranda alt alta)
- [x] Mobil arka plan kırpması düzeltildi: 16:9 görsel uzun telefon ekranında yatayda dar bir şeride düşüyordu → `@media (max-aspect-ratio: 1/1)` ile 3:4 dikey kırpım
- [x] `document.title` ve meta description dil değişince güncelleniyor (`App.jsx` içinde `useEffect`)

---

## Devam eden / bekleyen

### GitHub paneli — ✅ EKLENDİ VE YAYINDA HAZIR
Ayrı bölüm açılmadı. Panel, **Projects bölümünün içine**, başlığın hemen altına gömüldü.

- `src/components/GitHubStats.jsx` — GitHub'ın kendi katkı takvimine benzeyen SVG ısı haritası: üstte ay etiketleri, solda Pzt/Çar/Cum, 5 kademeli turkuaz (`#132630 → #67D9CF`), "Az → Çok" lejantı, "En yoğun gün".
  - **Tam genişlik:** svg sabit piksel yerine `viewBox` + `w-full h-auto` ile kapsayıcıya ölçekleniyor; yıl dolmamış olsa da yatayda tamamen yayılır, en yeni hafta hep sağa yaslı kalır, hücreler veri miktarına göre büyür/küçülür. Dar ekranlarda `min-w-[34rem]` ile kaydırılır.
  - **Hover:** her hücre üzerine gelince `stroke-paper` ile ince çerçeve çıkar; native `<title>` tooltip'i katkı sayısı ve tarihi gösterir. Üstte 4 rakam (herkese açık depo, alınan yıldız, bu yılki katkı, aktif gün), altta oransal dil çubuğu + lejant, profil bağlantısı. Tümü iki dilli.
- `Portfolio.jsx` başlığı → **GitHub Projects / GitHub Projeleri**; `Header.jsx` nav etiketi ve ikonu (`bi-github`) da aynı
- `GitHubActivity.jsx` **silindi** (eski ayrı-bölüm sürümü)
- `public/data/github-stats.json` — 367 gün, 165 katkı, 33 aktif gün, 33 repo, 39 yıldız, 8 dil

### Geniş ekran responsive düzeltmesi — ✅
Çok büyük ekranlarda düzen donuyordu. Ölçülen kusurlar ve sonrası:

| Genişlik | Önce içerik | Sonra içerik | Önce boşluk (sol/sağ) | Sonra |
|---|---|---|---|---|
| 1600px | 1312px | 1312px | 190 / 98 | aynı |
| 1920px | 1312px | **1464px** | 350 / 258 | **228 / 228** |
| 2560px | 1312px | **1556px** | 670 / 578 | **502 / 502** |
| 3840px | 1312px | **1739px** | 1310 / 1218 | **1051 / 1051** |

Üç kök sebep, `src/index.css` içinde çözüldü:
1. **Kolon büyümüyordu** — `max-width` sabit `1500px` idi. `--container-max` CSS değişkenine ve **rem** birimine geçirildi, böylece kök yazı tipiyle birlikte büyüyor.
2. **Kenar boşlukları asimetrikti** — rail için ayrılan `padding-left: 140px`, ortalanmış kolonu ~90px sağa kaydırıyordu. `min-width: 1900px` üzerinde (ortalama zaten rail'i temizlediği noktada) padding simetrik hâle geliyor.
3. **Tipografi ölçeklenmiyordu** — 2400 / 3000 / 3600px kırılımlarında kök yazı tipi 17 / 18 / 19px'e çıkıyor; rem tabanlı tüm boyut, boşluk ve `62ch` ölçüsü bunu takip ediyor. h1 116px → 138px.

Ayrıca rail (`#header`) 1900px üzerinde `left: max(0px, calc((100vw - var(--container-max)) / 2 - 8.75rem))` ile içeriğin yanına geliyor; 4K'da 1000px uzakta öksüz kalmıyor (ölçüldü: içerikle arası 45px).

4. **Kartlar hep 3 sütundaydı** — `lg:grid-cols-3` 1024px'ten 4K'ya kadar değişmiyordu, kartlar 561px'e kadar şişiyordu. Portfolio, Certificates ve Videos ızgaralarına `min-[1900px]:grid-cols-4` eklendi. Ayrıca `--container-max` 2400/3000/3600px kırılımlarında 105/112/118rem'e çıkarıldı.

Son ölçüm (3840px): içerik **2128px** (ekranın %55'i, önce %34), kartlar **4 sütunda 511px**.

**Regresyon testi:** `tests/e2e/wide.spec.js` — kolon büyümesi, simetrik boşluk (1920/2560/3840), kök yazı tipi ölçeklenmesi, rail konumu, 4. sütunun 2560px'te açılıp 1536px'te açılmaması, 5 genişlikte yatay taşma. Mobil projede atlanıyor. Dar ekranlarda (360–1280px) taşma olmadığı ayrıca doğrulandı.

### Dev server hook — ✅ KURULDU
`.claude/settings.json` → `SessionStart` hook. Claude Code bu projede açıldığında dev server kendiliğinden **arka planda** kalkar (`async: true`, oturumu bloklamaz).

```
curl -s -o /dev/null --max-time 3 http://localhost:5173/ || { cd "${CLAUDE_PROJECT_DIR:-.}" && mkdir -p .claude && nohup npm run dev -- --port 5173 --strictPort >> .claude/dev-server.log 2>&1 & }
```

- Adres her zaman **http://localhost:5173/** (`--strictPort` ile sabit).
- Zaten çalışıyorsa ikinci süreç açmaz; `--strictPort` ikinci bir koruma katmanı.
- **Önemli ayrıntı:** vite bu makinede `::1` (IPv6) üzerine bağlanıyor, `127.0.0.1` cevap vermiyor. Kontrol bu yüzden `localhost` ile yapılıyor — `127.0.0.1` kullanılırsa hook her seferinde yeniden başlatmaya çalışır. (Playwright config'i de bu yüzden `--host 127.0.0.1` ile açıkça IPv4'e sabitliyor.)
- Log: `.claude/dev-server.log` (`.gitignore`'a eklendi).
- Doğrulandı: kapalıyken başlattı, açıkken hiçbir şey yapmadı (log boş kaldı).

### Deploy düzeltmesi — ✅ A SEÇENEĞİ UYGULANDI
`github-stats.yml` **silindi** (branch ruleset'i yüzünden `git push` reddediliyordu, her gün başarısız olacaktı). Yerine:

- `scripts/fetch-github-stats.mjs` — JSON'u üretir. GraphQL ile takvim (token varsa), REST ile repo/yıldız/dil. **Hiçbir hata deploy'u düşürmez** (her yol try/catch, çıkış kodu 0).
- `deploy.yml` — `Build` adımından önce `Refresh GitHub stats` adımı eklendi, `GH_TOKEN: secrets.GH_STATS_TOKEN || github.token`. Ayrıca günlük `schedule` (03:17 UTC) + `workflow_dispatch` eklendi.
- **Commit yok** → ruleset hiç devreye girmiyor, PR gürültüsü yok, her deploy'da taze veri.
- Script mevcut takvimi **korur**: API bir kez hata verse bile ısı haritası kaybolmaz (yerelde 403 rate limit ile doğrulandı — dosya bozulmadı).
- **PAT gerekmiyor.** `github.token` katkı takvimini okuyabiliyor (run 34132003744 kanıtı). Gerekirse `GH_STATS_TOKEN` secret'ı opsiyonel olarak devreye girer.

### Playwright testleri — ✅ KURULDU VE GEÇTİ
`npx playwright install chromium && npx vite build && npm test` çalıştırıldı: **66 passed, 0 failed** (mobil projede atlanan geniş ekran testleriyle birlikte).
GitHub paneli eklendikten sonra iki test eskimişti (nav ve i18n hâlâ `Projects`/`Projeler` arıyordu) — **testler** yeni `GitHub Projects` / `GitHub Projeleri` etiketine göre düzeltildi, site değiştirilmedi.
İki atlama doğru: masaüstü rail testi mobil projede, mobil menü testi masaüstü projesinde atlanıyor.

- `playwright.config.js` — iki proje: `desktop` (1280×800) ve `mobile` (390×844), ikisi de chromium. `webServer` `vite preview --port 4173 --host 127.0.0.1` (IPv4'e sabitleme şart, yoksa Node `localhost`'u ::1'e çözüyor). **Testler `dist/`'i sunar — src değiştiyse önce `npx vite build`.**
- `tests/e2e/` — `site`, `nav`, `i18n`, `analytics`, `portfolio`, `certificates`, `resume`, `a11y`, `seo` + `helpers.js`
- Doğrulananlar: 8 bölümün hepsi render oluyor, konsol hatası yok, dil değişimi + `localStorage` kalıcılığı + `?lang=tr`, analytics olayları (`window.__btEvents`), 7 proje + filtre + özelliklerin toggle'sız görünürlüğü, 10 sertifika + lightbox + Escape, CV indirme bağlantısı, **hover önizlemesinin kırpılmadığı (≥200px)**, tek h1, tüm görsellerde alt, ikon butonlarda erişilebilir ad, 390px'te yatay taşma yok, og:image 1200×630 gerçekten sunuluyor, JSON-LD ayrışıyor

Komut: `npm test` (veya `npm run test:ui`)

### Senin yapman gerekenler
1. **`main`'e merge** — canlı güncellensin (deploy sadece `main`'de tetiklenir)
2. ~~PAT oluştur~~ — **GEREKMİYOR.** Actions'ın kendi token'ı katkı takvimini okuyabildi (run 34132003744 kanıtı). `GH_STATS_TOKEN` secret'ı eklemene gerek yok.
3. ~~github-stats.yml için seçim yap~~ — **çözüldü**, A seçeneği uygulandı.

---

## Bilinen tuzaklar

1. **Silinen videolar geri geliyordu.** Sebep: değişiklik commit edilmemişken doğrulayıcı ajanlar `git show HEAD` ile karşılaştırıp "veri kaybı" sanıp geri koyuyordu. Kullanıcı commit'ledikten sonra çözüldü. **Ders: silme işlemlerini ajan çalıştırmadan önce commit et.**
2. **Paralel ajan çakışması:** bir ajan `Header.jsx`'e `import LanguageToggle` yazdı, dosyayı yazan diğer ajan henüz bitirmemişti → geçici Vite hatası. Dev server açıkken workflow çalıştırmak sayfada kırılmalara yol açar.
3. **GitHub REST limiti:** tokensiz 60 istek/saat/IP. Proje kartlarındaki yıldız verisi bu yüzden sessizce boş kalabilir — bu beklenen davranış, hata gösterilmemeli.
4. **Ekrandaki "Opened 13 pull requests" listesi çekilemez** — `eykaya/rapidhcm*` özel org repoları. Public events API'si sadece 1 olay döndürüyor. PAT ile alınabilir ama **müşteri repo adları public sitede görünür**; bu yüzden JSON'a yalnızca tarih + sayı yazılıyor, repo/org adı asla yazılmıyor.
5. **Achievements rozetleri hiçbir API'de yok** — kullanıcı eklenmemesine karar verdi.

## Paket güncellemeleri (uygulanmadı)

Git geçmişinde bir geri alma var (`package json to back`), bu yüzden dokunulmadı.

| Paket | Mevcut | Son | Not |
|---|---|---|---|
| autoprefixer, postcss, yet-another-react-lightbox, @types/react | eski | yama var | risksiz |
| react / react-dom | 18.3.1 | 19.2.8 | major, kırıcı |
| tailwindcss | 3.4.19 | 4.3.3 | major, kırıcı |
| vite | 5.4.21 | 6.4.3 | major, kırıcı |
| typed.js | 2.1.0 | 3.0.0 | major, kırıcı |

## Kullanıcı tercihleri

- Türkçe iletişim
- Ana işlevler bozulmayacak (Isotope yerine grid gibi bilinçli değişiklikler hariç — bunlar onaylandı)
- Backend yok, GitHub Pages'te public ve statik kalacak
- Arka planda kendi fotoğrafı görünsün, saydam olsun
- Sertifika ve proje kartlarında hover efekti olsun
- Dil düğmesi diğer nav item'lar gibi davransın

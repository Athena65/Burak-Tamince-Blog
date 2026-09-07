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

### GitHub bölümü — DURDURULDU, siteye eklenmedi (kullanıcı kararı)
Dosyalar diskte hazır duruyor, sadece **bağlantısı kesildi**. Devam edilecek yer burası.

Mevcut dosyalar:
| Dosya | Durum |
|---|---|
| `public/data/github-stats.json` | ✅ **Gerçek veriyle dolu**: 366 gün katkı takvimi, 159 katkı, 33 aktif gün, 33 repo, 39 yıldız, 8 dil |
| `src/components/GitHubStats.jsx` | ✅ Yeni **panel** sürümü (ayrı bölüm değil). Katkı ısı haritası (SVG, 53 hafta × 7 gün), 4 rakam, oransal dil çubuğu + lejant, profil bağlantısı. Henüz hiçbir yerden import edilmiyor |
| `src/components/GitHubActivity.jsx` | ⚠️ Eski **bölüm** sürümü (491 satır). Kullanılmıyor; `GitHubStats.jsx` bunun yerini alacak, silinebilir |
| `.github/workflows/github-stats.yml` | ⚠️ Ajan oturum limitine takıldığı için **doğrulanmadı**. Çalıştırmadan önce YAML ve node script'i gözden geçir |

Bağlantısı kesilen yerler (geri açmak için):
- `src/App.jsx` — `GitHubActivity` import'u ve `<GitHubActivity />` satırı **silindi**
- `src/components/Header.jsx` — `{ id: 'github', … }` nav öğesi **silindi**

**Kullanıcının istediği son tasarım kararı (henüz uygulanmadı):**
- Ayrı "GitHub" başlığı/bölümü **olmayacak** — nav item ve ana alan şişiyor
- Projects bölümünün başlığı **"GitHub Projects" / "GitHub Projeleri"** olacak
- İstatistik paneli o bölümün **en üstünde** yer alacak
- Görsel olarak daha zengin olmalı; ilk hâli fazla sadeydi (ısı haritası `days: []` olduğu için hiç çizilmiyordu — bu artık düzeldi)

Yapılacaklar:
1. `Portfolio.jsx` içine `import GitHubStats from './GitHubStats'` ekle, `SectionHeader`'dan hemen sonra render et
2. `Portfolio.jsx`'te `SectionHeader` başlığını `t({ en: 'GitHub Projects', tr: 'GitHub Projeleri' })` yap
3. `Header.jsx`'te `portfolio` nav etiketini `{ en: 'GitHub Projects', tr: 'GitHub Projeleri' }` yap
4. `GitHubActivity.jsx`'i sil
5. `github-stats.yml`'i gözden geçir, sonra PAT adımlarını uygula

### Playwright testleri — KURULDU, ÇALIŞTIRILMADI
Ajan oturum limitine takılmadan önce kurulumu ve test dosyalarını yazmayı bitirmiş; **testler hiç çalıştırılmadı, sonuçları bilinmiyor.**

Mevcut:
- `playwright.config.js` (proje kökünde)
- `tests/e2e/` — `site`, `nav`, `i18n`, `analytics`, `portfolio`, `certificates`, `resume`, `a11y`, `seo` spec'leri + `helpers.js`
- `package.json` → `"test": "playwright test"`, `"test:ui": "playwright test --ui"`, devDependency `@playwright/test ^1.63.0`
- `.gitignore` → `test-results`, `playwright-report`, `.playwright` eklendi
- `node_modules/@playwright/test` kurulu

Yapılacak ilk iş:
```bash
npx playwright install chromium   # tarayıcı binary'si kurulu olmayabilir
npm test
```
Sonra her hatayı tek tek değerlendir: **test mi yanlış, site mi?** Testi zayıflatarak geçirme. Not: `portfolio.spec.js` Isotope'lu eski yapıya göre yazılmış olabilir (grid'e geçiş sonradan yapıldı) ve `analytics.spec.js` `window.__btEvents` üzerinden doğruluyor.

### Senin yapman gerekenler
1. **`main`'e merge** — canlı güncellensin (deploy sadece `main`'de tetiklenir)
2. **PAT** (GitHub bölümüne devam edince): workflow önce Actions'ın kendi `GITHUB_TOKEN`'ını dener. Katkı takvimi boş gelirse:
   - GitHub → Settings → Developer settings → Personal access tokens → **Tokens (classic)**
   - **Sadece `read:user`** scope'u, 90 gün (fine-grained token'lar `contributionsCollection`'ı güvenilir desteklemiyor)
   - Repo → Settings → Secrets and variables → Actions → New repository secret → ad: **`GH_STATS_TOKEN`**
   - Repo → Settings → Actions → General → Workflow permissions → **Read and write**

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

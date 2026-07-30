# Design System — Portofolio M. Rifqi Nauval Nibroos

Acuan desain untuk proyek ini. Tujuannya supaya setiap perubahan tampilan (oleh siapa pun) tetap konsisten dengan arah yang sudah disepakati: **dark space theme, glassmorphism, clean & minim clutter**.

## 1. Arah Desain

- Tema: gelap (space/angkasa), bukan terang.
- Gaya kartu: glassmorphism (blur + border tipis + transparansi), bukan flat/solid.
- Prinsip utama: **clean** — hindari terlalu banyak efek/warna/gerakan sekaligus dalam satu layar. Kalau ragu, kurangi, jangan tambah.
- Jangan perkenalkan warna, radius, atau spacing baru di luar token yang sudah ada di bawah — reuse dulu sebelum bikin baru.

## 2. Warna

Semua warna didefinisikan sebagai CSS variable di `src/index.css` (`:root`). Jangan hardcode hex baru di komponen — selalu pakai variable.

| Token | Nilai | Kapan dipakai |
|---|---|---|
| `--space-void` | `#000000` | Background utama body |
| `--space-navy` | `#0d1127` | Teks di atas tombol putih/terang |
| `--accent-primary` | `#8a64ff` | **Dekoratif saja**: dot indikator, ikon, teks gradient, glow tipis. Bukan untuk fill solid tombol besar. |
| `--gradient-accent` | ungu → biru | Gradient text (nama, angka stat), border-glow saat hover. Bukan untuk background tombol utama. |
| `--text-white` / `--text-light` / `--text-muted` / `--text-dim` | — | Hierarki teks: judul → body → caption → sangat sekunder |
| `--surface-glass` / `--surface-card` | putih transparan tipis | Background kartu glass |
| `--surface-card-border` | putih transparan tipis | Border kartu, jadi lebih terang saat hover (`--surface-card-border-hover`) |

### Aturan tombol (CTA)
- **Primary CTA** (contoh: "Recent Projects", "Hubungi Saya", nav pill aktif): background **putih solid** (`#ffffff`), teks `var(--space-navy)`. *Bukan* gradient ungu — ini keputusan eksplisit dari pemilik proyek, jangan dikembalikan ke ungu tanpa diminta.
- **Secondary CTA**: glass (`--surface-glass` + border tipis), teks terang, tanpa fill solid.
- Ungu/`--accent-primary` tetap dipakai untuk aksen kecil (dot, ikon, gradient text, glow hover) — bukan dihapus total dari palet, hanya dijauhkan dari fill tombol besar.

## 3. Tipografi

- Font: `Montserrat` (heading & body sama, dibedakan lewat weight).
- Skala judul section: `clamp(2.2rem, 5vw, 3.2rem)`, weight 800.
- Body/paragraf: `1.05rem`, line-height 1.8 — cukup lega, jangan dipadatkan.
- Caption/label (mis. "ABOUT ME", tag): uppercase, letter-spacing 1.5px, ukuran kecil (~0.8rem).

## 4. Spacing & Radius

- Section padding: `120px 0` desktop, `80px 0` mobile — jangan section-to-section langsung tempel.
- Radius: `12px` (chip kecil) → `18px` → `24px` (kartu) → `32px` (kartu besar/hero elemen) → full pill untuk badge/tombol.
- Gap antar kartu grid: `20–24px`. Konsisten di seluruh section (about card, bento grid, project card).

## 5. Glassmorphism — cara pakai yang benar

Supaya efek glass terlihat "clean" bukan berantakan:

1. Selalu pasang **3 elemen sekaligus**: `background` transparan tipis + `border: 1px solid` transparan tipis + `backdrop-filter: blur(12–24px)`. Kalau cuma pasang salah satu, efeknya kelihatan setengah jadi.
2. Blur besar (24px) untuk elemen mengambang di atas konten lain (navbar pill). Blur sedang (12–16px) untuk kartu di dalam alur halaman.
3. Border harus tetap terlihat tipis di semua kondisi background gelap — jangan andalkan bayangan (shadow) saja untuk memisahkan kartu dari background.
4. Hover state: naikkan opacity border + sedikit `translateY(-2px_ke_-8px)` + shadow lebih besar. Jangan ubah warna background kartu drastis saat hover.

## 6. Gambar & Logo (khusus Project Cards)

- Logo project dengan background putih/transparan dan logo dengan background gelap **harus dibingkai panel netral yang sama** (lihat `.project-card__image-container`), pakai `object-fit: contain` + padding — jangan `cover` mentah, karena itu bikin logo saling bentrok kontras satu sama lain di grid yang sama.

## 7. Motion / Animasi

- Animasi scroll-reveal (`fade-in`, `fade-in-left`, dst) sudah dipakai di hampir semua section — **jangan tambah jenis animasi baru** tanpa alasan kuat, karena makin banyak jenis gerakan berbeda dalam satu scroll, makin ramai/tidak "clean".
  - **Pengecualian yang sudah disetujui:** marquee di bawah hero (lihat §A.4c). Diminta langsung oleh pemilik proyek. Jangan dihapus dengan alasan aturan ini.
- Durasi transisi standar sudah ada: `--transition-smooth` (0.4s) dan `--transition-bounce` (0.5s, untuk elemen interaktif seperti tombol). Pakai salah satu dari ini, jangan bikin timing custom baru per komponen.

## 8. Checklist sebelum menambah komponen baru

- [ ] Warna diambil dari variable yang sudah ada, bukan hex baru?
- [ ] Radius & spacing mengikuti skala di atas?
- [ ] Kalau berupa kartu: sudah punya background + border + blur (3 elemen glass)?
- [ ] Kalau berupa tombol utama: putih solid, bukan gradient ungu?
- [ ] Tidak menambah jenis animasi/efek baru yang belum ada di section lain?
- [ ] Sudah dicek di browser (bukan cuma dibaca kodenya) sebelum dianggap selesai?

---

# Lampiran A — Analisis Referensi: aziziem.xyz

Analisis dilakukan dengan membaca HTML SSR dan dua CSS bundle produksi situs tersebut
(`_next/static/chunks/88ef45449bc91df9.css` = font, `57fa1e32010e3391.css` = Tailwind v4 + CSS kustom).
Ini **bukan** target visual kita — situs itu light theme, kita dark space theme. Yang diambil hanya
**struktur layout & pola interaksi**, bukan warna/font-nya.

## A.1 Stack & fondasi situs referensi

| Aspek | Temuan |
|---|---|
| Framework | Next.js (App Router, RSC streaming — terlihat dari `self.__next_f.push`) |
| CSS | Tailwind v4 (token `--color-*`, `--text-*`, `--spacing`) + layer CSS kustom manual |
| Font | `Geist` (body) & `Geist Mono`, di-host sendiri via `next/font`, weight variable `100 900` |
| Komponen | shadcn/ui — terlihat dari token `--popover`, `--sidebar-*`, `--ring`, `@keyframes accordion-up/down`, `caret-blink` |

### Palet aslinya (light, minimalis 6 token)

```css
:root {
  --bg:            #fff;
  --text-primary:  #1a1a1a;
  --text-secondary:#666;
  --border:        #eee;
  --accent:        #000;     /* hitam solid — dipakai untuk tombol utama */
  --gray-light:    #f9f9f9;  /* panel form */
}
```

**Pelajaran yang relevan buat kita:** seluruh situs itu cuma pakai **6 token warna** dan satu aksen
solid non-warna (hitam). Itu alasan tampilannya terasa bersih. Prinsip yang sama sudah kita pegang di
§2 — aksen kita adalah **putih solid** (kebalikannya, karena background kita gelap). Jadi peta
padanannya:

| Referensi | Padanan di proyek kita |
|---|---|
| `--accent: #000` (tombol) | `#ffffff` + teks `var(--space-navy)` |
| `--gray-light: #f9f9f9` (panel form) | `var(--surface-card)` + border + blur |
| `--border: #eee` | `var(--surface-card-border)` |
| `--text-secondary: #666` | `var(--text-muted)` |
| Font `Geist` | tetap `Montserrat` — **jangan** ganti font |

## A.2 Animasi & efek yang dipakai referensi

```css
/* Scroll reveal — satu-satunya efek reveal di seluruh situs */
.animate-on-scroll             { opacity:0; filter:blur(10px); transform:translateY(30px);
                                 transition:all 1.2s cubic-bezier(.16,1,.3,1); }
.animate-on-scroll.animate-in  { opacity:1; filter:blur(0);   transform:translateY(0); }

@keyframes letter-blur-in { from{opacity:0;filter:blur(8px);transform:translateY(10px)} to{...} }
@keyframes scaleUp        { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
@keyframes scroll         { from{transform:translateX(0)} to{transform:translateX(-50%)} }  /* marquee */
@keyframes blink          { 0%,50%{opacity:1} 51%,100%{opacity:0} }                          /* caret */
```

Catatan penting: **situs itu hanya punya satu pola reveal** (`.animate-on-scroll`) yang dipakai di
semua section. Ini persis aturan §7 kita ("jangan tambah jenis animasi baru"). Kita **tidak** mengadopsi
`letter-blur-in`, marquee, atau `scaleUp` — kita sudah punya `fade-in` / `fade-in-left` / `ScrollReveal`
yang perannya sama. Menambahkan yang baru justru melanggar arah "clean" kita.

Pola hover yang konsisten dan **layak ditiru**:
- Kartu: `translateY(-4px)` + `box-shadow: 0 20px 40px rgba(0,0,0,.08)` + border menguat.
- Tombol: `translateY(-2px)` + shadow membesar. (Kita sudah pakai ini di `.about__cta-link`.)
- Panah di dalam tombol: `svg { transition: transform .3s }` → `:hover svg { translateX(3px) }`.
- Gambar project: `filter: grayscale(1)` → `grayscale(0) scale(1.05)` saat hover.

## A.3 Layout Contact — **ini yang kita adopsi**

Struktur aslinya (disederhanakan dari HTML SSR):

```
section.contact-section
└─ .contact-wrapper                       grid 1fr 1.2fr, gap 80px, align-items:start
   ├─ .contact-info                       position:sticky; top:120px
   │  ├─ h2.section-title
   │  ├─ p.contact-desc
   │  └─ .contact-details                 flex-column, gap 20px
   │     └─ .contact-item ×2              [svg 20px] + teks  (email, lokasi)
   └─ form.contact-form                   panel: bg gray-light + border + padding 48px
      ├─ .form-row                        grid 1fr 1fr, gap 20px  → Name | Email
      ├─ honeypot (display:none)          anti-spam: field "Leave this field blank"
      ├─ .form-field                      Subject
      ├─ .form-field                      Message (textarea rows=5, min-height 120px)
      └─ button.btn-submit                width:100%, bg accent, padding 16px 32px
```

CSS kuncinya:

```css
.contact-wrapper { display:grid; grid-template-columns:1fr 1.2fr; gap:80px; align-items:start; }
.contact-info    { position:sticky; top:120px; }
.contact-desc    { font-size:16px; line-height:1.7; margin:20px 0 40px; }
.contact-item    { display:flex; align-items:center; gap:12px; font-size:15px; }
.contact-form    { background:var(--gray-light); border:1px solid var(--border); padding:48px; }
.form-row        { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
.form-field      { margin-bottom:24px; }
.form-field label{ display:block; margin-bottom:8px; font-size:14px; font-weight:600; }
.form-field input, .form-field textarea {
                   width:100%; padding:14px 16px; font-size:15px; font-family:inherit;
                   border:1px solid var(--border); transition:border-color .3s; }
.form-field :focus{ border-color:var(--accent); }
.btn-submit      { width:100%; padding:16px 32px; font-size:15px; font-weight:600;
                   transition:opacity .3s; }
```

### Adaptasi ke tema kita (yang benar-benar diterapkan)

| Elemen referensi | Diadopsi? | Bentuk di proyek kita |
|---|---|---|
| Grid 2 kolom info \| form | ✅ | `.contact__grid`, `1fr 1.15fr`, gap `56px` |
| `contact-info` sticky | ✅ | `position:sticky; top:120px` (desktop saja) |
| Baris Name + Email berdampingan | ✅ | `.contact-form__row` grid `1fr 1fr` |
| Honeypot anti-spam | ✅ | field tersembunyi, dibuang sebelum submit |
| Panel form flat + border tipis | ⚠️ diubah | wajib **glass**: `--surface-card` + border + `blur(16px)` (§5) |
| Input `background:#fff` | ⚠️ diubah | **field wajib sewarna navbar** — keputusan eksplisit pemilik proyek. Pakai `--surface-field`, jangan `--surface-panel` langsung (lihat jebakan di bawah). Border `--surface-panel-border`, shadow `0 4px 30px rgba(0,0,0,.3)` — dua-duanya sama dengan `.navbar__pill`. Focus: `--surface-field-focus` + `--surface-card-border-hover`. |
| Padding form `48px` | ⚠️ diubah | `40px` — menyesuaikan `--container-max: 1100px` kita yang lebih sempit |
| Sudut siku (radius 0) | ❌ ditolak | pakai skala §4: `--radius-lg` panel, `--radius-sm` input |
| Tombol hitam solid | ⚠️ dibalik | **putih solid** + teks `--space-navy` (§2, aturan wajib) |
| Hover tombol `opacity:.9` | ❌ ditolak | pakai pola kita: `translateY(-2px)` + shadow membesar |
| Font `Geist` | ❌ ditolak | tetap `Montserrat` |
| Heading "Let's Work Together" statis | ❌ ditolak | pertahankan `<RotatingText>` Work↔Build yang sudah ada |

### Jebakan: kenapa `--surface-panel` tidak cukup untuk field

Ini pernah salah sekali, jadi dicatat. Awalnya field diberi `background: var(--surface-panel)`
(putih 6%, persis deklarasi `.navbar__pill`) tapi hasilnya **tetap tidak sewarna navbar** — kelihatan
kebiruan. Penyebabnya bukan nilai alpha-nya, tapi **apa yang ada di belakangnya**:

- `.navbar__pill` → putih 6% menumpuk di atas `--space-void` (hitam) ⇒ hasilnya **abu netral**.
- field form → putih 6% menumpuk di atas `.contact-form` yang `--surface-card: rgba(15,15,30,.6)`
  ⇒ hasilnya **abu bernuansa navy**.

Solusinya: `--surface-field` memaksa komposit ulang di atas void, bukan di atas kartu:

```css
--surface-field: linear-gradient(rgba(255,255,255,.06), rgba(255,255,255,.06)), var(--space-void);
```

Karena `--surface-field` sudah opaque, `backdrop-filter` pada field **tidak perlu** (tidak ada efeknya).
Kalau nanti mau field lebih terang, naikkan dua angka `.06` itu — jangan tambahkan warna baru.
Override `:-webkit-autofill` juga harus pakai netral (`#0f0f0f`), bukan `--space-indigo`, kalau tidak
field yang di-autofill akan balik kebiruan.

## A.4 Layout Footer — **ini yang kita adopsi**

```
footer > .container
├─ .footer-grid            flex; justify-content:space-between; align-items:flex-start;
│  │                       margin-bottom:60px
│  ├─ .logo                nama, kiri
│  └─ .footer-content      kanan: nav di atas, ikon sosial di bawahnya
│     ├─ .footer-nav       flex, gap 30px, font-size 14px
│     └─ .social-icons     flex, gap 20px; svg 18px; fill secondary → primary saat hover
├─ .copyright
└─ .credit                 "Designed using Next.js"
```

Inti polanya: **brand di kiri, semua navigasi + sosial rata kanan, baris legal di bawah sendiri.**
Ikon sosialnya kecil (18px) dan tanpa lingkaran.

### Adaptasi ke tema kita

- Struktur `space-between` (brand kiri / nav + sosial kanan) **diadopsi**.
- **Baris nav di footer wajib ada.** Sempat saya hilangkan dengan alasan "duplikat navbar" — itu keliru,
  pemilik proyek memang mau layout gambar referensi apa adanya: `.footer__nav` di kanan atas, lalu
  `.footer__socials` **di bawahnya** (bukan sebaris dengan brand). Itu sebabnya `.footer__top` pakai
  `align-items: flex-start` dan ada wrapper `.footer__content` yang `flex-direction: column;
  align-items: flex-end`. Isinya About / Experience / Projects / Contact → id `tentang`, `pengalaman`,
  `proyek`, `kontak`.
- Baris copyright + kredit terpisah di bawah **diadopsi**, ditumpuk rata kiri (`flex-direction: column`),
  bukan `space-between`.
- Ikon sosial tetap **berlingkaran glass** (bukan svg telanjang seperti referensi) supaya nyambung
  dengan bahasa visual kartu kita — tapi diperkecil jadi **40px** (dari 140px versi lama di section
  Contact).
- **Animasi hover-nya wajib pakai pola `.contact__link` versi lama**, bukan hover polos: pseudo-element
  `::before` berisi lingkaran warna brand (`#0077b5` LinkedIn, `#24292e` GitHub) yang naik dari bawah
  (`bottom:-150%`, `scale(0) → scale(1)`, `transform .6s cubic-bezier(.19,1,.22,1)`), ikon berubah jadi
  putih, plus `translateY(-3px)`. Ini permintaan eksplisit pemilik proyek — animasinya "yang sebelumnya",
  hanya skalanya yang diperkecil. Label teks dan `translateY(-20px)` pada ikon **dibuang** karena tidak
  muat di lingkaran 40px.
- `FireworksBackground` yang sudah ada **dipertahankan** — itu identitas footer kita.

## A.4b Project Card — kartunya yang kotak, bukan gambarnya

**Catatan revisi:** awalnya ini saya terapkan salah sasaran — yang saya buat "kotak" adalah panel
gambarnya (`aspect-ratio: 4/3`). Yang dimaksud pemilik proyek adalah **kartunya** (`.project-card`,
si box panjang), mengikuti kartu "Featured Work" referensi yang bersudut siku.

| Aspek | Nilai | Alasan |
|---|---|---|
| `border-radius` kartu | **`0`** | Ini yang bikin kartunya "kotak". **Pengecualian resmi terhadap skala radius §4** — diminta langsung pemilik proyek, jangan dikembalikan ke `--radius-lg`. |
| `border-radius` tag | tetap `--radius-full` | pil di dalam kartu siku itu justru pola referensi juga (`.project-list-tag` radius 20px) — bukan inkonsistensi |
| tinggi panel gambar | `height: 200px` | tetap seperti semula. `aspect-ratio` sempat dicoba tapi bikin kartu kepanjangan di kolom sempit/mobile. |
| `object-fit` | `contain` + `padding: 22px` | **wajib** — isi kartu kita *logo*, bukan foto mockup seperti referensi. `cover` (yang dipakai kode lama, menyimpang dari dokumen) memotong logonya. Ini menegakkan §6. |
| hover gambar | `scale(1.06)` | diturunkan dari `1.1` karena `contain` + padding bikin `1.1` menabrak tepi panel |

Yang **tidak** diambil dari kartu referensi: `filter: grayscale(1)` → warna saat hover. Efek itu bagus
untuk foto, tapi logo brand yang di-grayscale jadi tidak terbaca. Kalau nanti isi kartu diganti jadi
screenshot/mockup (bukan logo), grayscale ini baru layak dipertimbangkan — sekalian dengan `cover`.

## A.4c Marquee — pita miring di bawah hero

**Catatan revisi:** di draf pertama dokumen ini marquee saya tolak dengan alasan "terlalu ramai".
Pemilik proyek meminta elemen ini **secara eksplisit**, jadi statusnya sekarang **diadopsi**. Jangan
hapus dengan alasan §7 ("jangan tambah animasi baru") — ini pengecualian yang disetujui pemilik, dan
satu-satunya animasi baru yang boleh masuk tanpa diskusi ulang.

Penempatan: langsung **setelah `<Hero />`, sebelum `<About />`** di `src/App.jsx` — sama seperti posisi
di referensi (setelah hero, sebelum "Featured Work"). Bukan di dalam `.hero`, karena `.hero__container`
itu grid 2 kolom dan pita full-bleed akan merusaknya.

| Aspek | Referensi | Punya kita | Alasan |
|---|---|---|---|
| Background | `--accent: #000` | `#ffffff` | **dibalik** — halaman kita gelap; putih solid juga aturan "primary" §2 |
| Warna teks | `#fff` | `var(--space-navy)` | pasangan wajib dari fill putih (§2) |
| Rotasi | `rotate(-2deg)` | sama | ini inti karakternya |
| Lebar | `100%` | `104vw` + `margin-left:-2vw` | menutup celah segitiga di ujung kiri/kanan akibat rotasi; aman karena `body { overflow-x: hidden }` |
| Animasi | `scroll 30s linear infinite` → `translateX(-50%)` | `marquee-scroll`, durasi sama | — |
| Pause saat hover | `animation-play-state: paused` | sama | — |
| Teks | "Design & Development" dll | **teks sendiri**: `Available for New Projects`, `UI/UX & Frontend Developer`, `To Infinity and Beyond` | jangan copy kalimat orang; item ke-3 ambil tagline hero kita sendiri |

Dua hal teknis yang gampang dirusak kalau komponennya diedit:

1. **Kenapa item dirender 4× total.** Loop `translateX(-50%)` hanya mulus kalau isi container terdiri
   dari dua bagian identik. Dan satu bagian harus lebih lebar dari layar terlebar (≈1920px), padahal 3
   item cuma ≈1050px. Jadi: `half = items × 2`, lalu `half` dirender 2×. Kalau jumlah/panjang item
   diubah, cek lagi bahwa satu `half` masih > 1920px, kalau tidak akan ada jeda kosong.
2. `aria-hidden="true"` di wrapper — teksnya dekoratif dan berulang, kalau dibaca screen reader jadi
   spam. Jangan dilepas.

Ada juga `@media (prefers-reduced-motion: reduce) { .marquee__content { animation: none } }` — pita
tetap tampil, cuma berhenti bergerak.

## A.5 Yang sengaja TIDAK diambil

Supaya tidak ada yang iseng menambahkannya lagi nanti:

- **Bento grid** dengan `grid-area: span 2 / span 8` — grid project kita sudah settle.
- **Aksen biru `#2563eb`** yang muncul di halaman `/work` dan `/showcase` referensi — palet kita
  monokrom, jangan masukkan hue baru.
- **Newsletter / Subscribe section** — di luar scope portofolio ini.
- **Toggle bahasa ID/EN** — konten kita satu bahasa (English).
- **Font Geist & radius `.625rem`** — sudah punya sendiri.

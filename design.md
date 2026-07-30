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
| Padding form `48px` | ⚠️ diubah | `40px` — menyesuaikan `--container-max: 1100px` kita yang lebih sempit |
| Sudut siku (radius 0) | ❌ ditolak | pakai skala §4: `--radius-lg` panel, `--radius-sm` input |
| Tombol hitam solid | ⚠️ dibalik | **putih solid** + teks `--space-navy` (§2, aturan wajib) |
| Hover tombol `opacity:.9` | ❌ ditolak | pakai pola kita: `translateY(-2px)` + shadow membesar |
| Font `Geist` | ❌ ditolak | tetap `Montserrat` |
| Heading "Let's Work Together" statis | ❌ ditolak | pertahankan `<RotatingText>` Work↔Build yang sudah ada |
| Marquee miring `rotate(-2deg)` | ❌ ditolak | terlalu ramai, melanggar prinsip "clean" |

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
- Baris copyright + kredit terpisah di bawah **diadopsi**.
- Ikon sosial tetap **berlingkaran glass** (bukan svg telanjang seperti referensi) supaya nyambung
  dengan bahasa visual kartu kita — tapi diperkecil jadi **38px** (dari 140px versi lama di section
  Contact), dengan ikon 15px. Hover: border menguat + `translateY(-2px)`, tanpa warna brand.
- `FireworksBackground` yang sudah ada **dipertahankan** — itu identitas footer kita.

## A.5 Yang sengaja TIDAK diambil

Supaya tidak ada yang iseng menambahkannya lagi nanti:

- **Marquee bar miring** (`rotate(-2deg)`, `animation: scroll 30s linear infinite`) — terlalu ramai.
- **Bento grid** dengan `grid-area: span 2 / span 8` — grid project kita sudah settle.
- **Aksen biru `#2563eb`** yang muncul di halaman `/work` dan `/showcase` referensi — palet kita
  monokrom, jangan masukkan hue baru.
- **Newsletter / Subscribe section** — di luar scope portofolio ini.
- **Toggle bahasa ID/EN** — konten kita satu bahasa (English).
- **Font Geist & radius `.625rem`** — sudah punya sendiri.

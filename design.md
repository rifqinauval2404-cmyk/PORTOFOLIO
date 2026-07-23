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

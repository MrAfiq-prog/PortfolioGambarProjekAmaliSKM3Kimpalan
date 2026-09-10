# Portfolio Gambar Projek Amali SKM3 Kimpalan

Next.js + Turso + Backblaze B2 untuk pelajar KAMS upload gambar projek amali kimpalan dan admin generate laporan PDF A4.

## Fungsi
- Daftar/log masuk pelajar tanpa verified email
- Admin login melalui ADMIN_EMAIL dan ADMIN_PASSWORD
- 15 projek, maksimum 4 gambar setiap projek
- Compress gambar di browser sebelum upload menggunakan browser-image-compression
- Simpan gambar di Backblaze B2 dan metadata di Turso
- Dashboard pelajar dengan tab Upload Projek dan Status Hantar
- Panel admin dengan senarai pelajar dan auto generate laporan PDF A4

## Setup Turso
Buka Turso SQL editor dan paste semua kandungan `schema.sql`.

## Environment Variables
Copy `.env.example` kepada `.env.local` untuk local. Di Cloudflare Pages, masukkan sebagai Variables/Secrets:

TURSO_DATABASE_URL
TURSO_AUTH_TOKEN
B2_ENDPOINT
B2_REGION
B2_BUCKET_NAME
B2_APPLICATION_KEY_ID
B2_APPLICATION_KEY
JWT_SECRET
ADMIN_EMAIL
ADMIN_PASSWORD

Jangan letak NEXT_PUBLIC_ untuk secret di atas.

## Local run
```bash
npm install
npm run dev
```

## Deploy Cloudflare Pages
Cadangan: guna Cloudflare Pages + OpenNext. Sambung repo GitHub ke Cloudflare Pages, masukkan environment variables, kemudian build.

Build command biasa:
```bash
npm run build
```

Jika mahu guna OpenNext preview/deploy:
```bash
npm run preview
```

Nota: Next.js API routes perlukan runtime server. Untuk Cloudflare Pages, guna integrasi OpenNext/Cloudflare.

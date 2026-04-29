# Panduan Konfigurasi dan Instalasi

## Environment Variables
Buat file .env di direktori root dan sesuaikan variabel berikut:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key

# Konfigurasi Database (PostgreSQL)
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
DB_HOST=127.0.0.1
DB_PORT=5432
```

## Persiapan Database
Pastikan PostgreSQL sudah berjalan, kemudian jalankan perintah berikut secara berurutan:

1. Install dependensi:
   ```bash
   npm install
   ```

2. Jalankan migrasi tabel:
   ```bash
   npx sequelize-cli db:migrate
   ```

3. Jalankan seeder (opsional, untuk data awal):
   ```bash
   npx sequelize-cli db:seed:all
   ```

## Menjalankan Aplikasi
Gunakan perintah berikut untuk menjalankan server dalam mode pengembangan:

```bash
npm run dev 
```
Aplikasi akan berjalan di `http://localhost:5000`.

## Struktur Route Utama 

### Halaman Publik
- `/blog` : Landing page & Beranda (Limit 5 post terbaru).
- `/blog/posts` : Semua daftar postingan blog.
- `/blog/posts/:slug` : Detail postingan berdasarkan slug.
- `/blog/categories` : Daftar semua kategori.
- `/blog/posts/category/:slug` : Postingan berdasarkan kategori slug.

### Halaman Admin & Auth
- `/blog/login` : Halaman login admin.
- `/blog/admin` : Dashboard pengelolaan postingan (memerlukan JWT di LocalStorage).

### API Endpoints
- `GET /blog/posts` : Mengambil semua postingan.
- `GET /blog/posts/:slug` : Mengambil detail postingan berdasarkan slug.
- `POST /blog/posts` : Membuat postingan baru (Protected).
- `PUT /blog/posts/:id` : Mengedit postingan (Protected).
- `DELETE /blog/posts/:id` : Menghapus postingan (Protected).
- `GET /blog/categories` : Mengambil semua kategori.
- `GET /blog/media` : Mengambil daftar media.

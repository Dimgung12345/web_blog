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
- `/` : Landing page.
- `/posts` : Semua postingan blog.
- `/posts/:id` : Detail postingan.
- `/posts/category/:categoryId` : Postingan berdasarkan kategori.

### Halaman Admin & Auth
- `/login` : Halaman login admin.
- `/admin` : Dashboard pengelolaan postingan (memerlukan JWT di LocalStorage).

### API Endpoints
- `POST /posts` : Membuat postingan baru (Protected).
- `PUT /posts/:id` : Mengedit postingan (Protected).
- `DELETE /posts/:id` : Menghapus postingan (Protected).
- `GET /categories` : Mengambil semua kategori.
- `GET /media` : Mengambil daftar media.

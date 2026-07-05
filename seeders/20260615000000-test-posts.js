'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" LIMIT 1',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const categories = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Categories"',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const userId = users[0].id;
    const categoryIds = categories.map(c => c.id);

    const posts = [];
    const baseContent = `# Bab 1: Fondasi Ekonomi Digital
Membangun ekosistem bukan sekadar tentang teknologi, tetapi tentang bagaimana nilai diciptakan dan didistribusikan.

## 1.1 Pentingnya Interoperabilitas
Sistem yang tertutup cenderung akan mati. Kita butuh standar yang memungkinkan data mengalir bebas antar platform.

> "API yang baik adalah yang mudah dipahami manusia, bukan hanya mesin. Interoperabilitas adalah kunci masa depan ekonomi digital yang terbuka."

### 1.1.1 Perbandingan Arsitektur
Berikut adalah tabel perbandingan antara sistem tertutup dan terbuka:

| Fitur | Sistem Tertutup | Sistem Terbuka |
|-------|-----------------|----------------|
| Inovasi | Terbatas internal | Kolaboratif global |
| Skalabilitas | Linear | Eksponensial |
| Keamanan | Obscurity | Transparansi & Audit |
| Biaya | Tinggi (Vendor lock-in) | Efisien (Open source) |

## 1.2 Keamanan dan Privasi
Tanpa kepercayaan, pengguna tidak akan berpartisipasi.

# Bab 2: Arsitektur Modern
Bagaimana kita menyusun komponen agar tetap agile?

## 2.1 Microservices vs Monolith
Debat abadi yang sebenarnya tergantung pada skala tim Anda.

### 2.1.1 Kapan Harus Pindah ke Microservices?
- Ketika tim sudah lebih dari 10 orang.
- Ketika deployment menjadi bottleneck.

![Arsitektur Diagram](https://placehold.co/1200x600.png)

## 2.2 Cloud Native Computing
Memanfaatkan infrastruktur yang elastis seperti DigitalOcean App Platform.

# Bab 3: Pengalaman Pengguna (UX)
Teknologi tercanggih pun tidak berguna jika sulit digunakan.

## 3.1 Prinsip Desain Inklusif
Aksesibilitas bukan fitur tambahan, itu adalah keharusan.

### 3.1.1 Hierarki Visual yang Jelas
Gunakan heading secara semantik agar pembaca (dan screen reader) bisa melakukan scanning konten dengan mudah.

1. **Heading 1**: Judul utama.
2. **Heading 2**: Topik besar/Bab.
3. **Heading 3**: Sub-topik/Sub-bab.

## 3.2 Kecepatan Sebagai Fitur
Situs yang lambat adalah situs yang ditinggalkan.
\`\`\`javascript
// Contoh optimasi performa
async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;
    
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(resource, {
        ...options,
        signal: controller.signal  
    });
    clearTimeout(id);
    
    return response;
}
\`\`\`

# Kesimpulan
Membangun ekosistem adalah perjalanan marathon, bukan sprint. Fokuslah pada nilai jangka panjang.`;

    for (let i = 1; i <= 15; i++) {
      const categoryId = categoryIds[i % categoryIds.length];
      const daysAgo = 15 - i;
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - daysAgo);

      posts.push({
        title: `[Test Post ${i}] Panduan Lengkap Membangun Ekosistem Digital yang Berkelanjutan`,
        content: baseContent,
        slug: `test-post-${i}-panduan-ekosistem-digital`,
        UserId: userId,
        CategoryId: categoryId,
        createdAt: createdAt,
        updatedAt: createdAt,
      });
    }

    await queryInterface.bulkInsert('Posts', posts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', {
      slug: {
        [Sequelize.Op.like]: 'test-post-%'
      }
    }, {});
  }
};

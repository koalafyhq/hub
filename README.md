# hub

Ini adalah bagian "platform" dari layanan [Koalafy Dedicated Hosting](https://koalafyhq.com/services/dedicated-hosting) yang bertanggung jawab sebagai "koordinator" dengan Reverse Proxy yang ada. Pelajari selengkapnya [disini](https://github.com/koalafyhq/internal/wiki/edgy).

## Status

Project ini masih dalam tahap pengembangan dan tidak diperuntukkan untuk lingkungan production. Bug, celah keamanan, dan fitur-yang-belum-selesai adalah sesuatu yang pastinya akan ditemui. Untuk status pengembangan, bisa melihat ke [workspacenya Koalafy](https://linear.app/koalafy).

Untuk dokumentasi lengkapnya terkait project ini bisa di cek di [Wiki](https://github.com/koalafyhq/internal/wiki/hub).

## Teknologi

- [Next.js](https://nextjs.org)
- [Chakra UI](https://chakra-ui.com)
- [Prisma](https://www.prisma.io)
- [Postgres](https://www.postgresql.org)
- [Redis](https://redis.io)

## Memulai pengembangan

- Pastikan Postgres dan Redis sudah berjalan
- Clone repositori ini
- Buat berkas `.env` berdasarkan berkas `.env.example` dengan konten berikut:

```
GITHUB_ID=<ask_faultable>
GITHUB_SECRET=<ask_faultable>

DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
NEXTAUTH_URL=http://localhost:3000

AUTH_SECRET=<$(openssl rand -hex 16)_might_help>

JWT_SECRET=<$(openssl rand -hex 16)_might_help>
JWT_SIGNING_PRIVATE_KEY=<$(jose newkey -s 256 -t oct -a HS512)_might_help>

EMAIL_SERVER=<ask_faultable>
EMAIL_FROM=<ask_faultable>
```
- Unduh dependensi dengan `yarn install`
- Jalankan migrasi dengan `yarn migrate` dan pastikan postgres sudah terkonfigurasi dengan benar*
- Eksekusi skrip yang ada di `sql` untuk membuat [VIEW](https://www.postgresql.org/docs/9.2/sql-createview.html) karena Prisma belum mendukung ini secara "native", sebagai catatan*, table bernama `user_stats` harus dihapus terlebih dahulu :)
- Jalankan server di lingkungan pengembangan dengan `yarn dev`

## PIC

- faultable (fariz@koalafyhq.com)

## Keamanan

Jika menemukan masalah terkait keamanan khususnya celah di level aplikasi, bisa kirim surat elektronik ke security@koalafyhq.com

## Lisensi

AGPL 3.0

---

<sup>*Nantinya akan dibuat skrip khusus untuk proses otomasi</sup>

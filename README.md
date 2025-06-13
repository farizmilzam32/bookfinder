# 📚 Travelio Mini Project - Fullstack Book Search App

Aplikasi fullstack sederhana untuk mencari buku via Google Books API dan menyimpan buku favorit ke dalam wishlist yang disimpan di MongoDB. Dibuat sebagai bagian dari mini project untuk Travelio.

---

## Fitur

- Cari buku dari Google Books
- Lihat informasi buku (judul, penulis, gambar, rating bintang)
- Tambahkan ke wishlist
- Simpan wishlist ke database (MongoDB)
- Fullstack: Frontend (Vite + React + Tailwind + TypeScript), Backend (Express + MongoDB)
- Docker Compose untuk menjalankan semua service

---

## Tech Stack

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB (Mongoose)
- **DevOps**: Docker + Docker Compose

---

## Cara Menjalankan (dengan Docker)

### 1. Clone repo ini

### 2. Jalankan semua service

```bash 
docker compose up --build
```

### 3. Akses aplikasi:
Frontend: http://localhost:5173

Backend API: http://localhost:5000/api/wishlist

### Opsional Perintah

```bash
docker compose up          # Menjalankan semua service
docker compose down        # Menghentikan semua container
docker compose up frontend # Jalankan hanya frontend
docker compose up backend  # Jalankan hanya backend
```




# 🇮🇩 SQLite Wilayah Indonesia

Database SQLite berisi **data wilayah administratif Indonesia** yang lengkap:

✅ Provinsi  
✅ Kabupaten/Kota  
✅ Kecamatan  
✅ Desa/Kelurahan  

Data ini berguna untuk aplikasi web, mobile, dan API yang membutuhkan referensi wilayah Indonesia secara hierarki.

---

## 🎯 Fitur

- Data resmi dan lengkap wilayah Indonesia
- Format SQLite yang ringan, cepat, dan portable
- **Open source**, bebas digunakan untuk keperluan komersial & non-komersial
- Mudah diintegrasikan dengan Laravel, CodeIgniter, Node.js, atau framework lain
- Relasi antar tabel memudahkan query data secara bertingkat

---

## 📂 Struktur Database

Database `records.sqlite` berisi tabel:

- `provinces`
- `regencies`
- `districts`
- `villages`

**Relasi antar tabel:**

- `regencies.province_id` → `provinces.id`
- `districts.regency_id` → `regencies.id`
- `villages.district_id` → `districts.id`

---

## 🚀 Cara Pakai

### 1️⃣ Unduh Database

Download file `records.sqlite` dari repository ini, lalu simpan di project Anda.

### 2️⃣ Query SQL Langsung

Contoh query SQL dasar:

```sql
-- Ambil semua provinsi
SELECT * FROM provinces;

-- Ambil kabupaten/kota berdasarkan ID provinsi
SELECT * FROM regencies WHERE province_id = '31';

-- Ambil kecamatan berdasarkan ID kabupaten/kota
SELECT * FROM districts WHERE regency_id = '3171';

-- Ambil desa/kelurahan berdasarkan ID kecamatan
SELECT * FROM villages WHERE district_id = '3171020';

```
##  Endpoint API (Coming Soon): 

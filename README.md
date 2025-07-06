# 🇮🇩 SQLite Wilayah Indonesia

Database SQLite berisi **data wilayah administratif Indonesia** berdasarkan BPS (Badan Pusat Statistik) yang lengkap:

✅ Provinsi  
✅ Kabupaten/Kota  
✅ Kecamatan  
✅ Desa/Kelurahan <br>
✅ Kode Pos

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

## Composer

📦 Instalasi via Composer

Paket ini tersedia di Packagist:

🔗 Packagist - maftuhichsan/sqlite-wilayah-indonesia

Cara Install

Jalankan perintah Composer:

composer require maftuhichsan/sqlite-wilayah-indonesia

Setelah itu, Anda bisa menggunakan file database yang ada di dalam vendor path:

vendor/maftuhichsan/sqlite-wilayah-indonesia/database/records.sqlite


⸻

✨ Contoh Penggunaan di PHP (PDO)

```php

$db = new PDO(__DIR__.'/vendor/maftuhichsan/sqlite-wilayah-indonesia/database/records.sqlite');

// Ambil semua provinsi
$stmt = $db->query("SELECT * FROM provinces");
$provinces = $stmt->fetchAll(PDO::FETCH_ASSOC);

print_r($provinces);

```

⸻

## NPM

📦 Instalasi via NPM

Paket ini tersedia di NPM:

🔗 NPM - sqlite-wilayah-indonesia

Cara Install

Jalankan perintah package manager NPM:

npm install sqlite-wilayah-indonesia

⸻

✨ Contoh Penggunaan di Node.js

```javascript
// Contoh menggunakan sqlite3
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Arahkan ke file SQLite di node_modules
const dbPath = path.join(
  __dirname,
  'node_modules',
  'sqlite-wilayah-indonesia',
  'database',
  'records.sqlite'
);

const db = new sqlite3.Database(dbPath);

// Ambil semua provinsi
db.all("SELECT * FROM provinces", [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log(rows);
});

db.close();
```
⸻

## 🚀 Cara Pakai

### 1️⃣ Unduh Database

Download file `records.sqlite` dari repository ini, lalu simpan di project Anda.

### 2️⃣ Query SQL Langsung

Contoh query SQL dasar:

```sql
-- Ambil semua provinsi
SELECT * FROM provinces;

-- Ambil kabupaten/kota berdasarkan ID provinsi
SELECT * FROM cities WHERE city_province_code = '31';

-- Ambil kecamatan berdasarkan ID kabupaten/kota
SELECT * FROM sub_districts WHERE sub_district_city_code = '3171';

-- Ambil desa/kelurahan berdasarkan ID kecamatan
SELECT * FROM villages WHERE village_sub_district_code = '3171020';

```
## 🌐 Endpoint API (Coming Soon): 

Status API: Sedang dalam pengembangan.

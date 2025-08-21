# 🔄 Wilayah Scraper

Script Node.js untuk mengupdate data wilayah Indonesia dari API resmi.

## 📋 Fitur

- ✅ Update data provinsi dari API Sipedas Pertanian
- ✅ Update data kota/kabupaten dari API Sipedas Pertanian
- ✅ Deteksi otomatis data yang sudah ada
- ✅ Update nama jika berbeda
- ✅ Insert data baru
- ✅ Logging detail untuk tracking perubahan

## 🚀 Cara Penggunaan

### 1. Install Dependencies

```bash
cd scraper
npm install
```

### 2. Jalankan Update Data

**Update Provinsi:**
```bash
npm run provinces
# atau
npm start
# atau
node update-provinces.js
```

**Update Kota/Kabupaten:**
```bash
npm run cities
# atau
node update-cities.js
```

## 📊 Output

Script akan menampilkan:
- Progress pengambilan data dari API
- Detail setiap provinsi yang diproses
- Ringkasan jumlah data yang ditambah/diupdate
- Status berhasil/error

## ⚙️ Konfigurasi

- **Database**: `../records.sqlite` (relative path dari folder scraper)
- **API URL**: `https://sipedas.pertanian.go.id/api/wilayah/list_wilayah?thn=2025&lvl=10&lv2=11`
- **Country Code**: 62 (Indonesia) untuk provinsi baru

## 🔧 Troubleshooting

- Pastikan file `records.sqlite` ada di folder parent
- Pastikan koneksi internet untuk akses API
- Cek permission write untuk database SQLite
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path ke database SQLite
const dbPath = path.join(__dirname, '..', 'records.sqlite');

// URL API untuk cities
const API_URL = 'https://sipedas.pertanian.go.id/api/wilayah/list_wilayah?thn=2025&lvl=10&lv2=12';

async function updateCities() {
    console.log('🚀 Memulai update data kota/kabupaten...');
    
    try {
        // Fetch data dari API
        console.log('📡 Mengambil data dari API...');
        const response = await axios.get(API_URL);
        const apiData = response.data;
        
        console.log(`✅ Berhasil mengambil ${Object.keys(apiData).length} kota/kabupaten dari API`);
        
        // Buka koneksi database
        const db = new sqlite3.Database(dbPath);
        
        console.log('💾 Membuka koneksi database...');
        
        // Proses setiap kota/kabupaten
        let updatedCount = 0;
        let insertedCount = 0;
        let skippedCount = 0;
        
        for (const [cityCode, cityName] of Object.entries(apiData)) {
            await new Promise((resolve, reject) => {
                // Ambil province_code dari city_code (2 digit pertama)
                const provinceCode = parseInt(cityCode.substring(0, 2));
                
                // Cek apakah city sudah ada
                db.get(
                    'SELECT city_code, city_name, city_province_code FROM cities WHERE city_code = ?',
                    [parseInt(cityCode)],
                    (err, row) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        
                        if (row) {
                            // City sudah ada, cek apakah nama berbeda
                            if (row.city_name !== cityName) {
                                // Update nama city
                                db.run(
                                    'UPDATE cities SET city_name = ? WHERE city_code = ?',
                                    [cityName, parseInt(cityCode)],
                                    function(updateErr) {
                                        if (updateErr) {
                                            reject(updateErr);
                                            return;
                                        }
                                        console.log(`🔄 Updated: ${cityCode} - ${row.city_name} → ${cityName}`);
                                        updatedCount++;
                                        resolve();
                                    }
                                );
                            } else {
                                console.log(`✓ Sudah ada dan sama: ${cityCode} - ${cityName}`);
                                skippedCount++;
                                resolve();
                            }
                        } else {
                            // City belum ada, insert data baru
                            db.run(
                                'INSERT INTO cities (city_code, city_name, city_province_code) VALUES (?, ?, ?)',
                                [parseInt(cityCode), cityName, provinceCode],
                                function(insertErr) {
                                    if (insertErr) {
                                        reject(insertErr);
                                        return;
                                    }
                                    console.log(`➕ Inserted: ${cityCode} - ${cityName} (Provinsi: ${provinceCode})`);
                                    insertedCount++;
                                    resolve();
                                }
                            );
                        }
                    }
                );
            });
        }
        
        // Tutup koneksi database
        db.close((err) => {
            if (err) {
                console.error('❌ Error menutup database:', err.message);
            } else {
                console.log('💾 Koneksi database ditutup');
            }
        });
        
        console.log('\n📊 RINGKASAN UPDATE CITIES:');
        console.log(`➕ Data baru ditambahkan: ${insertedCount}`);
        console.log(`🔄 Data diperbarui: ${updatedCount}`);
        console.log(`✓ Data sudah sama: ${skippedCount}`);
        console.log(`✅ Total kota/kabupaten diproses: ${Object.keys(apiData).length}`);
        console.log('\n🎉 Update kota/kabupaten selesai!');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
    }
}

// Jalankan fungsi update
if (require.main === module) {
    updateCities();
}

module.exports = updateCities;
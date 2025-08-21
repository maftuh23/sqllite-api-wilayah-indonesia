const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path ke database SQLite
const dbPath = path.join(__dirname, '..', 'records.sqlite');

// URL API untuk provinces
const API_URL = 'https://sipedas.pertanian.go.id/api/wilayah/list_wilayah?thn=2025&lvl=10&lv2=11';

async function updateProvinces() {
    console.log('🚀 Memulai update data provinsi...');
    
    try {
        // Fetch data dari API
        console.log('📡 Mengambil data dari API...');
        const response = await axios.get(API_URL);
        const apiData = response.data;
        
        console.log(`✅ Berhasil mengambil ${Object.keys(apiData).length} provinsi dari API`);
        
        // Buka koneksi database
        const db = new sqlite3.Database(dbPath);
        
        console.log('💾 Membuka koneksi database...');
        
        // Proses setiap provinsi
        let updatedCount = 0;
        let insertedCount = 0;
        
        for (const [provinceCode, provinceName] of Object.entries(apiData)) {
            await new Promise((resolve, reject) => {
                // Cek apakah province sudah ada
                db.get(
                    'SELECT province_code, province_name FROM provinces WHERE province_code = ?',
                    [parseInt(provinceCode)],
                    (err, row) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        
                        if (row) {
                            // Province sudah ada, cek apakah nama berbeda
                            if (row.province_name !== provinceName) {
                                // Update nama province
                                db.run(
                                    'UPDATE provinces SET province_name = ? WHERE province_code = ?',
                                    [provinceName, parseInt(provinceCode)],
                                    function(updateErr) {
                                        if (updateErr) {
                                            reject(updateErr);
                                            return;
                                        }
                                        console.log(`🔄 Updated: ${provinceCode} - ${row.province_name} → ${provinceName}`);
                                        updatedCount++;
                                        resolve();
                                    }
                                );
                            } else {
                                console.log(`✓ Sudah ada dan sama: ${provinceCode} - ${provinceName}`);
                                resolve();
                            }
                        } else {
                            // Province belum ada, insert data baru
                            db.run(
                                'INSERT INTO provinces (province_code, province_name, province_country_code) VALUES (?, ?, ?)',
                                [parseInt(provinceCode), provinceName, 62], // 62 adalah kode negara Indonesia
                                function(insertErr) {
                                    if (insertErr) {
                                        reject(insertErr);
                                        return;
                                    }
                                    console.log(`➕ Inserted: ${provinceCode} - ${provinceName}`);
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
        
        console.log('\n📊 RINGKASAN UPDATE:');
        console.log(`➕ Data baru ditambahkan: ${insertedCount}`);
        console.log(`🔄 Data diperbarui: ${updatedCount}`);
        console.log(`✅ Total provinsi diproses: ${Object.keys(apiData).length}`);
        console.log('\n🎉 Update provinsi selesai!');
        
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
    updateProvinces();
}

module.exports = updateProvinces;
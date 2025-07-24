const db = require('./connection');

const getAllProvince = (callback) => {
    db.all('select province_code as id, province_name as name, province_latitude as latitude, province_longitude as longitude from provinces',[], (err, data) => {
        callback(err, data);
    })
};

const getProvinceById = (id, callback) => {
    db.all('select province_code as id, province_name as name, province_latitude as latitude, province_longitude as longitude from provinces where province_code = ?',[id], (err, data) => {
        callback(err, data);
    })
};

const getCities = (callback) => {
    db.all('select city_code as id, city_name as name,city_latitude as latitude, city_longitude as longitude  from cities',[], (err, data) => {
        callback(err, data);
    })
};

const getCitiesByProvId = (provId, callback) => {
    db.all('select city_code as id, city_name as name,city_latitude as latitude, city_longitude as longitude from cities where city_province_code = ?',[provId], (err, data) => {
        callback(err, data);
    })
};

const getKecamatanByCity = (cityId, callback) => {
    db.all('select sub_district_code as id, sub_district_name as name, sub_district_latitude as latitude, sub_district_longitude as longitude from sub_districts where sub_district_city_code = ?',[cityId], (err, data) => {
        callback(err, data);
    });
};

const getKelurahan = (kecamatanId, callback) => {
    db.all('select village_code as id, village_name as name, village_latitude as latitude, village_longitude as longitude from villages where village_sub_district_code = ?',[kecamatanId], (err, data) => {
        callback(err, data);
    })
};

module.exports = {
    getAllProvince,
    getProvinceById,
    getCities,
    getCitiesByProvId,
    getKecamatanByCity,
    getKelurahan
}
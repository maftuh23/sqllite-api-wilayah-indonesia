const express = require('express');
const router = express.Router();

const query = require('../db/query');

router.get('/', (req, res) => {
    res.json({
        status: 200,
    })
});

router.get('/provinces', (req, res) => {
    query.getAllProvince((err,prov)=>{
        if (err){
            res.status(500).json({error:err.message});
        }else{
            res.json(prov);
        }
    })
});

router.get('/provinces/:id', (req, res) => {
    query.getProvinceById(req.params.id, (err,prov)=>{
        if (err){
            res.status(500).json({error:err.message});
        }else{
            res.json(prov);
        }
    })
});

router.get('/cities', (req, res) => {
    query.getCities((err,cities)=>{
        if (err){
            res.status(500).json({error:err.message});
        }else  {
            res.json(cities);
        }
    })
});

router.get('/cities/:id', (req, res) => {
    query.getCitiesByProvId(req.params.id, (err,cities)=>{
        if (err){
            res.status(500).json({error:err.message});
        }else{
            res.json(cities);
        }
    })
});

router.get('/kecamatan/:cityId', (req, res) => {
    query.getKecamatanByCity(req.params.cityId, (err,kecamatan)=>{
        if (err){
            res.status(500).json({error:err.message});
        }else{
            res.json(kecamatan);
        }
    })
});

router.get('/kelurahan/:kecId', (req, res) => {
    query.getKelurahan(req.params.kecId,(err,kelurahan)=>{
        if (err){
            res.status(500).json({error:err.message});
        }else{
            res.json(kelurahan);
        }
    })
});

module.exports = router;
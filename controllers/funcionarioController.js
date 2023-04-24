const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario');

router.post('/', async(req, res) => {
    const {nome, area} = req.body;
    const funcionario = {nome, area};
    try{
        await Funcionario.create(funcionario);
        res.status(201).json(funcionario);
    } catch (error) {
        res.status(500).json({erro: error});
    }
});

module.exports = router;
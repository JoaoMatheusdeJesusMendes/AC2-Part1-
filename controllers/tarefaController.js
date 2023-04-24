const express = require('express');
const router = express.Router();
const Tarefa = require('../models/Tarefa');

router.post('/', async(req, res) => {
    const {nome, inicio, termino, concluida, funcionarios} = req.body;
    const tarefa = {nome, inicio, termino, concluida, funcionarios};
    try{
        await Tarefa.create(tarefa);
        res.status(201).json(tarefa);
    } catch (error) {
        res.status(500).json({erro: error});
    }
});

router.patch('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const {funcionarios} = req.body;

        const tar = {
            funcionarios
        }

        const updateTar = await Tarefa.updateOne({_id: id}, tar);

        if(updateTar.matchedCount === 0){
            res.status(422).json({mensagem: "Tarefa não encontrada"});
            return
        }
        res.status(200).json(tar);
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

router.patch('/concluida/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const {termino, concluida} = req.body;

        const tar = {
            termino, concluida
        }

        const updateTar = await Tarefa.updateOne({_id: id}, tar);

        if(updateTar.matchedCount === 0){
            res.status(422).json({mensagem: "Tarefa não encontrada"});
            return
        }
        res.status(200).json(tar);
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

router.get('/', async (req, res) => {
    try{
        const tarefas = await Tarefa.find();
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const tarefas = await Tarefa.find({funcionarios: req.params.id});
        if(!tarefas){
            res.status(422).json({ mensagem: "Usuario não possui tarefa."});
            return
        }
        res.status(200).json({tarefas})
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

router.get('/concluidoEntre/:dtIni/:dtFim', async (req, res) => {
    try{

        const dataInicio = new Date(req.params.dtIni);
        const dataFim = new Date(req.params.dtFim);

        const query = {
            termino: {
            $gte: dataInicio,
            $lte: dataFim
            }
        };
        const tarefas = await Tarefa.find(query);
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({ error: error });
    }
    
});
module.exports = router;
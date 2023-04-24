const mongoose = require('mongoose');

const Tarefa = mongoose.model('Tarefa', {
    nome: String,
    inicio: Date,
    termino: Date,
    concluida: Boolean,
    funcionarios: String
});
module.exports = Tarefa;
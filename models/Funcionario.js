const mongoose = require('mongoose');
const Funcionario = mongoose.model('Funcionario', {
    nome: String,
    area: String,
});
module.exports = Funcionario;
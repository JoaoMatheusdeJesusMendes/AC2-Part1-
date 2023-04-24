const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const funcionarioController = require('./controllers/FuncionarioController');
const tarefaController = require('./controllers/TarefaController');

app.use('/funcionario', funcionarioController);
app.use('/tarefa', tarefaController);

const db_user = 'jm2matheus';
const db_pass = 'ARxF8nX6haBaecyd';

mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.aylkrxk.mongodb.net/?retryWrites=true&w=majority`)
   .then(() => {
       app.listen('3000', () =>{
           console.log('Conecção com MongoDB bem sucedida')
           console.log('Servidor iniciado na porta 3000!');
       })
   }).catch((error) => {
       console.log(error);
   });
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const routes = require('../routes/routes'); // Importe o arquivo de rotas

// Conexão com o banco de dados
mongoose.connect('mongodb+srv://adm:pi%40123@cluster0.njnekqa.mongodb.net/')
  .then(() => console.log('Conexão com MongoDB estabelecida'))
  .catch(err => console.log('Erro de conexão com MongoDB:', err));

// Usar o body-parser
app.use(bodyParser.json());

// Definir rota para os endpoints
app.use('/api/dadosSolares', routes);

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

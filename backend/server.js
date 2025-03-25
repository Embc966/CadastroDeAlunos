// filepath: c:\Users\meloe\Desenvolvimento\CadastroAlunos\backend\server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./src/routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose
    .connect(
        "mongodb+srv://Embc:Embc966@paciente.ue86q.mongodb.net/?retryWrites=true&w=majority&appName=Paciente",
        { serverSelectionTimeoutMS: 300000 }
    )
    .then(() => console.log("Conectado ao MongoDB com sucesso!"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB...", err));

// Rota de saúde
app.get('/health', (req, res) => {
    res.status(200).json({ status: 200, message: 'servidor ativo!' });
});

// Rotas de alunos
app.use('/api', studentRoutes);

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
const dbConfig = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
dbConfig();

// Routes
app.use('/api/students', studentRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

document.getElementById('formCadastro').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    // Captura os dados do formulário
    const aluno = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        curso: document.getElementById('curso').value,
        periodo: document.getElementById('periodo').value,
        turma: document.getElementById('turma').value,
        turno: document.getElementById('turno').value,
        endereco: document.getElementById('endereco').value,
        telefone: document.getElementById('telefone').value,
    };

    try {
        // Envia os dados para o backend
        const response = await fetch('http://localhost:3000/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno),
        });

        if (response.ok) {
            alert('Aluno cadastrado com sucesso!');
            document.getElementById('formCadastro').reset(); // Limpa o formulário
        } else {
            alert('Erro ao cadastrar aluno.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao conectar com o servidor.');
    }
});
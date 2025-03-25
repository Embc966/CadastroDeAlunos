// filepath: c:\Users\meloe\Desenvolvimento\CadastroAlunos\backend\src\routes\studentRoutes.js
const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

// Definição das rotas
router.get('/students', studentController.listarAlunos);
router.post('/students', studentController.criarAluno);
router.put('/students/:id', studentController.atualizarAluno);
router.delete('/students/:id', studentController.excluirAluno);

module.exports = router;
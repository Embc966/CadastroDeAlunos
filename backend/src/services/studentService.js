const Student = require('../models/studentModel');

// Função para listar todos os alunos
const listarAlunos = async () => {
    return await Student.find();
};

// Função para criar um novo aluno
const criarAluno = async (dadosAluno) => {
    const novoAluno = new Student(dadosAluno);
    return await novoAluno.save();
};

// Função para atualizar um aluno
const atualizarAluno = async (id, dadosAtualizados) => {
    return await Student.findByIdAndUpdate(id, dadosAtualizados, { new: true });
};

// Função para excluir um aluno
const excluirAluno = async (id) => {
    return await Student.findByIdAndDelete(id);
};

module.exports = {
    listarAlunos,
    criarAluno,
    atualizarAluno,
    excluirAluno,
};
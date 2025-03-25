const studentService = require('../services/studentService');

const listarAlunos = async (req, res) => {
    try {
        const alunos = await studentService.listarAlunos();
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar alunos', error });
    }
};

const criarAluno = async (req, res) => {
    try {
        const aluno = await studentService.criarAluno(req.body);
        res.status(201).json(aluno);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar aluno', error });
    }
};

const atualizarAluno = async (req, res) => {
    try {
        const alunoAtualizado = await studentService.atualizarAluno(req.params.id, req.body);
        if (!alunoAtualizado) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json(alunoAtualizado);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar aluno', error });
    }
};

const excluirAluno = async (req, res) => {
    try {
        const alunoExcluido = await studentService.excluirAluno(req.params.id);
        if (!alunoExcluido) {
            return res.status(404).json({ message: 'Aluno não encontrado' });
        }
        res.status(200).json({ message: 'Aluno excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir aluno', error });
    }
};

module.exports = {
    listarAlunos,
    criarAluno,
    atualizarAluno,
    excluirAluno,
};
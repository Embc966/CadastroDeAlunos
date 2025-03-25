const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    curso: {
        type: String,
        required: true
    },
    periodo: {
        type: String,
        required: true
    },
    turma: {
        type: String,
        required: true
    },
    turno: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);
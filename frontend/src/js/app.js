const apiUrl = 'http://localhost:3000/api/students';

document.addEventListener('DOMContentLoaded', () => {
    fetchStudents();
    document.getElementById('studentForm').addEventListener('submit', handleFormSubmit);
});

async function listarAlunos() {
    try {
        const response = await fetch('http://localhost:3000/api/students');
        const alunos = await response.json();

        const tabela = document.getElementById('tabelaAlunos').querySelector('tbody');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        alunos.forEach((aluno) => {
            const linha = `
                <tr>
                    <td>${aluno.nome}</td>
                    <td>${aluno.email}</td>
                    <td>${aluno.curso}</td>
                    <td>${aluno.periodo}</td>
                    <td>${aluno.turma}</td>
                    <td>${aluno.turno}</td>
                    <td>${aluno.endereco}</td>
                    <td>${aluno.telefone}</td>
                    <td>
                        <button onclick="editarAluno('${aluno._id}')">Editar</button>
                        <button onclick="excluirAluno('${aluno._id}')">Excluir</button>
                    </td>
                </tr>
            `;
            tabela.innerHTML += linha;
        });
    } catch (error) {
        console.error('Erro ao listar alunos:', error);
    }
}

listarAlunos();

function createEditButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Edit';
    button.onclick = () => loadStudentData(id);
    return button;
}

function createDeleteButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.onclick = () => deleteStudent(id);
    return button;
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const studentData = Object.fromEntries(formData.entries());
    const method = studentData._id ? 'PUT' : 'POST';
    const url = studentData._id ? `${apiUrl}/${studentData._id}` : apiUrl;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(studentData),
        });
        if (response.ok) {
            fetchStudents();
            event.target.reset();
        } else {
            console.error('Error saving student:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function loadStudentData(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        const student = await response.json();
        populateForm(student);
    } catch (error) {
        console.error('Error loading student data:', error);
    }
}

function populateForm(student) {
    const form = document.getElementById('studentForm');
    for (const key in student) {
        if (student.hasOwnProperty(key)) {
            form[key].value = student[key];
        }
    }
}

async function editarAluno(id) {
    const aluno = {
        nome: prompt('Digite o novo nome:'),
        email: prompt('Digite o novo e-mail:'),
        curso: prompt('Digite o novo curso:'),
        periodo: prompt('Digite o novo período:'),
        turma: prompt('Digite a nova turma:'),
        turno: prompt('Digite o novo turno:'),
        endereco: prompt('Digite o novo endereço:'),
        telefone: prompt('Digite o novo telefone:'),
    };

    try {
        const response = await fetch(`http://localhost:3000/api/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno),
        });

        if (response.ok) {
            alert('Aluno atualizado com sucesso!');
            listarAlunos(); // Atualiza a lista de alunos
        } else {
            alert('Erro ao atualizar aluno.');
        }
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
    }
}

async function excluirAluno(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/students/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Aluno excluído com sucesso!');
            listarAlunos(); // Atualiza a lista de alunos
        } else {
            alert('Erro ao excluir aluno.');
        }
    } catch (error) {
        console.error('Erro ao excluir aluno:', error);
    }
}

document.getElementById('formCadastro').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário (recarregar a página)

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
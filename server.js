const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;
const path = require('path');
const cors = require('cors');

app.use(cors());

// Middleware para servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Middleware para analisar o corpo das requisições POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = new sqlite3.Database('./cadastros.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado ao banco de dados.');
});

db.run(`CREATE TABLE IF NOT EXISTS cadastros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sobrenome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    senha TEXT NOT NULL
)`);

// Validação de Email
function validarEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('cadastro', (req, res) => {
    const { nome, sobrenome, email, telefone, senha } = req.body;

    // Verifica se os campos obrigatórios estão preenchidos
    if (!nome || !sobrenome || !email || !senha) {
        return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos.');
    }

    // Verifica o formato do email
    if (!validarEmail(email)) {
        return res.status(400).send('O formato do email é inválido.');
    }

    // Verifica se o email já existe
    db.get(`SELECT * FROM cadastros WHERE email = ?`, [email], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if (row) {
            return res.status(400).send('Este email já está cadastrado.');
        }

        // Se tudo estiver ok, insere o novo cadastro
        const sql = `INSERT INTO cadastros (nome, sobrenome, email, telefone, senha) VALUES (?, ?, ?, ?, ?)`;
        db.run(sql, [nome, sobrenome, email, telefone, senha], (err) => {
            if (err) {
                return console.error(err.message);
            }
            res.send('Cadastro realizado com sucesso!');
        });
    });
});

/* app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
}); */

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
  });
  
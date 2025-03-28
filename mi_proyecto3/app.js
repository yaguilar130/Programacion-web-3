const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) throw err;
        res.render('index', { usuarios: results });
    });
});


app.get('/add', (req, res) => res.render('add'));
app.post('/add', (req, res) => {
    const { nombre, email } = req.body;
    connection.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});


app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.render('edit', { usuario: results[0] });
    });
});
app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, email } = req.body;
    connection.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});


app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Servidor en ejecución en http://localhost:3000');
});
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yosse',      
    password: 'y0ss32025',      
    database: 'yossedb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Conectado a MySQL");
});


app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    connection.query(query, [name, email], (err, result) => {
        if (err) return res.status(400).send(err);
        res.status(201).send({ id: result.insertId, name, email });
    });
});


app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
        if (err) return res.status(400).send(err);
        res.send(results);
    });
});


app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
    connection.query(query, [name, email, req.params.id], (err, result) => {
        if (err) return res.status(400).send(err);
        res.send({ id: req.params.id, name, email });
    });
});


app.delete('/users/:id', (req, res) => {
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [req.params.id], (err, result) => {
        if (err) return res.status(400).send(err);
        res.send({ message: 'Usuario eliminado' });
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
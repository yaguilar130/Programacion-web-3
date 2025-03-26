const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yosse',
    password: 'y0ss32025',
    database: 'yossedb'
});

connection.connect(err => {
    if (err) {
        console.error('Error al conectar:', err);
        return;
    }
    console.log('Conectado a la base de datos');

    connection.query('SELECT * FROM nombres', (err, results) => {
        if (err) throw err;
        console.log(results);
        
        connection.end(); 
    });
});
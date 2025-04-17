const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'yosse',
    password: 'y0ss32025', // tu contraseña de MySQL
    database: 'crud_db'
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log('🟢 Conectado a la base de datos MySQL');
  });
  
  module.exports = db;
  
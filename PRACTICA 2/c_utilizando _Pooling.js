const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'yosse',
  password: 'y0ss32025',
  database: 'yossedb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Conectado utilizando Pooling!");
  connection.release();
});
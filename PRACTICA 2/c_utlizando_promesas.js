const mysql = require('mysql2/promise');

async function connectWithPromises() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'yosse',
    password: 'y0ss32025',
    database: 'yossedb'
  });
  console.log("Conectado con promesas!");
  return connection;
}

connectWithPromises();
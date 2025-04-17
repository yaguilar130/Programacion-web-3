const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.listen(3001, () => {
  console.log('🚀 Servidor corriendo en http://localhost:3001');
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas API primero
const controlInternoRoutes = require('./routes/control_interno.routes');
app.use('/api/control_interno', controlInternoRoutes);

// Servir frontend después
app.use(express.static(path.join(__dirname, '../Frontend/dist')));

// Redirigir cualquier otra ruta al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => console.error('❌ Error de conexión', err));

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});

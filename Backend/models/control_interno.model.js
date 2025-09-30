const mongoose = require('mongoose');

const controlInternoSchema = new mongoose.Schema({
  numero_de_control: String,
  nombre: String,
  materia_prima: String,
  cultura: String,
  procedencia: String,
  ubicacion: String,
  observaciones: String,
  url_imagenes: [String]  // ← ahora es un array
});

module.exports = mongoose.model('ControlInterno', controlInternoSchema);

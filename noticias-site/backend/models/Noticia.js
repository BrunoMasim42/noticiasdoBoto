const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  imagem: { type: String },
  texto: { type: String, required: true },
  categoria: { type: String, required: true },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Noticia', noticiaSchema);

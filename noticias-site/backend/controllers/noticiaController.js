const Noticia = require('../models/Noticia');

async function criarNoticia(req, res) {
  const { titulo, imagem, texto, categoria } = req.body;

  try {
    const novaNoticia = new Noticia({ titulo, imagem, texto, categoria });
    await novaNoticia.save();
    res.status(201).json({ mensagem: 'Notícia criada com sucesso', noticia: novaNoticia });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao criar notícia', erro: err.message });
  }
}

async function listarNoticias(req, res) {
  try {
    const noticias = await Noticia.find().sort({ data: -1 });
    res.json(noticias);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar notícias', erro: err.message });
  }
}

module.exports = { criarNoticia, listarNoticias };

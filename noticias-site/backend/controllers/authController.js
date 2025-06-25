const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registrar(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ mensagem: 'Email já cadastrado' });

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new User({ nome, email, senha: senhaHash });
    await novoUsuario.save();

    res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar', erro: err.message });
  }
}

async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ mensagem: 'Senha incorreta' });

    const token = jwt.sign(
      { id: usuario._id, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, usuario: { nome: usuario.nome, email: usuario.email } });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao logar', erro: err.message });
  }
}

module.exports = { registrar, login };

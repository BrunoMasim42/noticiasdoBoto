const express = require('express');
const router = express.Router();
const { criarNoticia, listarNoticias } = require('../controllers/noticiaController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, criarNoticia);
router.get('/', listarNoticias);

module.exports = router;

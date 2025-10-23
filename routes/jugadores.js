const express = require('express');
const router = express.Router();
const jugadores = require('../controllers/jugadores');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware, jugadores.listarJugadores);
router.get('/total', authMiddleware, jugadores.contarJugadores);
router.get('/:id', authMiddleware, jugadores.obtenerJugador);
router.post('/', authMiddleware, jugadores.crearJugador);
router.put('/:id', authMiddleware, jugadores.editarJugador);
router.delete('/:id', authMiddleware, jugadores.eliminarJugador);
router.get('/clubes', authMiddleware, jugadores.listarClubes);

module.exports = router;
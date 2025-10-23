const db = require('../db/db');

// Listar jugadores
exports.listarJugadores = (req, res) => {
  const club = req.query.club;
  const pagina = parseInt(req.query.pagina) || 1;
  const limite = parseInt(req.query.limite) || 100;
  const offset = (pagina - 1) * limite;

  let sql = `
    SELECT id, long_name AS nombre, player_positions AS posicion, club_name AS equipo, value_eur AS valor
    FROM players
  `;
  let params = [];

  if (club) {
    sql += ' WHERE club_name = ?';
    params.push(club);
  }

  sql += ' LIMIT ? OFFSET ?';
  params.push(limite, offset);

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener jugadores' });
    res.json(results);
  });
};

// Obtener jugador por ID
exports.obtenerJugador = (req, res) => {
  const id = req.params.id;
  db.query(
    'SELECT id, long_name AS nombre, player_positions AS posicion, club_name AS equipo, value_eur AS valor FROM players WHERE id = ?',
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ mensaje: 'Error al obtener jugador' });
      if (results.length === 0) return res.status(404).json({ mensaje: 'Jugador no encontrado' });
      res.json(results[0]);
    }
  );
};

// Crear nuevo jugador
exports.crearJugador = (req, res) => {
  const { nombre, posicion, equipo, valor } = req.body;
  db.query(
    'INSERT INTO players (long_name, player_positions, club_name, value_eur, fifa_version, fifa_update, player_face_url, nationality_name, overall, potential, age) VALUES (?, ?, ?, ?, "FIFA 25", "v1", "", "", 70, 80, 25)',
    [nombre, posicion, equipo, valor],
    (err, result) => {
      if (err) return res.status(500).json({ mensaje: 'Error al crear jugador' });
      res.status(201).json({ id: result.insertId, nombre, posicion, equipo, valor });
    }
  );
};

// Editar jugador
exports.editarJugador = (req, res) => {
  const id = req.params.id;
  const { nombre, posicion, equipo, valor } = req.body;
  db.query(
    'UPDATE players SET long_name = ?, player_positions = ?, club_name = ?, value_eur = ? WHERE id = ?',
    [nombre, posicion, equipo, valor, id],
    (err, result) => {
      if (err) return res.status(500).json({ mensaje: 'Error al actualizar jugador' });
      res.json({ id, nombre, posicion, equipo, valor });
    }
  );
};

// Eliminar jugador
exports.eliminarJugador = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM players WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar jugador' });
    res.json({ mensaje: 'Jugador eliminado' });
  });
};

// Contar total de jugadores
exports.contarJugadores = (req, res) => {
  db.query('SELECT COUNT(*) AS total FROM players', (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al contar jugadores' });
    res.json(results[0].total);
  });
};

// Listar clubes únicos para autocompletado
exports.listarClubes = (req, res) => {
  db.query('SELECT DISTINCT club_name AS club FROM players ORDER BY club_name', (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener clubes' });
    const clubes = results.map(row => row.club);
    res.json(clubes);
  });
};

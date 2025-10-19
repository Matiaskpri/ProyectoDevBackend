const express = require('express');
const cors = require('cors');
const app = express();

// Lista de jugadores en memoria
let jugadores = [];

app.use(cors());
app.use(express.json());

// Obtener todos los jugadores
app.get('/api/jugadores', (req, res) => {
  res.json(jugadores);
});

// Obtener un jugador por ID
app.get('/api/jugadores/:id', (req, res) => {
  const jugador = jugadores.find(j => j.id == req.params.id);
  res.json(jugador || {});
});

// Crear un nuevo jugador
app.post('/api/jugadores', (req, res) => {
  const nuevo = { ...req.body, id: Date.now() };
  jugadores.push(nuevo);
  res.status(201).json(nuevo);
});

// Actualizar un jugador existente
app.put('/api/jugadores/:id', (req, res) => {
  const index = jugadores.findIndex(j => j.id == req.params.id);
  if (index !== -1) {
    jugadores[index] = { ...req.body, id: jugadores[index].id };
    res.json(jugadores[index]);
  } else {
    res.status(404).send();
  }
});

// Eliminar un jugador
app.delete('/api/jugadores/:id', (req, res) => {
  const index = jugadores.findIndex(j => j.id == req.params.id);
  if (index !== -1) {
    jugadores.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
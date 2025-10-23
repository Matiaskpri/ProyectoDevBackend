const express = require('express');
const cors = require('cors');
const jugadoresRoutes = require('./routes/jugadores');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Rutas de autenticación
app.use('/api', authRoutes);

// 🛡️ Rutas protegidas
app.use('/api/jugadores', jugadoresRoutes);

app.listen(3000, () => {
  console.log('🟢 Servidor corriendo en http://localhost:3000');
});
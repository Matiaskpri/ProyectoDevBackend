const jwt = require('jsonwebtoken');
const SECRET = 'clave_secreta_super_segura';

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Usuario fijo
  if (email === 'admin@fifa.com' && password === '123456') {
    const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }
};
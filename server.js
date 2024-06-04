const express = require('express');
const axios = require('axios');
const session = require('express-session');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'tu_secreto_aqui',
  resave: false,
  saveUninitialized: true
}));

const apiKey = 'd03f6e1112694da0bcc1dd1bd019343b';

// Ruta para obtener los videojuegos desde la API de RAWG
app.get('/api/games', (req, res) => {
  const url = `https://api.rawg.io/api/games?key=${apiKey}`;
  axios.get(url)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log('Error:', error);
      res.status(500).json({ error: 'Error al obtener los videojuegos' });
    });
});

// Ruta para el inicio de sesión (simulado)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Aquí puedes implementar la lógica de verificación de credenciales
  // por ejemplo, comparando con usuarios almacenados en memoria
  if (email === 'usuario@example.com' && password === 'contraseña') {
    req.session.user = { email };
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
});

// Ruta para cerrar sesión
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Error al cerrar sesión:', err);
    }
    res.json({ success: true });
  });
});

// Ruta para obtener el carrito de compras
app.get('/api/cart', (req, res) => {
  // Aquí puedes implementar la lógica para obtener los productos del carrito
  // por ejemplo, desde una variable de sesión o una base de datos
  const cartItems = req.session.cart || [];
  res.json(cartItems);
});

// Ruta para agregar un producto al carrito
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  // Aquí puedes implementar la lógica para agregar el producto al carrito
  // por ejemplo, agregándolo a una variable de sesión o a una base de datos
  const cartItem = { productId, quantity };
  if (!req.session.cart) {
    req.session.cart = [];
  }
  req.session.cart.push(cartItem);
  res.json({ success: true });
});

// Inicia el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');

// Charger les variables d'environnement
dotenv.config();

// Créer une connexion à la base de données MariaDB
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Vérifier la connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    return;
  }
  console.log('Connecté à la base de données MariaDB');
});

// Exporter la connexion à la base de données
module.exports = connection;

// Créer une instance de l'application Express
const app = express();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

// Routes pour les produits
app.use('/api', require('./routes/productRoutes'));

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

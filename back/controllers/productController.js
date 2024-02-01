const Product = require('../models/productModel');

// Récupérer tous les produits
function getAllProducts(req, res) {
  Product.getAllProducts((err, products) => {
    if (err) {
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json(products);
  });
}

// Créer un nouveau produit
function createProduct(req, res) {
  const newProduct = req.body;
  Product.createProduct(newProduct, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.status(201).json({ message: 'Produit créé avec succès', id: result.insertId });
  });
}

// Mettre à jour un produit
function updateProduct(req, res) {
  const productId = req.params.id;
  const updatedProduct = req.body;
  Product.updateProduct(productId, updatedProduct, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json({ message: 'Produit mis à jour avec succès' });
  });
}

// Supprimer un produit
function deleteProduct(req, res) {
  const productId = req.params.id;
  Product.deleteProduct(productId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur serveur' });
      return;
    }
    res.json({ message: 'Produit supprimé avec succès' });
  });
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
};

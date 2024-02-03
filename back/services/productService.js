const connection = require('../server');

// Récupérer tous les produits
function getAllProducts(callback) {
  connection.query('SELECT * FROM products', (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

// Créer un nouveau produit
function createProduct(newProduct, callback) {
  connection.query('INSERT INTO products SET ?', newProduct, (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

// Mettre à jour un produit
function updateProduct(productId, updatedProduct, callback) {
  connection.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, productId], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

// Supprimer un produit
function deleteProduct(productId, callback) {
  connection.query('DELETE FROM products WHERE id = ?', productId, (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

// Supprimer plusieurs produits
function deleteProducts(productIds, callback) {
  connection.query('DELETE FROM products WHERE id IN (?)', [productIds], (error, results) => {
    if (error) {
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProducts
};

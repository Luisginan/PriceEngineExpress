const Product = require("../models/product");

class ProductManager {
  constructor(connection) {
    this.connection = connection;
  }

  
  getProduct(productId) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM product WHERE id = ?', [productId], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }
}

module.exports = ProductManager;

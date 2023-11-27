
class LogisticManager {
    constructor(connection) {
        this.connection = connection;
    }

   getAverageSupplierPricebyProductId(productId) 
   {
    return new Promise((resolve, reject) => {
        this.connection.query('SELECT product_id, AVG(supplier_price) AS average_supplier_price FROM logistic WHERE product_id = ? and stock <> 0 GROUP BY product_id', [productId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
   }

    
}

module.exports = LogisticManager;

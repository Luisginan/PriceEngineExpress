
class RfqAcceptedHistoryManager {
    constructor(connection) {
        this.connection = connection;
    }
   
    getAveragePriceByProductId(productId) {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT AVG(price_accepted) AS average_price FROM rfqAcceptedHistory WHERE product_id = ?', [productId], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result[0].average_price);
                }
            });
        });
    }

}


module.exports = RfqAcceptedHistoryManager;

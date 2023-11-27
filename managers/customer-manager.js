
class CustomerManager {
  constructor(connection) {
    this.connection = connection;
  }
  getCustomerById(id) {
     return new Promise((resolve, reject) => {
         this.connection.query('SELECT * FROM customer WHERE id = ?', [id], (err, result) => {
             if (err) {
                 reject(err);
             } else {
                 resolve(result);
             }
         });
     });
  }
}

module.exports = CustomerManager;

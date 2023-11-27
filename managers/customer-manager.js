
class CustomerManager {
  constructor(connection) {
    this.connection = connection;
  }

  // Add methods to interact with the database here
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

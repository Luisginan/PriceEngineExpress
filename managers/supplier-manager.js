class SupplierManager {
  constructor(connection) {
    this.connection = connection;
  }

  getSupplierById(id) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM supplier WHERE id = ?', [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }
}

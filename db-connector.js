const mysql = require('mysql2');

class DBConnector {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'PriceEngine',
    });

    this.connect();
  }

  connect() {
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
      }
      console.log('Connected to MySQL!');
    });
  }

  close(){
    this.connection.end((err) => {
        if (err) {
            console.error('Error disconnecting from MySQL:', err);
        }
        console.log('Disconnected from MySQL!');
    });
  }
}

//export
module.exports = DBConnector;

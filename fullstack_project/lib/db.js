const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'mysql.metropolia.fi',
  user: 'erick',
  database: 'users',
  password: 'maiasquual1337'
});
connection.connect();
module.exports = connection;
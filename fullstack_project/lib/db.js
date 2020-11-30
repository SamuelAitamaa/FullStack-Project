const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mymovie',
  password: 'oL50Jee'
});
connection.connect(function (err){
  if(err){
    throw err;
  }
  console.log('connected mysql');
});
module.exports = connection;



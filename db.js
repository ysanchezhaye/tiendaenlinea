let mysql      = require('mysql');
let connection = mysql.createConnection({
  host     : 'bpxkeegzejyvbwalqlgi-mysql.services.clever-cloud.com',
  user     : 'umu12ry3zzewi2jx',
  password : 'uuVUFSZK4Qtr1wUzS07k',
  database : 'bpxkeegzejyvbwalqlgi',
  
});
 
connection.connect(function(error) {
    if (error) throw error
    console.log("DB conectada (ONLINE)")
});
 
/* connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
}); */
 
// connection.end();

module.exports = connection
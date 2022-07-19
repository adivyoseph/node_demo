var express = require('express'),
    configure = require('./server/configure'),
    mysql      = require('mysql2'),
    app = express();

app = configure(app);



// Create the connection pool.
const pool = mysql.createPool({
  host     : 'tenant_db',
  user     : 'root',
  password : 'martin',
  database : 'tenantdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

var server = app.listen(app.get('port'), function() {
    console.log('Web Server up: http://localhost:' + app.get('port'));

});

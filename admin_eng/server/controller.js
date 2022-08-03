var mysql      = require('mysql2');
var sleep = require('system-sleep');


// Create the connection pool.
const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'martin',
  database : 'tenantdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports =  {



    tenant_ids: function(req, res) {

        console.log("tenant_ids >> " );

        //query to all tenant ids
        pool.getConnection(function(err, conn) {
            if (err) throw err;
            //console.log('Connected to MySQL Server!');
            // Use the connection
            conn.query('SELECT tenant_id FROM tenants ',  function (error, results, fields) {
              if (error) {
                  console.log("query failed");
                  throw error;
              }
              if (results.length == 0) {
                  console.log('no results');
                  //todo handle
              }
              console.log(results);
              res.send(results);



            });
            pool.releaseConnection(conn);
        });

    },


    gettenant: function(req, res) {

         pool.getConnection(function(err, conn) {
             if (err) throw err;
             //console.log('Connected to MySQL Server!');
             // Use the connection
             var tenant_id = req.body.tenant_id;
             var sql = "SELECT * FROM tenants WHERE tenant_id = ?";
             var inserts = tenant_id;
             sql = mysql.format(sql, inserts);
             //conn.query('SELECT * FROM tenants WHERE name = ?', name , function (error, results, fields) {
             conn.query(sql , function (error, results, fields) {
               if (error) {
                   console.log("query failed");
                   throw error;
               }
               console.log('results.length ' + results.length);
               if (results.length == 0) {
                   //todo handle error
               }
               else {
                   console.log(results);
                   res.send(results);
               }
             });
             pool.releaseConnection(conn);
         });

    }


};

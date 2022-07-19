var mysql      = require('mysql2');
var sleep = require('system-sleep');

/*
CREATE TABLE IF NOT EXISTS wf_users (
	user_id MEDIUMINT NOT NULL AUTO_INCREMENT, 
	name varchar(20), 
    password varchar(20),
    admin_user BOOLEAN,
    primary_user BOOLEAN,
    secondary_user BOOLEAN,
    tenant_id int,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY(user_id)
);
*/


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


    id2tenant: function(req, res) {
        var userId = req.body.userid;

        console.log("id2tenant " + userId );

         //lookup user in db
        pool.getConnection(function(err, conn) {
            if (err) throw err;
            console.log('Connected to MySQL Server!');
            // Use the connection
            conn.query('SELECT * FROM wf_users WHERE user_id = ?', userId , function (error, results, fields) {
              if (error) {
                  console.log("query failed");
                  throw error;
              }
              if (results.length == 0) {
                  console.log('invalid user_id results');
                  //todo handle
              }
              console.log('userid search');
              console.log(results);
              const response = {
                  tenant_id: results[0].tenant_id,
                  user_name: results[0].name,
                  primary_user: results[0].primary_use
              };
              console.log(response);
              res.send(response);



            });
            pool.releaseConnection(conn);
        });

    },

    userlookup: function(req, res) {

       var userObj = {
            login: req.body.login,
            password: req.body.password
        };

        console.log("userlookup " + userObj.login );

        //lookup user in db
        pool.getConnection(function(err, conn) {
            if (err) throw err;
            console.log('Connected to MySQL Server!');
            // Use the connection
            conn.query('SELECT * FROM wf_users WHERE name = ?', userObj.login , function (error, results, fields) {
              if (error) {
                  console.log("query failed");
                  throw error;
              }
              if (results.length == 0) {
                  console.log('no results');
                  //add user
                  pool.getConnection(function(err, conn1) {
                      if (err) throw err;
                      //var records = userObj.login, userObj.password;
                      conn1.query('INSERT into wf_users (name, password ) VALUES (? ?)', [userObj.login, userObj.password], function (error, results1, fields) {
                          if (error) {
                              console.log("insert failed");
                              throw error;
                          }
                          console.log("insert ok");
                          console.log(results1);

                      });
                      pool.releaseConnection(conn1);
                  });

                  //update results
         
                  pool.getConnection(function(err, conn2) {
                      if (err) throw err;
                      conn.query('SELECT * FROM wf_users WHERE name = ?', userObj.login , function (error, results, fields) {
                          if (error) {
                            console.log("query failed");
                            throw error;
                          }

                          console.log(results);
                          res.send(results);


                      });


                      pool.releaseConnection(conn2);


                  });
              }
              else {
                  //existing user so
                  //check password
                  console.log(results);
                  res.send(results);
              }
              //console.log(fields);
            });
       // Don't forget to release the connection when finished!
       pool.releaseConnection(conn);
    });



 //       res.send('login');

    }

};

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


    newtenant: function(req, res) {
        console.log(">>newtenant " + req.body.tenant_name);

        var tenant_id = 0;

        //check for duplicates
        pool.getConnection(function(err, conn) {
            if (err) throw err;
            //console.log('Connected to MySQL Server!');
            // Use the connection
            var name = req.body.tenant_name;
            var sql = "SELECT * FROM tenants WHERE name = ?";
            var inserts = name;
            sql = mysql.format(sql, inserts);
            //conn.query('SELECT * FROM tenants WHERE name = ?', name , function (error, results, fields) {
            conn.query(sql , function (error, results, fields) {
              if (error) {
                  console.log("query failed");
                  throw error;
              }
              console.log('results.length ' + results.length);
              if (results.length == 0) {
                  console.log('no duplicate');
                  //todo check fields

                  //insert entry
                  pool.getConnection(function(err1, conn1) {
                      if (err1) throw err1;
                      //values list
                      var name = req.body.tenant_name;
                      var primary = req.body.primary;
                      var secondary = req.body.secondary;
                      var ide = req.body.ide;
                      var tools = req.body.tools;
                      var db = req.body.db;
                      var description = req.body.description;

                      console.log("insert " + name);
                      var post  = {name: name, primary_user: primary, secondary_user:  secondary, ide: ide, other_services:tools,db: db,  description: description};
                      conn1.query('INSERT INTO tenants SET ?', post,
                                   function (error1, results1, fields) {
                          if (error1) {
                              console.log("insert failed");
                              throw error1;
                          }
                          // update tenant_id
                          console.log(results1);
                          tenant_id = results1.insertId;

                      });
                      pool.releaseConnection(conn1);
                  });

                  //insert secondary
                  pool.getConnection(function(err, conn2) {
                      if (err) throw err;
                      var secondary = req.body.secondary;
                      var post  = {name: secondary, secondary_user: true, tenant_id:  tenant_id};

                      conn2.query('INSERT into wf_users SET ?', post, function (error, results1, fields) {
                          if (error) {
                              console.log("insert failed");
                              throw error;
                          }
                          console.log('insert secondary');

                      });
                      pool.releaseConnection(conn2);
                  });

                  //update primary
                  pool.getConnection(function(err, conn3) {
                      if (err) throw err;

                      var primary = req.body.primary;
                      conn3.query('UPDATE  wf_users SET primary_user = TRUE WHERE name = ?', primary, function (error, results3, fields) {
                          if (error) {
                              console.log("insert failed");
                              throw error;
                          }
                          console.log('SET primary_user = TRUE');
                      });
                      pool.releaseConnection(conn3);
                  });
                  pool.getConnection(function(err, conn4) {
                      if (err) throw err;
                      var primary = req.body.primary;
                      //var post  = {name: secondary, secondary_user: TRUE, tenant_id:  tenant_id};
                      var sql = "UPDATE  wf_users SET tenant_id = ? WHERE name = ?";
                      var inserts = [tenant_id, primary];
                      sql = mysql.format(sql, inserts);
                      console.log(sql);
                      //conn4.query('UPDATE  wf_users SET tenant_id = "${tenant_id}" WHERE name = "${primary}"', function (error, results3, fields) {
                      conn4.query(sql, function (error, results3, fields) {
                          if (error) {
                              console.log("insert failed");
                              throw error;
                          }

                          console.log('SET primary tenant_id');
                      });
                      pool.releaseConnection(conn4);
 
                  });

                  res.send('ok');
             }
              else {
                  // duplicate
                  //todo tell user
                  console.log('duplicate');
                  res.send('err');
              }
            });
            pool.releaseConnection(conn);
        });

    },

    id2tenant: function(req, res) {
        var userId = req.body.userid;

        console.log("id2tenant " + userId );

         //lookup user in db
        pool.getConnection(function(err, conn) {
            if (err) throw err;
            //console.log('Connected to MySQL Server!');
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
              console.log('userid search found ' + results[0].name);
              console.log(results);
              const response = {
                  tenant_id: results[0].tenant_id,
                  user_name: results[0].name,
                  primary_user: results[0].primary_user
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

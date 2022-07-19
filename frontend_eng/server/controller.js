
/*
CREATE TABLE IF NOT EXISTS wf_users (
	user_id MEDIUMINT NOT NULL AUTO_INCREMENT, 
	name varchar(20), 
    password varchar(20),
    admin_user BOOLEAN,
    primary_user BOOLEAN,
    secondary_user BOOLEAN,
    tenant_member VARCHAR(20),
    created DATETIME DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY(user_id)
);
*/


module.exports =  {

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
            conn.query('SELECT name,password,user_id,tenant_member FROM wf_users WHERE nane = ?,[userObj.login], function (error, results, fields) {
              if (error) {
                  console.log("query failed");
                  throw error;
              }
              res.send(results);
              console.log(results);
              //console.log(fields);
            });
       // Don't forget to release the connection when finished!
       pool.releaseConnection(conn);
    })



        res.send('login');

    }

};

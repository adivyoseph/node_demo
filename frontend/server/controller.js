var request = require('axios');

module.exports =  {
    index: function(req, res) {
        if (!req.session.userId) {
            res.redirect('/login');
        } else {
/*             var filter = {
                    'userId': req.session.userId,
                    'watched': false
                },
               options = {

                    sort: [['release_date',1]]
                };

            client.db().collection('movies')
                .find(filter, {}, options)
                .toArray(function(err, movies) {
                    if (err) { throw err; }
                    res.render('index', { 'movies': movies });
                });
*/
        }
    },
    showLogin: function(req, res) {
        res.render('login');
    },

    processLogin: function(req, res) {

        var userObj = {
            login: req.body.login,
            password: req.body.password
        };


        console.log("processLogin " + userObj.login);

        request.post('http://localhost:10002/userlookup', {login: userObj.login})
        .then(function(response) {
            console.log(response.data);
            //look up user in db
            //if found just return id
            //else create use and return id



        })
        .catch(function(error) {
            console.log(error);
            //todo tell user
        });

/*
        client
            .db()
            .collection('users')
            .find(userObj, {}, {})
            .toArray(function(err, users) {
                if (users.length === 0) {
                    client
                        .db()
                        .collection('users')
                        .insert(userObj, function(err, users) {
                            req.session.userId = users[0]._id;
                            res.redirect('/');
                        });
                } else {
                    req.session.userId = users[0]._id;
                    res.redirect('/');
                }
        });  
*/
    }

};

var request = require('request');

module.exports =  {
    index: function(req, res) {
        if (!req.session.userId) {
            res.redirect('/login');
        } else {
/*
            var filter = {
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
/*
        var userObj = {
            email: req.body.email,
            password: req.body.password
        };

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

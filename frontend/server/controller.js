var request = require('axios');

module.exports =  {
    index: function(req, res) {
        if (!req.session.userId) {
            res.redirect('/login');
        } else {

            request.post('http://localhost:10002/id_tenant', {userid: req.session.userId})
            .then(function(response) {
                console.log(response.data);
                    if (response.data.tenant_id > 0 ) {
                        //tenant entry set
                    }
                    else {
                        //prompt form for new tenant
                        console.log('prompt for new form');
                        //form data
                        var form_data = {
                            primary_user: response.data.user_name
                        };
                        res.render('newtenant', form_data);
                    }

            })
            .catch(function(error) {
                console.log(error);
                //todo tell user
            });




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

        request.post('http://localhost:10002/userlookup', {login: userObj.login, password: userObj.password})
        .then(function(response) {
            console.log(response.data);
            //look up user in db
            //if found returns id and tenant
            //console.log(response.data[0].user_id);
            req.session.userId = response.data[0].user_id;
            res.redirect('/');
            

            //if primary for an exiting tenant/team display manage page
            //else display new tenant form

        })
        .catch(function(error) {
            console.log(error);
            //todo tell user
        });


    }

};

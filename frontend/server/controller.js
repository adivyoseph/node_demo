var request = require('axios');

module.exports =  {
    index: function(req, res) {
        if (!req.session.userId) {
            res.redirect('/login');
        } else {

            console.log('session.userId ' + req.session.userId);
            request.post('http://localhost:10002/id_tenant', {userid: req.session.userId})
            .then(function(response) {
                console.log('tenant_id ' + response.data.tenant_id);
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


    },

    processNewtenant: function(req, res) {

         console.log("processNewtenant ");

         request.post('http://localhost:10002/id_tenant', {userid: req.session.userId})
         .then(function(response) {
             console.log(response.data);
                 if (response.data.tenant_id > 0 ) {
                     //tenant entry set already
                     //error
                 }
                 else {
                     //primary_user: response.data.user_name

                     var tenantObj = {
                         tenant_name: req.body.tenant,
                         primary: response.data.user_name,
                         secondary: req.body.secondary,
                         ide: req.body.ide,
                         tools: req.body.tools,
                         db: req.body.db,
                         description: req.body.description
                     };

                     //send to engine 

                     request.post('http://localhost:10002/newtenant', tenantObj)
                     .then(function(response1) {

                         console.log(response1.data);

                     })
                     .catch(function(error) {
                         console.log(error);
                         //todo tell user
                     });

                     //if ok display manage page
                     //else display error


                     res.render('login');




                 }

         })
         .catch(function(error) {
             console.log(error);
             //todo tell user
         });



    }

};

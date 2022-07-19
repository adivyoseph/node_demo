
module.exports =  {

    userlookup: function(req, res) {

        var userObj = {
            login: req.body.login,
            password: req.body.password
        };

        console.log("userlookup " + userObj.login);

        res.send('login');

    }

};

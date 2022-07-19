var express = require('express'),
    configure = require('./server/configure'),
    mysql      = require('mysql2'),
    app = express();

app = configure(app);



var server = app.listen(app.get('port'), function() {
    console.log('Web Server up: http://localhost:' + app.get('port'));

});

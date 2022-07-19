var express = require('express'),
    configure = require('./server/configure'),
    app = express();

app = configure(app);

var server = app.listen(app.get('port'), function() {
    console.log('Web Server up: http://localhost:' + app.get('port'));

    //db connect here
});

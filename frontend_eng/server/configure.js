var path = require('path'),
    routes = require('./routes'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');


module.exports = function(app) {
    app.set('port', process.env.PORT || 10002);

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    routes.initialize(app, new express.Router());

    return app;
};

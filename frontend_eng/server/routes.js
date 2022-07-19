var controller = require('./controller');

module.exports.initialize = function(app, router) {
    router.post('/userlookup', controller.userlookup);


    app.use('/', router);
};

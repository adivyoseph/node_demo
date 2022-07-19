var controller = require('./controller');

module.exports.initialize = function(app, router) {
    router.post('/userlookup', controller.userlookup);   //lookup by name

    router.post('/id_tenant', controller.id2tenant);     //user id look up tenant id


    app.use('/', router);
};

var controller = require('./controller');

module.exports.initialize = function(app, router) {

    router.post('/list_id_tenants', controller.tenant_ids);     //get a list of tenant ids

    router.post('/gettenant', controller.gettenant);            //get tenant data

    app.use('/', router);
};

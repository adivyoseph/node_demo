var controller = require('./controller');

module.exports.initialize = function(app, router) {
    router.get('/', controller.index);
    router.post('/dashboard', controller.req_manage_tenant);
 //   router.get('/manage', controller.manage_tenant);

    app.use('/', router);
};

var controller = require('./controller');

module.exports.initialize = function(app, router) {
    router.get('/', controller.index);

    router.get('/login', controller.showLogin);
    router.post('/login', controller.processLogin);

    router.post('/newtenant', controller.processNewtenant);

    router.post('/manage', controller.processManage);

    app.use('/', router);
};

var controller = require('./controller');

module.exports.initialize = function(app, router) {
    router.get('/', controller.index);

    app.use('/', router);
};

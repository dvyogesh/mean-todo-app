var TodosController = require('./controllers/TodosController');
var LoginController = require('./controllers/LoginController');

module.exports = function routes(app) {
    app.use('/todos', TodosController);
    app.use('/order', LoginController);
};
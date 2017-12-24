var TodosController = require('./controllers/TodosController');
var LoginController = require('./controllers/LoginController');
var MyOrdersController = require('./controllers/MyOrdersController');

module.exports = function routes(app) {
    app.use('/todos', TodosController);
    app.use('/order', LoginController);
    app.use('/myOrders', MyOrdersController);
};
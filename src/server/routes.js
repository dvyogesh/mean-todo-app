var TodosController = require('./controllers/TodosController');
var LoginOrderController = require('./controllers/LoginOrderController');
var MyOrdersController = require('./controllers/MyOrdersController');

module.exports = function routes(app) {
    app.use('/todos', TodosController);
    app.use('/ordersWhileLogin', LoginOrderController);
    app.use('/myOrders', MyOrdersController);

    app.get('/logout', function(req, res) {
    	res.send('logout');
    })
};
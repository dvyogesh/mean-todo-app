// var TodosController = require('./controllers/TodosController');
var MyOrdersController = require('./controllers/MyOrdersController');
var HomeController = require('./controllers/HomeController');

module.exports = function routes(app) {
    // app.use('/todos', TodosController);
    // app.use('/ordersWhileLogin', LoginOrderController);
    app.use('/myOrders', MyOrdersController);
    app.use('/ordersWhileLogin', HomeController);

    app.get('/logout', function(req, res) {
    	res.send('logout');
    })
};
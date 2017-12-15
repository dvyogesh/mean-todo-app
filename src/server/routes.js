var todosRoutes = require('./todos/todosRoutes');

module.exports = function routes(app) {
    app.use('/todos', todosRoutes);
};
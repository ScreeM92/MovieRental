let userController = require('../controllers/UsersController'),
    moviesController = require('../controllers/MoviesController'),
    categoryController = require('../controllers/CategoryController'),
    ticketController = require('../controllers/TicketController'),
    orderController = require('../controllers/OrderController');

module.exports = function(app) {
    app.get('/movies', moviesController.get);

    app.post('/movies', moviesController.add);

    app.get('/movies/:id', moviesController.getById);

    app.put('/movies/:id', moviesController.put);

    app.get('/categories', categoryController.get);

    app.post('/categories', categoryController.add);

    app.get('/orders', orderController.get);

    app.post('/orders', orderController.add);

    app.get('/tickets', ticketController.get);

    app.post('/tickets', ticketController.add);

    app.post('/register', function(req, res) {
        userController.add(req, res);
    });

    app.post('/login', function(req, res) {
        userController.login(req, res);
    });

    app.get('/admin', function(req, res) {
        res.send('admin logged in');
    });

    app.get('/logout', function(req, res) {
        userController.logout(req, res);
    });
};
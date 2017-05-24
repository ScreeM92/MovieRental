let Datastore = require('nedb'),
    getNewCategory = require('./models/Category.js'),
    Movie = require('./models/Movie.js'),
    User = require('./models/User.js'),
    db = {
        users: new Datastore({ filename: 'db/datastores/users.db', autoload: true }),
        categories: new Datastore({ filename: 'db/datastores/categories.db', autoload: true }),
        movies: new Datastore({ filename: 'db/datastores/movies.db', autoload: true }),
        tickets: new Datastore({ filename: 'db/datastores/tickets.db', autoload: true }),
        orders: new Datastore({ filename: 'db/datastores/orders.db', autoload: true })
    }

let data = {
    getMovies() {
        return new Promise((resolve, reject) => {
            db.movies.find({}, (err, movies) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(movies);
                }
            });
        });
    },

    getMovieById(req) {
        return new Promise((resolve, reject) => {
            db.movies.findOne({ _id: req.params.id }, (err, movie) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(movie);
                }
            });
        });
    },

    addMovie(movie) {
        return new Promise((resolve, reject) => {
            db.movies.insert(movie, function(err, newMovie) {
                if (err) {
                    reject(err);
                } else {
                    resolve(newMovie);
                }
            });
        });

    },

    updateMovie(update, movieToBeUpdated) {
        return new Promise((resolve, reject) => {
            db.movies.update({ "_id": movieToBeUpdated }, { $set: update }, { returnUpdatedDocs: true }, function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

    },

    getCategories() {
        return new Promise((resolve, reject) => {
            db.categories.find({}, (err, categories) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(categories);
                }
            });
        });
    },

    postCategory(category) {
        return new Promise((resolve, reject) => {
            db.categories.insert(category, function(err, newCategory) {
                if (err) {
                    reject(err);
                } else {
                    resolve(category);
                }
            });
        });
    },

    getTickets() {
        return new Promise((resolve, reject) => {
            db.tickets.find({}, (err, tickets) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(tickets);
                }
            });
        });
    },

    postTicket(ticket) {
        return new Promise((resolve, reject) => {
            db.tickets.insert(ticket, function(err, newTicket) {
                if (err) {
                    reject(err);
                } else {
                    resolve(ticket);
                }
            });
        });
    },

    getOrders() {
        return new Promise((resolve, reject) => {
            db.orders.find({}, (err, orders) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(orders);
                }
            });
        });
    },

    postOrder(order) {
        return new Promise((resolve, reject) => {
            db.orders.insert(order, function(err, newOrder) {
                if (err) {
                    reject(err);
                } else {
                    resolve(order);
                }
            });
        });
    },

    addUser(user) {
        return new Promise((resolve, reject) => {
            db.users.insert(user, function(err, newUser) {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },

    getUserById(userId) {
        return new Promise((resolve, reject) => {
            db.users.find({ _id: userId }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },

    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            db.users.find({ _email: username }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },

    checkUserExisting(email, password) {
        return new Promise((resolve, reject) => {
            db.users.findOne({ _email: email, _password: password }, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    },

    checkCategoryExisting(categoryName) {
        return new Promise((resolve, reject) => {
            db.categories.findOne({ _name: categoryName }, (err, category) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(category);
                }
            });
        });
    }
};

module.exports = data;
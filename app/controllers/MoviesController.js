let data = require('../../db/data.js');
let Movie = require('../../db/models/Movie');
let getNewCategory = require('../../db/models/Category');

let moviesController = {
    get(req, res) {
        data.getMovies()
            .then(movies => {
                res.json(movies)
            })
            .catch(err => { res.status(500).send(err.message); });
    },

    getById(req, res) {
        data.getMovieById(req)
            .then(movie => {
                res.json(movie)[0];
            })
            .catch(err => { res.status(500).send(err.message); });
    },

    add(req, res) {
        let movie = new Movie(req.body.title, req.body.director, req.body.year, req.body.category, req.body.description, req.body.imgURL, req.body.price);
        let category = getNewCategory(req.body.category);

        data.addMovie(movie)
            .then(newMovie => {
                res.json(newMovie);
                data.checkCategoryExisting(category.name).then(newCategory => {
                    if (!newCategory) {
                        data.postCategory(category);
                    }
                })
            })
            .catch(err => { res.status(500).send(err.message); });
    },
    put(req, res) {
        let update = req.body,
            movieToBeUpdated = req.params.id;

        data.updateMovie(update, movieToBeUpdated)
            .then(data => res.json(data))
            .catch(err => res.status(500).send(err.message));
    }
};

module.exports = moviesController;
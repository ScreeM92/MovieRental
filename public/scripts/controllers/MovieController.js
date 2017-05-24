import requester from '../data/requester.js';
import template from 'template';
import cookies from 'scripts/utils/cookies.js';
import 'jquery';
import _ from 'lodash';

const SIZE = 6;

class MovieController {
    index(page) {
        let movie;
        let categories;

        /* Get all categories */
        let categoriesPromise = requester.get('/categories');
        categoriesPromise.then(data => {
            categories = data;
        });

        return new Promise((resolve, reject) => {
            requester.get('/movies')
                .then(data => {
                    movie = data;
                })
                .then(() => {
                    return template.get('movie');
                })
                .then((template) => {
                    let currentPage = movie.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE);
                    let buttonsCount = Array(Math.ceil(movie.length / SIZE));

                    for (let i = 0; i < buttonsCount.length; i += 1) {
                        buttonsCount[i] = 1;
                    }

                    let obj = {
                        categories: categories,
                        movies: {
                            movie: currentPage,
                            size: buttonsCount,
                            count: buttonsCount.length,
                            hasQuery: false
                        }
                    };
                    let html = template(obj);
                    resolve(html);
                });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            requester.get('/movies/' + id)
                .then(data => {
                    resolve(data);
                });
        });
    }

    getHomeMovies() {
        return new Promise((resolve, reject) => {
            requester.get('/movies')
                .then(movies => {
                    let result = {
                        primary: movies[Math.floor(Math.random() * movies.length)],
                        recommended_movies: _.orderBy(movies, 'likes', 'desc')
                            .slice(0, 4)
                            .map(movie => ({
                                isLogged: cookies.get('user'),
                                _id: movie._id,
                                _title: movie._title,
                                _imgURL: movie._imgURL,
                                _price: movie._price
                            }))
                    };
                    resolve(result);
                });
        });
    }

    attachToTemplate(data, templateName) {
        return new Promise((resolve, reject) => {
            template.get(templateName).then(template => {
                let html = template(data);
                resolve(html);
            });
        });
    }

    searchBy(param, page, isCategory) {
        let movie,
            categories;

        /* Get all categories */
        let categoriesPromise = requester.get('/categories');
        categoriesPromise.then(data => {
            categories = data;
        });

        return new Promise((resolve, reject) => {
            requester.get('/movies')
                .then((data) => {
                    let paramToLower = param.toLowerCase();

                    if (isCategory === 'true') {
                        movie = data.filter(
                            b => b._category.toLowerCase().indexOf(paramToLower) > -1
                        );
                    } else {
                        movie = data.filter(
                            b => b._title.toLowerCase().indexOf(paramToLower) > -1 ||
                            b._director.toLowerCase().indexOf(paramToLower) > -1 ||
                            b._category.toLowerCase().indexOf(paramToLower) > -1
                        );
                    }

                    return template.get('movie');
                })
                .then((templ) => {
                    let currentPage = movie.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE);
                    let buttonsCount = Array(Math.ceil(movie.length / SIZE));
                    for (let i = 0; i < buttonsCount.length; i += 1) {
                        buttonsCount[i] = param;
                    }

                    let searchedMoviesObject = {
                        categories: categories,
                        movies: {
                            movie: currentPage,
                            size: buttonsCount,
                            hasQuery: true
                        }
                    };
                    let html = templ(searchedMoviesObject);
                    resolve(html);
                });
        });
    }

    add(context) {
        context.params.price = parseFloat(context.params.price);
        return requester.post('/movies', context.params);
    }

    edit() {
        function increaseLikes(movieId, newLikes) {
            return requester.put(`/movies/${movieId}`, { likes: newLikes });
        }

        return {
            increaseLikes
        };
    }
}

export default MovieController;
import requester from '../data/requester.js';
import template from 'template';
import 'jquery';

class CategoryController {

    index(context) {
        Promise.all([requester.get('/categories'), template.get('category')])
            .then(([category, template]) => {
                let obj = { category: category };
                let html = template(obj);
                context.swap(html);
            });
    }

    add(newCategory) {
        requester.post('/categories', newCategory);
    }

    searchMoviesByCategory(context, categoryName) {
        Promise.all([requester.get('/movies'), template.get('moviesByCategory')])
            .then(([movies, template]) => {
                let filteredMovies = movies.filter(movie => movie._category === categoryName);
                let obj = {
                    movies: filteredMovies
                };

                let html = template(obj);
                context.$element().find('#selected-movies').html(html);
            });
    }
}

export default CategoryController;
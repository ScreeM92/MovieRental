import requester from '../data/requester.js';
import template from 'template';
import cookies from 'scripts/utils/cookies.js';
import popUp from '../utils/pop-up.js';
import 'jquery';

class CartController {

    clearCart() {
        $('.total').html(`$0.00`);
        $("#dropdown-cart").html('');
        sessionStorage.clear();
    }

    updateCartItems() {
        let currentMoviesInCart = JSON.parse(sessionStorage.getItem('cart'));
        let totalAmount = 0;
        if (currentMoviesInCart !== null) {
            for (let movie of currentMoviesInCart) {
                totalAmount += +movie._price;
            }

            template.get('cart-dropdown').then(template => {
                let obj = { movie: currentMoviesInCart, amount: totalAmount };
                let html = template(obj);

                $("#dropdown-cart").html(html);
            });
        }
    }

    getCartMovies(context) {
        let currentMoviesInCart = JSON.parse(sessionStorage.getItem('cart')),
            totalAmount = 0;
        if (currentMoviesInCart === null) {
            currentMoviesInCart = [];
        }

        for (let movies of currentMoviesInCart) {
            totalAmount += +movies._price;
        }

        template.get('cart').then(template => {
            let obj = { movies: currentMoviesInCart, amount: totalAmount },
                html = template(obj);

            context.swap(html);
        });
    }
}

export default CartController;
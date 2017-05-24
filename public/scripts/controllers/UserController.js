import requester from '../data/requester.js';
import popUp from '../utils/pop-up.js';
import template from 'template';
import CartController from './CartController.js';
import 'jquery';

let cartController = new CartController();

class UserController {

    add(userContext) {
        requester.post('/register', userContext.params)
            .then(success => popUp.info('Successfully registered!'))
            .then(() => {
                setTimeout(function() {
                    userContext.redirect('#movies/page/1');
                }, 1000);
            })
            .catch(err => popUp.alert(err.responseText));
    }

    login(userContext) {
        requester.post('/login', userContext.params)
            .then(success => popUp.info('Successfully logged in!'))
            .then(() => { this.showUserMenu(); })
            .then(() => {
                setTimeout(function() {
                    userContext.redirect('#movies/page/1');
                }, 1000);
            })
            .catch(err => popUp.alert(err.responseText));
    }

    logout(context) {
        cartController.clearCart();

        requester.get('/logout', context)
            .then(() => { this.showGuestMenu(); })
            .then(() => {
                setTimeout(function() {
                    context.redirect('#/');
                }, 1000);
            });
    }

    adminAddMovie(context) {
        this.checkIsAdmin(context);

        template.get('add-movie-dashboard')
            .then(template => {
                let html = template();
                context.swap(html);
            });
    }

    adminOrders(context) {
        this.checkIsAdmin(context);

        template.get('orders')
            .then(template => {
                let html = template();
                context.swap(html);
            });
    }

    adminTickets(context) {
        this.checkIsAdmin(context);

        template.get('tickets')
            .then(template => {
                let html = template();
                context.swap(html);
            });
    }

    checkIsAdmin(context) {
        if (context.userType !== 'admin') {
            popUp.alert('admin only');
            context.redirect('#/');
        }
    }

    showUserMenu() {
        $('#menu-user-login').hide();
        $('#menu-user-register').hide();
        $('#menu-user-logout').show();
        $('#header-cart').show();
    }

    showGuestMenu() {
        $('#menu-user-login').show();
        $('#menu-user-register').show();
        $('#menu-user-logout').hide();
        $('#header-cart').hide();
        $('#admin-nav-item').hide();
    }
}

export default UserController;
import 'jquery';
import 'bootstrap';
import Sammy from 'sammy';
import template from 'template';
import cookies from 'scripts/utils/cookies.js';
import popup from 'scripts/utils/pop-up.js';

/* Controllers */
import UserController from 'scripts/controllers/UserController.js';
import MovieController from 'scripts/controllers/MovieController.js';
import CategoryController from 'scripts/controllers/CategoryController.js';
import CartController from 'scripts/controllers/CartController.js';
import OrderController from 'scripts/controllers/OrderController.js';
import TicketController from 'scripts/controllers/TicketController.js';

/* Create controllers and sammy instances */
let userController = new UserController(),
    movieController = new MovieController(),
    categoryController = new CategoryController(),
    cartController = new CartController(),
    orderController = new OrderController(),
    ticketController = new TicketController(),
    app = new Sammy('#sammy-app');

/* movies events */
app.bind('click', function(ev) {
    if (ev.target.id === 'search-btn') {
        let searchedQuery = $('#search-value').val();
        if (searchedQuery !== '') {
            app.setLocation(`#search/${searchedQuery}&${1}&false`);
        } else {
            app.setLocation(`#movies/page/1`);
        }
    }
});

app.bind('click', function(ev) {
    if (ev.target.className === 'page-link') {
        $("html, body").stop().animate({ scrollTop: 0 }, '500', 'swing', function() {});
    }
});

app.bind('click', function(ev) {
    if (ev.target.id === 'add-to-cart-btn') {
        let element = $(ev.target),
            movieId = element.attr('movie-target');

        movieController.get(movieId).then(movie => {
            let cartInfo = JSON.parse(sessionStorage.getItem('cart')) || [];
            cartInfo.push(movie);
            sessionStorage.setItem('cart', JSON.stringify(cartInfo));

            let currentAmount = +$('.total').html().substring(1),
                newAMount = (currentAmount + movie._price).toFixed(2);

            popup.info(`"${movie._title}" is added to cart`);
            $('.total').html(`$${newAMount}`);
        });
    }
});

app.bind('click', function(ev) {
    if (ev.target.id === 'like-btn') {
        let element = $(ev.target),
            currentLikes = element.children('#likes').text().substr(2, 1),
            link = window.location.hash,
            slash = link.indexOf('/'),
            movieId = link.substring(slash + 1);

        movieController.edit().increaseLikes(movieId, +currentLikes + 1)
            .then(success => {
                if (success === 1) {
                    return element.children('#likes').text(`( ${+currentLikes + 1} )`);
                }
            });
    }

    // if (ev.target.id === 'cart-buy-all') {
    //     cartController.add();
    // }
});

app.before({ except: { path: ['#/', '#login', '#register', '#contact', '#find'] } }, context => {
    if (!cookies.get('user')) {
        popup.alert('You must first login.');
        context.redirect('#login');
        return false;
    }

    $('#menu-user-login').hide();
    $('#menu-user-register').hide();
    $('#menu-user-logout').show();
    $('#header-cart').show();

    context.isLogedin = true;
    context.userType = cookies.get('user-type');
    let adminNavItem = $('#admin-nav-item');

    if (context.userType === 'admin') {
        adminNavItem.show();
    } else {
        adminNavItem.hide();
    }
});

app.get('#/', function(con) {
    SetActiveLink('/');
    movieController.getHomeMovies()
        .then((movies) => {
            movieController.attachToTemplate(movies, 'home')
                .then(html => {
                    con.swap(html);
                });
        });
});

app.get('#movies/page/?:page', con => {
    SetActiveLink('movies/page/1');
    let page = +con.params.page;
    movieController.index(page)
        .then(html => {
            con.swap(html);
        });
});

app.get('#movies/:id', con => {
    let movieId = con.params.id;
    movieController.get(movieId)
        .then((movie) => {
            movieController.attachToTemplate(movie, 'single-movie')
                .then(html => {
                    con.swap(html);
                });
        });
});

app.post('#movies', context => {
    movieController.add(context).then(data => {
        popup.info('The movie is added!');
        context.redirect('#movies/page/1');
    });
});

app.get('#search/?:query&:page&:isCategory', con => {
    let query = con.params.query,
        page = +con.params.page,
        isCateg = con.params.isCategory;

    movieController.searchBy(query, page, isCateg).then((html) => {
        con.swap(html);
    });
});

app.get('#categories', con => {
    template.get('category').then(temp => {
        let html = temp({ name: 'Categories' });

        con.swap(html);
    });

    categoryController.index(con);
});

app.get('#categories/:category', con => {
    let categoryName = con.params.category;
    categoryController.searchMoviesByCategory(con, categoryName);
});

/* Cart */
app.get('#cart', con => {
    cartController.getCartMovies(con);
});

/* Order */

app.get('#orders', con => {
    orderController.index(con);
});

app.post('#orders', con => {
    orderController.add(con);
});

/* Ticket */

app.get('#tickets', con => {
    ticketController.index(con);
});

app.post('#tickets', con => {
    ticketController.add(con);
});


/* Contact form */
app.get('#contact', con => {
    template.get('contact').then(temp => {
        SetActiveLink('/contact');

        let html = temp();
        app.swap(html);
    });
});

/* Find us */
app.get('#find', con => {
    template.get('find').then(temp => {
        SetActiveLink('/find');

        let html = temp();
        app.swap(html);
        initMap();
    });
});

/* Register user */
app.get('#register', con => {
    template.get('register').then(temp => {
        let html = temp({ name: 'REGISTER' });
        app.swap(html);
    });
});

app.post('#register', con => {
    userController.add(con);
});

/* Login user */
app.get('#login', con => {
    template.get('login').then(temp => {
        let html = temp({ name: 'LOGIN' });
        app.swap(html);
    });
});

app.post('#login', con => {
    userController.login(con);
});

app.get("#logout", con => {
    userController.logout(con);
});

/* Admin */
app.get('#add-movie', con => {
    userController.adminAddMovie(con);
});

app.get('#orders', con => {
    userController.adminOrders(con);
});

app.get('#tickets', con => {
    userController.adminTickets(con);
});

app.run('#/');

/* Events */
$(document).ready(function() {
    /* Cart items update */
    $('#cart-btn').on('mouseenter', function() {
        cartController.updateCartItems();
    });

    $('#cart-btn').on('mouseover', function() {
        $("#dropdown-cart").css('display', 'block');
    });

    $('#cart-btn').on('mouseout', function() {
        $("#dropdown-cart").css('display', 'none');
    });

    let nav = $('#main-nav');

    nav.on('click', 'a', ev => {
        let element = $(ev.target);

        nav.find('a').removeClass('active');
        element.addClass('active');
    });
});

function SetActiveLink(name) {
    let nav = $('#main-nav');
    nav.find('a').removeClass('active');

    nav.find('a[href="#' + name + '"]').addClass('active');
}

function initMap() {
    let locationTelerik = { lat: 42.6508741, lng: 23.3794893 },
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: locationTelerik
        }),
        marker = new google.maps.Marker({
            position: locationTelerik,
            map: map
        });
}
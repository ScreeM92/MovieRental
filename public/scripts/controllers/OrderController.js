import requester from '../data/requester.js';
import template from 'template';
import cookies from 'scripts/utils/cookies.js';
import popUp from '../utils/pop-up.js';
import 'jquery';

class OrderController {

    index(context) {
        Promise.all([requester.get('/orders'), template.get('orders')])
            .then(([orders, template]) => {
                let obj = { orders: orders },
                    html = template(obj);

                context.swap(html);
            });
    }

    add(context) {
        let currentMoviesInCart = JSON.parse(sessionStorage.getItem('cart')),
            totalAmount = 0,
            titles = [];
        if (currentMoviesInCart === null) {
            currentMoviesInCart = [];
        }

        for (let movies of currentMoviesInCart) {
            totalAmount += +movies._price;
            titles.push(movies._title);
        }

        if (titles.lenght === 0 || totalAmount === 0) {
            popUp.alert('No added movies!')
            return;
        }
        let userId = cookies.get('user'),
            data = {
                titles: titles.join(", "),
                price: totalAmount,
                owner_id: userId
            }
        console.log(data);
        requester.post('/orders', data)
            .then(success => popUp.info('Successfully registered order!'))
            .then(() => {
                setTimeout(function() {
                    context.redirect('#movies/page/1');
                }, 1000);
            })
            .catch(err => popUp.alert(err.responseText));
    }
}

export default OrderController;
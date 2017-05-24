import requester from '../data/requester.js';
import template from 'template';
import cookies from 'scripts/utils/cookies.js';
import popUp from '../utils/pop-up.js';
import 'jquery';

class TicketController {
    index(context) {
        Promise.all([requester.get('/tickets'), template.get('tickets')])
            .then(([tickets, template]) => {
                let obj = { tickets: tickets },
                    html = template(obj);

                context.swap(html);
            });
    }

    add(context) {
        let data = {
            username: context.params.username,
            email: context.params.email,
            description: context.params.description
        };
        console.log(data);
        console.log(context.params);
        requester.post('/tickets', data)
            .then(success => popUp.info('Successfully registered ticket!'))
            .then(() => {
                setTimeout(function() {
                    context.redirect('#movies/page/1');
                }, 1000);
            })
            .catch(err => popUp.alert(err.responseText));
    }
}

export default TicketController;
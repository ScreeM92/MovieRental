let data = require('../../db/data.js');
let Ticket = require('../../db/models/Ticket');

let ticketController = {
    get(req, res) {
        data.getTickets()
            .then(tickets => res.json(tickets))
            .catch(err => { res.status(500).send(err.message) });
    },

    add(req, res) {
        let ticket = new Ticket(req.body.username, req.body.email, req.body.description);

        data.postTicket(ticket)
            .then(data => res.json(data))
            .catch(err => { res.status(500).send(err.message); });
    }
};

module.exports = ticketController;
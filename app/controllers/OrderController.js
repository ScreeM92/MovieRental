let data = require('../../db/data.js');
let Order = require('../../db/models/Order');

let orderController = {
    get(req, res) {
        data.getOrders()
            .then(orders => res.json(orders))
            .catch(err => { res.status(500).send(err.message) });
    },

    add(req, res) {
        let order = new Order(req.body.titles, req.body.price, req.body.owner_id);

        data.postOrder(order)
            .then(data => res.json(data))
            .catch(err => { res.status(500).send(err.message); });
    }
};

module.exports = orderController;
let data = require('../../db/data.js');

let categoryController = {
    get(req, res) {
        data.getCategories()
            .then(categories => res.json(categories))
            .catch(err => { res.status(500).send(err.message) });
    },

    add(req, res) {
        let category = req.body;
        data.postCategory(category)
            .then(data => res.json(data))
            .catch(err => { res.status(500).send(err.message); });
    }
};

module.exports = categoryController;

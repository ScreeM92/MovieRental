let data = require('../../db/data.js');
let User = require('../../db/models/User');
let validator = require('validate-obj');

let usersController = {
    add(req, res) {
        let userData = req.body;

        let validationExpression = {
            firstname: [validator.required, validator.isString],
            lastname: [validator.required, validator.isString],
            email: [validator.required, validator.isEmail],
            password: [validator.isString, validator.required],
            confirm: [validator.isString, validator.required],
            selfCrossValidators: [function(obj) {
                if (obj.password !== obj.confirm) {
                    return 'passwords do not match!';
                }

                return undefined;
            }]
        };

        let validationErrors = validator.hasErrors(userData, validationExpression, 'user');

        if (!validationErrors) {
            try {
                let userType = 'user',
                    firstName = userData['firstname'],
                    lastName = userData['lastname'],
                    email = userData['email'],
                    password = userData['password'];

                let user = new User(userType, firstName, lastName, email, password);

                data.addUser(user)
                    .then(login => {
                        let foundUserPromise = data.checkUserExisting(email, password);

                        foundUserPromise.then(function(foundUser) {
                            res.cookie('user', foundUser._id);
                            res.cookie('user-type', foundUser._userType);
                            res.send();
                        });

                    })
                    .catch(err => { res.send(err); });

            } catch (err) {
                res.status(400).send(err.message)
            }
        } else {
            res.status(400).send({ errors: validationErrors })
        }

    },

    login(req, res) {
        let email = req.body.email,
            pass = req.body.password;

        let userPromise = data.checkUserExisting(email, pass);

        userPromise.then(function(value) {
            let user = value;

            if (user) {
                res.cookie('user', user._id);
                res.cookie('user-type', user._userType);
                res.send();
            } else {
                res.status(400).send('Login failed! Please enter valid credentials.');
            }
        });
    },

    logout(req, res) {
        res.clearCookie('user');
        res.clearCookie('user-type');
        res.redirect('/#/');
    },

};

module.exports = usersController;
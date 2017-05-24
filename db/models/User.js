let validator = require('validator');

class User {
    constructor(userType, firstName, lastName, email, password) {
        this.userType = userType;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    get id() {
        return this._id;
    }

    get userType() {
        return this._userType;
    }

    set userType(value) {
        this._userType = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        if(!validator.isAlpha(value)) {
            throw new Error('Firstname must contain only letters.');
        }

        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        if(!validator.isAlpha(value)) {
            throw new Error('Lastname must contain only letters.');
        }
        
        this._lastName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        if(!validator.isEmail(value)) {
            throw new Error('Firstname must contain only letters.');
        }

        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        if(!validator.isAlphanumeric(value)) {
            throw new Error('Passowrd must be alphanumeric.');
        }

        this._password = value;
    }
}

module.exports = User;
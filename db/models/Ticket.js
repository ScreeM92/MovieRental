class Ticket {
    constructor(username, email, message) {
        this.username = username;
        this.email = email;
        this.message = message;
    }

    get username() {
        return this._username;
    }

    set username(val) {
        if (typeof val !== 'string') {
            throw new Error('Username is not correct!')
        }

        this._username = val;
    }

    get email() {
        return this._email;
    }

    set email(val) {
        if (typeof val !== 'string') {
            throw new Error('Email is not correct!')
        }

        this._email = val;
    }

    get message() {
        return this._message;
    }

    set message(val) {
        if (typeof val !== 'string') {
            throw new Error('Message is not correct!')
        }

        this._message = val;
    }
}

module.exports = Ticket;
class Order {
    constructor(titles, price, ownerId) {
        this.titles = titles;
        this.price = price;
        this.ownerId = ownerId;
    }

    get titles() {
        return this._titles;
    }

    set titles(val) {
        if (typeof val !== 'string') {
            throw new Error('Movie titles are not correct!')
        }

        this._titles = val;
    }

    get price() {
        return this._price;
    }

    set price(val) {
        if (typeof val !== 'number') {
            throw new Error('Movie price is not correct!')
        }

        this._price = val;
    }

    get ownerId() {
        return this._ownerId;
    }

    set ownerId(value) {
        this._ownerId = value;
    }
}

module.exports = Order;
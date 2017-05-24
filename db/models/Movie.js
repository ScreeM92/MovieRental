class Movie {
    constructor(title, director, year, category, description, imgURL, price, ownerId) {
        this.title = title;
        this.director = director;
        this.year = year;
        this.category = category;
        this.description = description;
        this.imgURL = imgURL;
        this.ownerId = ownerId;
        this.price = price;
        this.likes = 0;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        if (value.length < 2) {
            throw "Title must be at least two symbols";
        }
        this._title = value;
    }

    get director() {
        return this._director;
    }

    set director(value) {
        this._director = value;
    }

    get year() {
        return this._year;
    }

    set year(value) {
        this._year = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get imgURL() {
        return this._imgURL;
    }

    set imgURL(value) {
        this._imgURL = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get ownerId() {
        return this._ownerId;
    }
    set ownerId(value) {
        this._ownerId = value;
    }

    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
}
module.exports = Movie;
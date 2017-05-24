class Category {
    constructor(name) {
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(val) {
        if (typeof val !== 'string') {
            throw new Error('Category name is not correct!')
        }

        this._name = val;
    }
}

function getNewCategory(name) {
    return new Category(name);
}

module.exports = getNewCategory;

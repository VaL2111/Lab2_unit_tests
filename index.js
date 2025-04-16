class ArrayCharList {
    constructor() {
        this.items = [];
    }

    length() {
        return this.items.length;
    }

    add(char) {
        this._validateChar(char);
        this.items.push(char);
    }

    insert(char, index) {
        this._validateChar(char);
        this._validateInsetIndex(index);
        this.items.splice(index, 0, char);
    }

    removeAt(index) {
        this._validateAccessIndex(index);
        return this.items.splice(index, 1)[0];
    }

    removeAll(char) {
        this._validateChar(char);
        this.items = this.items.filter((item) => item !== char);
    }

    get(index) {
        this._validateAccessIndex(index);
        return this.items[index];
    }

    copy() {
        const newList = new ArrayCharList();
        newList.items = [...this.items];
        return newList;
    }

    reverse() {
        this.items.reverse();
    }

    indexOf(char) {
        this._validateChar(char);
        return this.items.indexOf(char);
    }

    lastIndexOf(char) {
        this._validateChar(char);
        return this.items.lastIndexOf(char);
    }

    clear() {
        this.items = [];
    }

    extend(otherList) {
        if (!(otherList instanceof ArrayCharList)) {
            throw new Error("Argument must be an instance of ArrayCharList");
        }
        this.items = this.items.concat([...otherList.items]);
    }

    _validateChar(char) {
        if (
            typeof char !== "string" ||
            char.length !== 1 ||
            !/[a-zA-Z]/.test(char)
        ) {
            throw new Error("Only single alphabetic character are allowed");
        }
    }

    _validateInsetIndex(index) {
        if (index < 0 || index > this.items.length) {
            throw new Error("Invalid index");
        }
    }

    _validateAccessIndex(index) {
        if (index < 0 || index >= this.items.length) {
            throw new Error("Invalid index");
        }
    }
}

module.exports = ArrayCharList;

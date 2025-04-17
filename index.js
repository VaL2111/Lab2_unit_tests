class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class CircularLinkedCharList {
    constructor() {
        this.head = null;
        this._length = 0;
    }

    get length() {
        return this._length;
    }

    add(char) {
        this._validateChar(char);
        const newNode = new Node(char);

        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
        } else {
            let current = this.head;
            while (current.next !== this.head) {
                current = current.next;
            }
            current.next = newNode;
            newNode.next = this.head;
        }

        this._length++;
    }

    insert(char, index) {
        if (index < 0 || index > this._length) {
            throw new Error("Invalid index");
        }

        this._validateChar(char);
        const newNode = new Node(char);

        if (index === 0) {
            if (!this.head) {
                this.head = newNode;
                newNode.next = newNode;
            } else {
                let tail = this.head;
                while (tail.next !== this.head) {
                    tail = tail.next;
                }
                newNode.next = this.head;
                this.head = newNode;
                tail.next = this.head;
            }
        } else {
            let prev = this.head;
            for (let i = 0; i < index - 1; i++) {
                prev = prev.next;
            }
            newNode.next = prev.next;
            prev.next = newNode;
        }

        this._length++;
    }

    removeAt(index) {
        this._validateIndex(index);
        let removedValue;

        if (index === 0) {
            removedValue = this.head.value;

            if (this._length === 1) {
                this.head = null;
            } else {
                let last = this.head;
                while (last.next !== this.head) {
                    last = last.next;
                }

                this.head = this.head.next;
                last.next = this.head;
            }
        } else {
            let prev = this.head;
            for (let i = 0; i < index - 1; i++) {
                prev = prev.next;
            }

            removedValue = prev.next.value;
            prev.next = prev.next.next;
        }

        this._length--;
        return removedValue;
    }

    removeAll(char) {
        this._validateChar(char);
        if (!this.head) return;

        let current = this.head;
        let prev = null;
        let removed = false;
        let count = this._length;
        let i = 0;

        while (i < count) {
            if (current.value === char) {
                if (current === this.head) {
                    this.removeAt(0);
                    current = this.head;
                } else {
                    prev.next = current.next;
                    this._length--;
                    current = prev.next;
                }
                removed = true;
            } else {
                prev = current;
                current = current.next;
                i++;
            }

            if (this._length === 0) break;
        }

        return removed;
    }

    get(index) {
        this._validateIndex(index);
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.value;
    }

    copy() {
        const newList = new CircularLinkedCharList();
        if (!this.head) return newList;

        let current = this.head;
        do {
            newList.add(current.value);
            current = current.next;
        } while (current !== this.head);

        return newList;
    }

    reverse() {
        if (!this.head || this._length < 2) return;

        let prev = null;
        let current = this.head;
        const start = this.head;

        do {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        } while (current !== start);

        start.next = prev;
        this.head = prev;
    }

    indexOf(char) {
        this._validateChar(char);
        if (!this.head) return -1;

        let current = this.head;
        let index = 0;

        do {
            if (current.value === char) return index;
            current = current.next;
            index++;
        } while (current !== this.head);

        return -1;
    }

    lastIndexOf(char) {
        this._validateChar(char);
        if (!this.head) return -1;

        let current = this.head;
        let index = 0;
        let lastIndex = -1;

        do {
            if (current.value === char) lastIndex = index;
            current = current.next;
            index++;
        } while (current !== this.head);

        return lastIndex;
    }

    clear() {
        this.head = null;
        this._length = 0;
    }

    extend(otherList) {
        if (!(otherList instanceof CircularLinkedCharList)) {
            throw new Error("Expected another CircularLinkedCharList");
        }

        if (!otherList.head) return;

        let current = otherList.head;
        let start = current;

        do {
            this.add(current.value);
            current = current.next;
        } while (current !== start);
    }

    _validateChar(char) {
        if (!/[a-zA-Z]/.test(char)) {
            throw new Error("Invalid character");
        }
    }

    _validateIndex(index) {
        if (index < 0 || index >= this._length) {
            throw new Error("Invalid index");
        }
    }
}

module.exports = CircularLinkedCharList;

const ArrayCharList = require("./index");

describe("ArrayCharList", () => {
    let list;

    beforeEach(() => {
        list = new ArrayCharList();
    });

    test("length() returns 0 for empty list", () => {
        expect(list.length()).toBe(0);
    });

    test("add() adds a character to the end", () => {
        list.add("a");
        expect(list.length()).toBe(1);
        expect(list.get(0)).toBe("a");
    });

    test("insert() inserts at a valid position", () => {
        list.add("a");
        list.add("b");
        list.insert("c", 1);
        expect(list.get(1)).toBe("c");
    });

    test("insert() throws for invalid index", () => {
        expect(() => list.insert("a", -1)).toThrow();
        expect(() => list.insert("b", 1)).toThrow();
    });

    test("removeAt() removes and returns the character", () => {
        list.add("x");
        const removed = list.removeAt(0);
        expect(removed).toBe("x");
        expect(list.length()).toBe(0);
    });

    test("removedAt() throws for invalid index", () => {
        expect(() => list.removeAt(0)).toThrow();
    });

    test("removeAll() removes all matching characters", () => {
        list.add("a");
        list.add("b");
        list.add("a");
        list.removeAll("a");
        expect(list.length()).toBe(1);
        expect(list.get(0)).toBe("b");
    });

    test("get() returns element at index", () => {
        list.add("x");
        expect(list.get(0)).toBe("x");
    });

    test("get() throw for invalid index", () => {
        expect(() => list.get(0)).toThrow();
    });

    test("copy() creates a deep copy", () => {
        list.add("m");
        const copy = list.copy();
        expect(copy.get(0)).toBe("m");
        copy.add("n");
        expect(list.length()).toBe(1);
    });

    test("reverse() reverses the list", () => {
        list.add("a");
        list.add("b");
        list.add("c");
        list.reverse();
        expect(list.get(0)).toBe("c");
        expect(list.get(2)).toBe("a");
    });

    test("indexOf() returns first match index or -1", () => {
        list.add("a");
        list.add("b");
        list.add("a");
        expect(list.indexOf("a")).toBe(0);
        expect(list.indexOf("c")).toBe(-1);
    });

    test("lastIndexOf() returns last match index or -1", () => {
        list.add("a");
        list.add("b");
        list.add("a");
        expect(list.lastIndexOf("a")).toBe(2);
        expect(list.lastIndexOf("c")).toBe(-1);
    });

    test("clear() empties the list", () => {
        list.add("x");
        list.clear();
        expect(list.length()).toBe(0);
    });

    test("extend() appends another list", () => {
        list.add("a");
        const other = new ArrayCharList();
        list.add("b");
        list.add("c");
        list.extend(other);
        expect(list.length()).toBe(3);
        expect(list.get(1)).toBe("b");
        expect(list.get(2)).toBe("c");

        other.add("d");
        expect(list.length()).toBe(3);
    });

    test("extend() throws if argument is not ArrayCharList", () => {
        expect(() => list.extend({ items: ["x"] })).toThrow();
    });
});

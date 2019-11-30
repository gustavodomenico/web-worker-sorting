import InsertionSort from "./InsertionSort";

const algorithm = new InsertionSort();

it("sorts the array", () => {
    const input = [5, 2, 2, 1, 3];
    const expected = [1, 2, 2, 3, 5];

    expect(algorithm.run(input, 0, input.length)).toEqual(expected);
});

it("sorts the array from a specific index", () => {
    const input = [5, 2, 8, 1, 3];
    const expected = [1, 5, 2, 3, 8];

    expect(algorithm.run(input, 2, input.length)).toEqual(expected);
});

it("sorts the array from an index with a specific step", () => {
    const input = [5, 14, 2, 1, 3, 7, 12, 6];
    const expected = [1, 2, 3, 5, 14, 7, 12, 6];

    expect(algorithm.run(input, 1, 4)).toEqual(expected);
});

it("works on empty arrays", () => {
    const input = [];
    const expected = [];

    expect(algorithm.run(input)).toEqual(expected);
});

it("calls the on progress callback for each index", () => {
    let callback = jest.fn();

    algorithm.run([1, 2, 3], 0, 3, callback);

    expect(callback).toHaveBeenCalledTimes(3);
});
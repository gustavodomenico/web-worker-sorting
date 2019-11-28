import InsertionSort from "./InsertionSort";

it('sorts the array', () => {
    const input = [5, 2, 2, 1, 3];
    const output = [1, 2, 2, 3, 5];

    expect(InsertionSort.sort(input)).toEqual(output);
});

it('sorts the array from a specific index', () => {
    const input = [5, 2, 2, 1, 3];
    const output = [5, 1, 2, 2, 3];

    expect(InsertionSort.sortFromIndex(input, 1)).toEqual(output);
});

it('sorts the array from an index until a specific range', () => {
    const input = [5, 14, 2, 1, 3, 7, 12, 6];
    const output = [5, 1, 2, 3, 14, 7, 12, 6];

    expect(InsertionSort.sortStepping(input, 1, 4)).toEqual(output);
});

it('works on empty arrays', () => {
    const input = [];
    const output = [];

    expect(InsertionSort.sortFromIndex(input)).toEqual(output);
});

it('works on empty arrays', () => {
    const input = [];
    const output = [];

    expect(InsertionSort.sortFromIndex(input)).toEqual(output);
});
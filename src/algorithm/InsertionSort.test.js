import InsertionSort from "./InsertionSort";

it('sorts the array', () => {
    const input = [5, 2, 2, 1, 3];
    const output = [1, 2, 2, 3, 5];

    expect(InsertionSort.sort(input)).toEqual(output);
});

it('sorts the array from a specific index', () => {
    const input = [5, 2, 2, 1, 3];
    const output = [5, 1, 2, 2, 3];

    expect(InsertionSort.sortFrom(input, 1)).toEqual(output);
});

it('works on emty arrays', () => {
    const input = [];
    const output = [];

    expect(InsertionSort.sortFrom(input)).toEqual(output);
});
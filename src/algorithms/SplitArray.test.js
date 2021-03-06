import SplitArray from "./SplitArray";

const splitArray = new SplitArray();

it("splits even arrays", () => {
    const input = [1, 2, 3, 4, 5, 6];
    const expected = [[1, 2], [3, 4], [5, 6]];

    expect(splitArray.run(input, 3)).toEqual(expected);
});

it("splits odd arrays", () => {
    const input = [1, 2, 3, 4, 5, 6, 7];
    const expected = [[1, 2, 3], [4, 5], [6, 7]];

    expect(splitArray.run(input, 3)).toEqual(expected);
});


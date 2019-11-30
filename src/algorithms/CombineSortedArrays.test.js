import CombineSortedArrays from "./CombineSortedArrays";

it("combines multiple arrays", () => {
    const inputs = [
        [1, 2, 3],
        [2, 3, 4],
        [1, 3, 5]
    ];
    const expected = [1, 1, 2, 2, 3, 3, 3, 4, 5];

    expect(CombineSortedArrays.run(inputs)).toEqual(expected);
});



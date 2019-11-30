import IsArraySorted from "./IsArraySorted";

const isArraySorted = new IsArraySorted();

it("returns true for a sorted array", () => {
    const input = [5, 8, 12, 41, 55];

    expect(isArraySorted.run(input)).toBeTruthy();
});

it("returns false for a not sorted array", () => {
    const input = [5, 2, 8, 1, 3];

    expect(isArraySorted.run(input)).toBeFalsy();
});

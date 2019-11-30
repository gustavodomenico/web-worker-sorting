import IsArraySorted from "./IsArraySorted";

it("returns true for a sorted array", () => {
    const input = [5, 8, 12, 41, 55];

    expect(IsArraySorted.run(input)).toBeTruthy();
});

it("returns false for a not sorted array", () => {
    const input = [5, 2, 8, 1, 3];

    expect(IsArraySorted.run(input)).toBeFalsy();
});

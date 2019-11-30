import InsertionSort from "../algorithms/InsertionSort";
import ExecutionContext from "./ExecutionContext";
import Configuration from "../common/Configuration";

jest.mock("../algorithms/InsertionSort");

describe("context execution", () => {
    beforeAll(() => {
        jest.useFakeTimers()
    });

    afterAll(() => {
        jest.useRealTimers()
    });

    const executionContext = new ExecutionContext();

    it("calls the callbacks", () => {
        const array = Configuration.createArray();
        const handleProgress = jest.fn(), handleDone = jest.fn();

        executionContext.run(array, handleProgress, handleDone);

        expect(setInterval).toHaveBeenCalled();

        jest.runAllTimers();

        expect(InsertionSort).toHaveBeenCalled();
        expect(handleDone).toHaveBeenCalled();
        expect(clearInterval).toHaveBeenCalled();
    });

    it("pauses the execution", () => {
        executionContext.pause();
        expect(executionContext.paused).toBeTruthy();
    });

    it("resumes the execution", () => {
        executionContext.resume();
        expect(executionContext.paused).toBeFalsy();
    });

    it("adds new number to array", () => {
        const handleNewNumberAdded = jest.fn();
        executionContext.add({value: 100}, handleNewNumberAdded);

        expect(executionContext.array[executionContext.array.length - 1]).toEqual(100);
        expect(handleNewNumberAdded).toHaveBeenCalled();
    });
});


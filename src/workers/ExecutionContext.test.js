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
    const array = Configuration.createArray();
    const handleProgress = jest.fn(), handleDone = jest.fn();

    it("calls the callbacks", () => {
        executionContext.run(array, handleProgress, handleDone);

        expect(setInterval).toHaveBeenCalled();

        jest.runAllTimers();

        expect(InsertionSort).toHaveBeenCalled();
        expect(handleDone).toHaveBeenCalled();
    });
});


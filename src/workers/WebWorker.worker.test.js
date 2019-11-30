import Messages from "../common/Messages";
import messageHandler from "./WebWorker.worker";
import ExecutionContext from "./ExecutionContext";

jest.mock("./ExecutionContext");

describe("message handling", () => {
    let mockedContext = new ExecutionContext();

    it("starts the execution context", () => {
        messageHandler(mockedContext)({data: {message: Messages.START}});
        expect(mockedContext.run).toHaveBeenCalledTimes(1);
    });

    it("pauses the execution context", () => {
        messageHandler(mockedContext)({data: {message: Messages.PAUSE}});
        expect(mockedContext.pause).toHaveBeenCalledTimes(1);
    });

    it("resumes the execution context", () => {
        messageHandler(mockedContext)({data: {message: Messages.RESUME}});
        expect(mockedContext.resume).toHaveBeenCalledTimes(1);
    });

    it("adds number the execution context", () => {
        messageHandler(mockedContext)({data: {message: Messages.ADD_NUMBER}});
        expect(mockedContext.add).toHaveBeenCalledTimes(1);
    });
});


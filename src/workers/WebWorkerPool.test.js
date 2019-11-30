import WebWorkerPool from "./WebWorkerPool";
import Configuration from "../common/Configuration";
import Messages from "../common/Messages";

describe("worker pool management", () => {
    beforeAll(() => {
        jest.useFakeTimers()
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    const webWorkerPool = new WebWorkerPool();
    const numberOfWorkers = 2;
    const workers = Configuration.createWorkers(numberOfWorkers, true);

    const handleWorkerDone = jest.fn();
    const handleWorkerProgress = jest.fn();
    const handleWorkerUpdated = jest.fn();

    const webWorkerMock = {
        postMessage: jest.fn(),
        terminate: jest.fn()
    };

    it("starts the workers", () => {
        webWorkerPool.start(workers, 1, handleWorkerDone, handleWorkerProgress, handleWorkerUpdated, webWorkerMock);
        expect(webWorkerMock.postMessage).toBeCalledTimes(numberOfWorkers);
    });

    it("terminates when workers are done", () => {
        webWorkerMock.onmessage({data: {message: Messages.DONE}});

        expect(handleWorkerDone).toBeCalled();
        expect(webWorkerMock.terminate).toHaveBeenCalled();
        expect(clearInterval).toHaveBeenCalled();
    });

    it("calls on progress callback on message", () => {
        webWorkerMock.onmessage({data: {message: Messages.PROGRESS}});
        expect(handleWorkerProgress).toHaveBeenCalled();
    });

    it("calls on updated callback on message", () => {
        webWorkerMock.onmessage({data: {message: Messages.ACKNOWLEDGE}});
        expect(handleWorkerUpdated).toHaveBeenCalled();
    });

    it("terminates workers when stopping", () => {
        webWorkerMock.terminate.mockClear();

        webWorkerPool.stop();
        expect(webWorkerMock.terminate).toHaveBeenCalled();
        expect(clearInterval).toHaveBeenCalled();
    });

    it("sends message when pausing", () => {
        webWorkerMock.postMessage.mockClear();

        webWorkerPool.pause(0);
        expect(webWorkerMock.postMessage).toHaveBeenCalled();
    });

    it("sends message when resuming", () => {
        webWorkerMock.postMessage.mockClear();

        webWorkerPool.resume(0);
        expect(webWorkerMock.postMessage).toHaveBeenCalled();
    });

    it("has set the timer to send messages", () => {
        expect(setInterval).toHaveBeenCalled();
    });
});


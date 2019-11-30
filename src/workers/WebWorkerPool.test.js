import WebWorkerPool from "./WebWorkerPool";
import Configuration from "../common/Configuration";
import Messages from "../common/Messages";

jest.useFakeTimers();

describe("worker pool management", () => {
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

    it("should start the workers", () => {
        webWorkerPool.start(workers, 1, handleWorkerDone, handleWorkerProgress, handleWorkerUpdated, webWorkerMock);
        expect(webWorkerMock.postMessage).toBeCalledTimes(numberOfWorkers);
    });

    it("should terminate when workers are done", () => {
        webWorkerMock.onmessage({data: {message: Messages.DONE}});

        expect(handleWorkerDone).toBeCalled();
        expect(webWorkerMock.terminate).toHaveBeenCalled();
        expect(clearInterval).toHaveBeenCalled();
    })

    it("should call on progress callback on message", () => {
        webWorkerMock.onmessage({data: {message: Messages.PROGRESS}});
        expect(handleWorkerProgress).toHaveBeenCalled();
    });

    it("should call on updated callback on message", () => {
        webWorkerMock.onmessage({data: {message: Messages.UPDATED}});
        expect(handleWorkerUpdated).toHaveBeenCalled();
    });

    it("should terminate workers when stopping", () => {
        webWorkerMock.terminate.mockClear();

        webWorkerPool.stop();
        expect(webWorkerMock.terminate).toHaveBeenCalled();
        expect(clearInterval).toHaveBeenCalled();
    });

    it("should send message when pausing", () => {
        webWorkerMock.postMessage.mockClear();

        webWorkerPool.pause(0);
        expect(webWorkerMock.postMessage).toHaveBeenCalled();
    });

    it("should send message when resuming", () => {
        webWorkerMock.postMessage.mockClear();

        webWorkerPool.resume(0);
        expect(webWorkerMock.postMessage).toHaveBeenCalled();
    });

    it("should have set the timer to send messages", () => {
        expect(setInterval).toHaveBeenCalled();
    });
});


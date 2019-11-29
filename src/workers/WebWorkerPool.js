import Messages from "../common/Messages";
import Configuration from "../common/Configuration";

// eslint-disable-next-line import/no-webpack-loader-syntax
import WebWorker from "worker-loader!../workers/WebWorker.worker.js";

export default class WebWorkerPool {
    constructor() {
        this.workers = [];
        this.clocks = [];
    }

    start(workersCount, array, newNumberInterval, onWorkerDone, onWorkerProgress, onWorkerUpdated) {
        const self = this;

        this.workers = [...Array(workersCount).keys()].map((n) => {
            const w = WebWorker();
            w.postMessage({message: Messages.START, array: array});

            const messageCallbacks = new Map([
                [Messages.DONE, (n, m) => {
                    w.terminate();
                    clearInterval(self.clocks[n]);
                    onWorkerDone(n, m);
                }],
                [Messages.PROGRESS, (n, m) => onWorkerProgress(n, m)],
                [Messages.UPDATED, (n, m) => onWorkerUpdated(n, m)]
            ]);

            w.onmessage = (m) => {
                if (messageCallbacks.has(m.data.message))
                    messageCallbacks.get(m.data.message)(n, m);
            };

            let clock = setInterval(function () {
                w.postMessage({
                    message: Messages.ADD_NUMBER,
                    value: Math.floor((Math.random() * Configuration.ARRAY_SIZE))
                });
            }, newNumberInterval);

            self.clocks.push(clock);

            return w;
        });
    }

    stop() {
        this.clocks.forEach((c) => clearInterval(c));
        this.workers.forEach((w) => w.terminate());
    }

    pause(id) {
        this.workers[id].postMessage({message: Messages.PAUSE});
    }

    resume(id) {
        this.workers[id].postMessage({message: Messages.RESUME});
    }
}

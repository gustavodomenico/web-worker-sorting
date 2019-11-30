import Messages from "../common/Messages";
import Configuration from "../common/Configuration";

// eslint-disable-next-line import/no-webpack-loader-syntax
import WebWorker from "worker-loader!../workers/WebWorker.worker.js";

export default class WebWorkerPool {
    constructor() {
        this.webWorkers = [];
        this.clocks = [];
    }

    start(workers, newNumberInterval, onWorkerDone, onWorkerProgress, onWorkerUpdated) {
        const self = this;

        this.webWorkers = workers.map(worker => {
            const w = WebWorker();
            w.postMessage({message: Messages.START, array: worker.originalArray});

            const messageCallbacks = new Map([
                [Messages.DONE, (n, m) => {
                    w.terminate();
                    clearInterval(self.clocks[n]);
                    onWorkerDone(n, m);
                }],
                [Messages.PROGRESS, (n, m) => onWorkerProgress(n, m)],
                [Messages.UPDATED, (n, m) => onWorkerUpdated(n, m)]
            ]);

            w.onmessage = m => {
                if (messageCallbacks.has(m.data.message))
                    messageCallbacks.get(m.data.message)(worker.id, m);
            };

            const clock = setInterval(function () {
                w.postMessage({
                    message: Messages.ADD_NUMBER,
                    timestamp: Date.now(),
                    value: Math.floor((Math.random() * Configuration.ARRAY_SIZE))
                });
            }, newNumberInterval);

            self.clocks.push(clock);

            return w;
        });
    }

    stop() {
        this.clocks.forEach(c => clearInterval(c));
        this.webWorkers.forEach(w => w.terminate());
    }

    pause(id) {
        this.webWorkers[id].postMessage({message: Messages.PAUSE});
    }

    resume(id) {
        this.webWorkers[id].postMessage({message: Messages.RESUME});
    }
}

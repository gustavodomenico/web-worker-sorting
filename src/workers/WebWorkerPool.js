import Messages from "../common/Messages";

// eslint-disable-next-line import/no-webpack-loader-syntax
import WebWorker from "worker-loader!../workers/WebWorker.worker.js";

export default class WebWorkerPool {
    constructor() {
        this.workers = [];
    }

    start(workersCount, array, onWorkerDone, onWorkerProgress) {
        this.workers = [...Array(workersCount).keys()].map((n) => {
            const w = WebWorker();
            w.postMessage({message: Messages.START, array: array});

            const messageCallbacks = new Map([
                [Messages.DONE, (n, e) => {
                    w.terminate();
                    onWorkerDone(n, e);
                }],
                [Messages.PROGRESS, (n, e) => onWorkerProgress(n, e)]
            ]);

            w.onmessage = (m) => {
                if (messageCallbacks.has(m.data.message))
                    messageCallbacks.get(m.data.message)(n, m);
            };

            return w;
        });
    }

    stop() {
        this.workers.forEach((w) => w.terminate());
    }

    pause(id) {
        this.workers[id].postMessage({message: Messages.PAUSE});
    }

    resume(id) {
        this.workers[id].postMessage({message: Messages.RESUME});
    }
}

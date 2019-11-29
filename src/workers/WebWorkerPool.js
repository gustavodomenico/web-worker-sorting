// eslint-disable-next-line import/no-webpack-loader-syntax
import WebWorker from "worker-loader!../workers/WebWorker.worker.js";

export default class WebWorkerPool {
    constructor() {
        this.workers = [];
    }

    start(workersCount) {
        this.workers = [...Array(workersCount).keys()].map((n) => WebWorker());
    }

    stop() {
        this.workers.forEach((w) => w.terminate());
    }
}

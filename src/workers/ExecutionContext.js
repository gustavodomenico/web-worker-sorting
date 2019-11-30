import InsertionSort from "../algorithms/InsertionSort";
import Configuration from "../common/Configuration";

export default class ExecutionContext {
    constructor() {
        this.paused = false;
        this.array = [];
        this.algorithm = new InsertionSort();
    }

    run(array, onProgress, onDone) {
        this.array = array;

        const self = this;

        // The only way to listen to new messages is doing the sorting in chunks
        // and process the new messages in between
        let busy = false;
        let index = 0;
        const processor = setInterval(function () {
            if (!busy && !self.paused) {
                busy = true;
                self.algorithm.run(self.array, index, Configuration.CHUNK_SIZE, onProgress);
                index += Configuration.CHUNK_SIZE;

                if (index >= self.array.length) {
                    clearInterval(processor);
                    if(onDone) onDone(self.array);
                }
                busy = false;
            }
        }, Configuration.POLLING_INTERVAL);
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    add(data, onNewNumberAdded) {
        // Given the nature of the single thread execution of the worker, we don"t need to pause it,
        // if this method is being processed, is because the sorting is not running
        this.array.push(data.value);
        onNewNumberAdded(this.array, data.timestamp);
    }
}

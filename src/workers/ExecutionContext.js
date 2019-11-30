import InsertionSort from "../algorithms/InsertionSort";
import Configuration from "../common/Configuration";

export default class ExecutionContext {
    constructor() {
        this.paused = false;
        this.array = [];
    }

    run(array, onProgress, onFinished) {
        this.array = array;

        let busy = false;
        let index = 0;

        // The only way to listen to new messages is doing the sorting in chunks
        // and process the new messages in between
        let self = this;
        const processor = setInterval(function () {
            if (!busy && !self.paused) {
                busy = true;
                InsertionSort.run(self.array, index, Configuration.CHUNK_SIZE, onProgress);
                index += Configuration.CHUNK_SIZE;

                if (index >= self.array.length) {
                    clearInterval(processor);
                    if(onFinished) onFinished(self.array);
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

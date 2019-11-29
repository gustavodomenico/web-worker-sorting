import InsertionSort from "../algorithm/InsertionSort";

export default class ExecutionContext {
    constructor() {
        this.paused = false;
        this.array = [];
    }

    run(array, onProgress, onFinished) {
        this.array = array;

        let busy = false;
        let index = 0;
        let self = this;

        const processor = setInterval(function () {
            if (!busy && !self.paused) {
                busy = true;
                InsertionSort.sortStepping(self.array, index, 5000, onProgress);
                index += 5000;
                if (index >= self.array.length) {
                    clearInterval(processor);
                    onFinished(self.array);
                }
                busy = false;
            }
        }, 500);
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    add(number) {
        this.array.push(number);
    }
}

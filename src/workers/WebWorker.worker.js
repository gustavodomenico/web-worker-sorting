import InsertionSort from "../algorithm/InsertionSort";

let paused = false;
let array = [];

onmessage = function (e) {
    switch (e.data.message) {
        case "start":
            array = e.data.array;

            postMessage({message: "Working"});

            const onProgress = (index) => {
                if ((index + 1) % 5000 === 0)
                    postMessage({message: "progress", value: index + 1});
            };

            let busy = false;
            let index = 0;
            const processor = setInterval(function () {
                if (!busy && !paused) {
                    busy = true;
                    InsertionSort.sortStepping(array, index, 5000, onProgress)
                    index += 5000;
                    if (index >= array.length) {
                        clearInterval(processor);
                        postMessage({message: "end", value: array});
                    }
                    busy = false;
                }
            }, 500);
            break;

        case "pause":
            postMessage({message: "Paused"});
            paused = true;
            break;

        case "resume":
            postMessage({message: "Working"});
            paused = false;
            break;

        case "add":
            array.push(1);
            break;

        default:
            break;
    }
};

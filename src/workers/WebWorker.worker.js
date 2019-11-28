import InsertionSort from "../algorithm/InsertionSort";

let currentIndex = 0;
let terminate = false;
let paused = false;
let array = [];

onmessage = function (e) {
    switch (e.data.message) {
        case "start":
            postMessage({message: "Started"});

            const watcher = {
                onProgress: (index) => {
                    currentIndex = index;
                    if ((index + 1) % 5000 === 0) postMessage({message: "progress", value: index + 1});
                },

                terminate: () => terminate,
                paused: () => paused
            };

            array = e.data.array;

            let index = 0;
            let busy = false;

            const processor = setInterval(function () {
                if (!busy && !paused) {
                    busy = true;
                    InsertionSort.sortFromUntil(array, index, 5000, watcher)
                    index += 5000;
                    if (index >= array.length) {
                        clearInterval(processor);
                        postMessage({message: "Finished"});
                    }
                    busy = false;
                }
            }, 500);

            // InsertionSort.sortFromUntil(array, 5000, 10000, watcher)

            // array = e.data.array;
            // let busy = false;
            // let processor = setInterval(function () {
            //     if (!busy) {
            //         busy = true;
            //         InsertionSort.sort(array, watcher);
            //         postMessage({message: "progress", value: 100000});
            //         postMessage({message: "Finished"});
            //     }
            // }, 500);

            console.log("moved on");
            break;

        case "pause":
            console.log("pause received");
            paused = true;
            break;

        case "resume":
            console.log("resume received");
            paused = false;
            break;

        default:
            break;
    }
};

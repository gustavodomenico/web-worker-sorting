import InsertionSort from "../algorithm/InsertionSort";

let paused = false;
let array = [];

onmessage = function (e) {
    switch (e.data.message) {
        case "start":
            postMessage({message: "Started"});

            const watcher = {
                onProgress: (index) => {
                    if ((index + 1) % 5000 === 0)
                        postMessage({message: "progress", value: index + 1});
                },
            };

            array = e.data.array;

            let index = 0;
            let busy = false;
            const processor = setInterval(function () {
                if (!busy && !paused) {
                    busy = true;
                    InsertionSort.sortStepping(array, index, 5000, watcher)
                    index += 5000;
                    if (index >= array.length) {
                        clearInterval(processor);
                        postMessage({message: "Finished"});
                    }
                    busy = false;
                }
            }, 500);
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

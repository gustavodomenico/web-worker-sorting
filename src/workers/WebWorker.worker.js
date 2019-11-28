import InsertionSort from "../algorithm/InsertionSort";

onmessage = function (e) {
    switch (e.data.message) {
        case "start":
            postMessage({message: "Started"});
            let result = InsertionSort.sort(e.data.array);
            postMessage({message: "Finished"});
            break;

        default:
            break;
    }
};

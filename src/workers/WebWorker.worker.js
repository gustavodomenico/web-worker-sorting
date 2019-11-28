import InsertionSort from "../algorithm/InsertionSort";

onmessage = function (e) {
    switch (e.data.message) {
        case "start":
            console.log("start");
            let result = InsertionSort.sort(e.data.array);
            console.log("end");
            postMessage(result);
            break;

        default:
            break;
    }
};

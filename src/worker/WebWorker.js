import InsertionSort from "../algorithm/InsertionSort";

export default () => {
    onmessage = function (e) {
        switch (e.data.message) {
            case "start":
                let result = InsertionSort.sort(e.data.array);
                postMessage(result);
                break;

            default:
                break;
        }
    };
}
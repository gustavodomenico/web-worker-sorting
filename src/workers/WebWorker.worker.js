import ExecutionContext from "./ExecutionContext";
import Messages from "../common/Messages";

let context = new ExecutionContext();

onmessage = function (e) {
    switch (e.data.message) {
        case Messages.START:
            const onProgress = (index) => {
                if ((index + 1) % 5000 === 0)
                    postMessage({message: Messages.PROGRESS, value: index + 1});
            };

            const onFinished = (array) => {
                postMessage({message: Messages.FINISHED, value: array});
            };

            context.run(e.data.array, onProgress, onFinished);

            break;

        case Messages.PAUSE:
            context.pause();
            break;

        case Messages.RESUME:
            context.resume();
            break;

        case Messages.ADD_NUMBER:
            context.add(1);
            break;

        default:
            break;
    }
};

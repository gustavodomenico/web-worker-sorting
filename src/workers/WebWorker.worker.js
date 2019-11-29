import ExecutionContext from "./ExecutionContext";
import Messages from "../common/Messages";

function messageHandler(context) {
    return function (e) {
        const onProgress = (index) => {
            if ((index + 1) % 5000 === 0)
                postMessage({message: Messages.PROGRESS, value: index + 1});
        };

        const onFinished = (array) => {
            postMessage({message: Messages.FINISHED, value: array});
        };

        const messageCallbacks = new Map([
            [Messages.START, (data) => context.run(data.array, onProgress, onFinished)],
            [Messages.PAUSE, () => context.pause()],
            [Messages.RESUME, () => context.resume()],
            [Messages.ADD_NUMBER, (data) => context.add(data.value)]
        ]);

        messageCallbacks.get(e.data.message)(e.data);
    }
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = messageHandler(new ExecutionContext());

// I am not very familiar with javascript/babel modules, the line below was to make the unit testing possible
if (module.exports)
    module.exports = messageHandler;
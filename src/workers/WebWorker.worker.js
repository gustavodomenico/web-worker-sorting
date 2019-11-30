import ExecutionContext from "./ExecutionContext";
import Messages from "../common/Messages";
import Configuration from "../common/Configuration";

function messageHandler(context) {
    return function (e) {
        const onProgress = index => {
            const numbersProcessed = index + 1;
            if (numbersProcessed % Configuration.CHUNK_SIZE === 0)
                postMessage({message: Messages.PROGRESS, value: numbersProcessed});
        };

        const onFinished = array => {
            postMessage({message: Messages.PROGRESS, value: array.length});
            postMessage({message: Messages.DONE, value: array});
        };

        const onNewNumberAdded = (array, timestamp) => {
            postMessage({message: Messages.UPDATED, value: array.length, timestamp: timestamp});
        };

        const messageCallbacks = new Map([
            [Messages.START, data => context.run(data.array, onProgress, onFinished)],
            [Messages.PAUSE, () => context.pause()],
            [Messages.RESUME, () => context.resume()],
            [Messages.ADD_NUMBER, data => context.add(data, onNewNumberAdded)]
        ]);

        messageCallbacks.get(e.data.message)(e.data);
    }
}

// eslint-disable-next-line no-restricted-globals
self.onmessage = messageHandler(new ExecutionContext());

// I am not very familiar with javascript/babel modules, the line below was to make the unit testing possible
if (module.exports)
    module.exports = messageHandler;
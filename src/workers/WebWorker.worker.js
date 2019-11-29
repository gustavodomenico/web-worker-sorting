import ExecutionContext from "./ExecutionContext";

let context = new ExecutionContext();

onmessage = function (e) {
    switch (e.data.message) {
        case "start":
            postMessage({message: "Working"});

            const onProgress = (index) => {
                if ((index + 1) % 5000 === 0)
                    postMessage({message: "progress", value: index + 1});
            };

            const onFinished = (array) => {
                postMessage({message: "end", value: array});
            };

            context.run(e.data.array, onProgress, onFinished);

            break;

        case "pause":
            context.pause();
            postMessage({message: "Paused"});
            break;

        case "resume":
            context.resume();
            postMessage({message: "Working"});
            break;

        case "add":
            context.add(1);
            break;

        default:
            break;
    }
};

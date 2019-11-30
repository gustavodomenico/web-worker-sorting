export default class Configuration {
    static ARRAY_SIZE = 20000;
    static CHUNK_SIZE = 5000;
    static POLLING_INTERVAL = 500;

    static createWorkers(workersCount) {
        return [...Array(workersCount).keys()].map((n) => ({
            id: n,
            isPaused: false,
            isFinished: false,
            progress: 0,
            status: "Working",
            size: Configuration.ARRAY_SIZE,
            startTime: Date.now(),
            endTime: null,
            messageTimes: []
        }));
    }

    static createArray() {
        return [...Array(Configuration.ARRAY_SIZE)].map((v, k) =>
            Math.floor((Math.random() * Configuration.ARRAY_SIZE) + k))
    };
}
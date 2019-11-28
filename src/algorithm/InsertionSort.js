export default class InsertionSort {
    static sortFromUntil(array, startIndex, until, watcher) {
        // Do not change the input array
        //let result = array.slice();
        let result = array;

        let length = startIndex + until > result.length ? result.length : startIndex + until;

        for (let i = startIndex + 1; i < length; i++) {
            if (watcher) watcher.onProgress(i);
            if (watcher && watcher.terminate && watcher.terminate()) break;

            let key = result[i];
            let j = i - 1;
            while (j >= startIndex && result[j] > key) {
                result[j + 1] = result[j];
                j = j - 1;
            }
            result[j + 1] = key;
        }
        return result;
    };

    static sortFrom(array, startIndex, watcher) {
        // Do not change the input array
        //let result = array.slice();
        let result = array;

        let length = result.length;
        for (let i = startIndex + 1; i < length; i++) {
            if (watcher) watcher.onProgress(i);
            if (watcher && watcher.terminate && watcher.terminate()) break;

            let key = result[i];
            let j = i - 1;
            while (j >= startIndex && result[j] > key) {
                result[j + 1] = result[j];
                j = j - 1;
            }
            result[j + 1] = key;
        }
        return result;
    };

    static sort(array, watcher) {
        return InsertionSort.sortFrom(array, 0, watcher)
    };
}
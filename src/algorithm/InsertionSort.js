export default class InsertionSort {
    static sortStepping(array, startIndex, step, watcher) {
        // Do not change the input array
        //let result = array.slice();
        let result = array;

        let length = startIndex + step > result.length ?
            result.length :
            startIndex + step;

        for (let i = startIndex + 1; i < length; i++) {
            if (watcher) watcher.onProgress(i);

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

    static sortFromIndex(array, startIndex, watcher) {
       return this.sortStepping(array, startIndex, array.length, watcher);
    };

    static sort(array, watcher) {
        return InsertionSort.sortFromIndex(array, 0, watcher)
    };
}
export default class InsertionSort {
    static sortStepping(array, startIndex, step, onProgress) {
        let length = startIndex + step > array.length ?
            array.length :
            startIndex + step;

        for (let i = startIndex; i < length; i++) {
            if (onProgress) onProgress(i);

            let key = array[i];
            let j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j = j - 1;
            }
            array[j + 1] = key;
        }

        return array;
    };

    static sortFromIndex = (array, startIndex, onProgress) => this.sortStepping(array, startIndex, array.length, onProgress);

    static sort = (array, onProgress) => this.sortFromIndex(array, 0, onProgress);
};
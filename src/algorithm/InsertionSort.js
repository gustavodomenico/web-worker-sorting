export default class InsertionSort {
    static sortChunk(array, startIndex, chunk, onProgress) {
        let length = startIndex + chunk > array.length ?
            array.length :
            startIndex + chunk;

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

    static sortFromIndex = (array, startIndex, onProgress) => this.sortChunk(array, startIndex, array.length, onProgress);

    static sort = (array, onProgress) => this.sortFromIndex(array, 0, onProgress);
};
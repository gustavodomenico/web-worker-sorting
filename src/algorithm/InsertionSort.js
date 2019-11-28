export default class InsertionSort {
    static sortFrom(array, startIndex) {
        let length = array.length;
        for (let i = startIndex + 1; i < length; i++) {
            let key = array[i];
            let j = i - 1;
            while (j >= startIndex && array[j] > key) {
                array[j + 1] = array[j];
                j = j - 1;
            }
            array[j + 1] = key;
        }
        return array;
    };

    static sort(array) {
        return InsertionSort.sortFrom(array, 0)
    };
}
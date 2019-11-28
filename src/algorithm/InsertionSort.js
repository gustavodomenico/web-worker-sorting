export default class InsertionSort {
    static sortFrom(array, startIndex) {
        // Do not change the input array
        let result = array.slice();

        let length = result.length;
        for (let i = startIndex + 1; i < length; i++) {
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

    static sort(array) {
        return InsertionSort.sortFrom(array, 0)
    };
}
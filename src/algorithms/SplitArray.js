export default class SplitArray {
    static run(array = [], n = 1) {
        const splitArray = [];
        let atArrPos = 0;
        for (let i = 0; i < n; i++) {
            const splitArrayLength = Math.ceil((array.length - atArrPos) / (n - i));
            splitArray.push([]);
            splitArray[i] = array.slice(atArrPos, splitArrayLength + atArrPos);
            atArrPos += splitArrayLength;
        }
        return splitArray
    }
};

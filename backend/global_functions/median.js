// Cálculo da Mediana
const calculateMedian = (array) => {
    const sortedArray = array.slice().sort((a, b) => a - b);
    const arrayLength = sortedArray.length;
    const middleIndex = Math.floor(arrayLength / 2);

    if (arrayLength % 2 === 0) {
        return (sortedArray[middleIndex - 1] + sortedArray[middleIndex]) / 2;
    } else {
        return sortedArray[middleIndex];
    }
};

export default calculateMedian;
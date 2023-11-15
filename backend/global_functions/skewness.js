// Cálculo da Assimetria
const calculateSkewness = (array) => {
    const n = array.length;
    const mean = array.reduce((acc, val) => acc + val, 0) / n;
    const variance = array.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    const skewness =
    (1 / n) *
    array.reduce((acc, val) => acc + Math.pow(val - mean, 3), 0) /
    Math.pow(stdDev, 3);

    return skewness;
};

export default calculateSkewness;

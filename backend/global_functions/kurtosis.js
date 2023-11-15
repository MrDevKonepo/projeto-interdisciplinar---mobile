import calculateStandardDeviation from "./standard_deviation";

// Cálculo da Curtose
const calculateKurtosis = (array) => {
    const n = array.length;
    const mean = array.reduce((acc, val) => acc + val, 0) / n;
    const stdDev = calculateStandardDeviation(array); // Utilize a função de cálculo do desvio padrão que você já implementou
  
    const sumPow4 = array.reduce((acc, val) => acc + Math.pow(val - mean, 4), 0);
    const kurtosis = (sumPow4 / n) / Math.pow(stdDev, 4) - 3;

    return kurtosis;
};

export default calculateKurtosis;

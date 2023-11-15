// Cálculo do Desvio Padrão
const calculateStandardDeviation = (array) => {
    const n = array.length;
    const mean = array.reduce((acc, val) => acc + val, 0) / n;
  
    const squaredDifferences = array.map(val => Math.pow(val - mean, 2));
    const meanSquaredDifferences = squaredDifferences.reduce((acc, val) => acc + val, 0) / n;

    const standardDeviation = Math.sqrt(meanSquaredDifferences);
    return standardDeviation;
};

export default calculateStandardDeviation;

import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, Button } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

const AirTemp = () => {
  const [dados, setDados] = useState([]);
  const [startDate, setStartDate] = useState('2021-01-01');
  const [endDate, setEndDate] = useState('2021-01-01');
  const [totalAirTemp, setTotalAirTemp] = useState(0);
  const [averageAirTemp, setAverageAirTemp] = useState(0);
  const [airTempValues, setAirTempValues] = useState(0);
  const [modeAirTemp, setModeAirTemp] = useState([]);
  const [medianAirTemp, setMedianAirTemp] = useState([]);
  const [standardDeviationAirTemp, setStandardDeviationAirTemp] = useState(0);
  const [skewnessAirTemp, setSkewnessAirTemp] = useState(0);
  const [kurtosis, setKurtosis] = useState(0);
  const [probability, setProbability] = useState(0);


  useEffect(() => {
    async function fetchDados() {
      try {
        const startDate = '2021-01-01';
        const endDate = '2021-01-01';
        const response = await fetch(`http://192.168.100.60:3000/api/dadosSolares/date/${startDate}/${endDate}`);
        
        if (response.ok) {
          const data = await response.json();
          setDados(data);
        } else {
          console.error('Erro ao buscar os dados');
        }
      } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
      }
    }

    fetchDados();
  }, []);

  const aggregateDataByHour = (data, periodStart, periodEnd) => {
    const filteredData = data.filter(item => {
      const hour = new Date(item.period_end).getHours();
      return hour >= periodStart && hour < periodEnd;
    });

    const aggregatedData = {};
    filteredData.forEach(item => {
      const hour = new Date(item.period_end).getHours();
      if (!aggregatedData[hour]) {
        aggregatedData[hour] = {
          count: 1,
          temperature: item.air_temp
        };
      } else {
        aggregatedData[hour].count++;
        aggregatedData[hour].temperature += item.air_temp;
      }
    });
    return aggregatedData;
  };

  // Cálculo da Moda
  const calculateMode = (array) => {
    let modeMap = {};
    let maxCount = 0;
    let modes = [];
  
    array.forEach((value) => {
      if (!modeMap[value]) {
        modeMap[value] = 1;
      } else {
        modeMap[value]++;
      }
  
      if (modeMap[value] > maxCount) {
        modes = [value];
        maxCount = modeMap[value];
      } else if (modeMap[value] === maxCount) {
        modes.push(value);
      }
    });
  
    if (modes.length === Object.keys(modeMap).length) {
      modes = [];
    }
  
    return modes;
  };

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

  // Cálculo do Desvio Padrão
  const calculateStandardDeviation = (array) => {
    const n = array.length;
    const mean = array.reduce((acc, val) => acc + val, 0) / n;
  
    const squaredDifferences = array.map(val => Math.pow(val - mean, 2));
    const meanSquaredDifferences = squaredDifferences.reduce((acc, val) => acc + val, 0) / n;
  
    const standardDeviation = Math.sqrt(meanSquaredDifferences);
    return standardDeviation;
  };

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

  // Cálculo da Curtose
  const calculateKurtosis = (array) => {
    const n = array.length;
    const mean = array.reduce((acc, val) => acc + val, 0) / n;
    const stdDev = calculateStandardDeviation(array); // Utilize a função de cálculo do desvio padrão que você já implementou
  
    const sumPow4 = array.reduce((acc, val) => acc + Math.pow(val - mean, 4), 0);
    const kurtosis = (sumPow4 / n) / Math.pow(stdDev, 4) - 3;
  
    return kurtosis;
  };

  // Função para calcular a probabilidade normal
  const calculateNormalProbability = (value, mean, stdDev) => {
    // Fórmula da função de distribuição cumulativa
    const x = (value - mean) / stdDev;
    const prob = (1 + erf(x / Math.sqrt(2))) / 2;
    return prob;
  };

  // Função erf (função de erro)
  const erf = (z) => {
    const t = 1.0 / (1.0 + 0.5 * Math.abs(z));
    const erfRes = 1 - t * Math.exp(-z * z - 1.26551223 +
      t * (1.00002368 +
      t * (0.37409196 +
      t * (0.09678418 +
      t * (-0.18628806 +
      t * (0.27886807 +
      t * (-1.13520398 +
      t * (1.48851587 +
      t * (-0.82215223 +
      t * (0.17087277))))))))));
    return z >= 0 ? erfRes : -erfRes;
  };

  const handleStartDateChange = (text) => {
    setStartDate(text);
  };

  const handleEndDateChange = (text) => {
    setEndDate(text);
  };

  const fetchNewData = async () => {
    try {
      const response = await fetch(`http://192.168.100.60:3000/api/dadosSolares/date/${startDate}/${endDate}`);
      
      if (response.ok) {
        const data = await response.json();
        setDados(data);

        // Soma a temperatura total
        const sum = data.reduce((acc, item) => acc + item.air_temp, 0);
        setTotalAirTemp(sum);

        // Calcula a média
        const average = sum / data.length;
        setAverageAirTemp(average);

        // Cria um vetor com todos os valores de air_temp
        const airTempArray = data.map(item => item.air_temp);
        setAirTempValues(airTempArray);

        // Calcular a moda
        const mode = calculateMode(airTempArray);
        setModeAirTemp(mode);

        // Calcular a mediana
        const median = calculateMedian(airTempArray);
        setMedianAirTemp(median);

        // Calcular o desvio padrão
        const standardDeviation = calculateStandardDeviation(airTempArray);
        setStandardDeviationAirTemp(standardDeviation);

        // Calcular a assimetria
        const skewness = calculateSkewness(airTempArray);
        setSkewnessAirTemp(skewness);

        // Calcular a curtose
        const kurtosis = calculateKurtosis(airTempArray);
        setKurtosis(kurtosis);

        // Calcular a probabilidade normal
        const probabilityValue = 70; // Valor de air_temp para calcular a probabilidade (70%)
        const probability = calculateNormalProbability(probabilityValue, averageAirTemp, standardDeviationAirTemp);
        setProbability(probability);
        //console.log(`Probabilidade de air_temp ser menor que ${probabilityValue}: ${probability}`);
      } else {
        console.error('Erro ao buscar os dados');
      }
    } catch (error) {
      console.error('Erro ao buscar os dados: ', error);
    }
  };

  const renderCharts = () => {
    const periods = [
      { name: 'Manhã', periodStart: 6, periodEnd: 12 },
      { name: 'Tarde', periodStart: 12, periodEnd: 18 },
      { name: 'Noite', periodStart: 18, periodEnd: 24 },
      { name: 'Madrugada', periodStart: 0, periodEnd: 6 }
    ];

    return periods.map((period, index) => {
      const aggregatedData = aggregateDataByHour(dados, period.periodStart, period.periodEnd);
      const chartData = Object.keys(aggregatedData).map(hour => ({
        x: `${hour}:00`,
        y: aggregatedData[hour].temperature
      }));

      return (
        <View key={index}>
          <Text>{period.name}</Text>
          <VictoryChart width={408} height={270} theme={VictoryTheme.grayscale}>
            <VictoryLine
              style={{ data: { stroke: '#c43a31' }, parent: { border: '1px solid #ccc' } }}
              data={chartData}
            />
          </VictoryChart>
        </View>
      );
    });
  };

  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, marginRight: 5 }}
          onChangeText={handleStartDateChange}
          value={startDate}
          placeholder="Data inicial (YYYY-MM-DD)"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, marginLeft: 5 }}
          onChangeText={handleEndDateChange}
          value={endDate}
          placeholder="Data final (YYYY-MM-DD)"
        />
        <Button title="Buscar Dados" onPress={fetchNewData} />
      </View>
      {renderCharts()}
      <Text>Temperatura Total: {totalAirTemp}</Text>
      <Text>Moda: {modeAirTemp.join(', ')}</Text>
      <Text>Média: {averageAirTemp.toFixed(2)}</Text>
      <Text>Mediana: {medianAirTemp}</Text>
      <Text>Desvio Padrão: {standardDeviationAirTemp.toFixed(2)}</Text>
      <Text>Assimetria: {skewnessAirTemp.toFixed(2)}</Text>
      <Text>Curtose: {kurtosis.toFixed(2)}</Text>
      <Text>Probabilidade: {probability}</Text>
    </ScrollView>
  );
};

export default AirTemp;

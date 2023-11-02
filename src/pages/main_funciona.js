import React from 'react';
import { View, Text } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import geracaoStyles from '../styles/style_geracao'; // Importando estilos como geracaoStyles

const data = {
  labels: ['12. Jul', '08:00', '16:00', '13. Jul'],
  datasets: [
    {
      data: [100, 150, 200, 250, 300, 250, 200, 150],
      color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Laranja (Potência do Inversor)
      strokeWidth: 2,
    },
    {
      data: [0, 50, 100, 200, 250, 200, 100, 0],
      color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Verde (Potência gerada pela placa solar)
      strokeWidth: 2,
    },
    {
      data: [50, 75, 100, 150, 200, 175, 125, 75],
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Azul (Potência consumida)
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Primeiro grafico 
  strokeWidth: 2,
};

const barChartData = {
  labels: ['Rede', 'Da Rede'],
  datasets: [
    {
      data: [50, 75, 100, 150, 200, 175, 125, 75],
      color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Verde (Rede)
    },
    {
      data: [0, 50, 100, 200, 250, 200, 100, 0], // Exemplo: 5 para Da Rede
      color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // Laranja (Da Rede)
    },
  ],
};

const barChartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // ## Grafico de barras
};

const Main = () => {
  return (
    <View>
      <Text style={geracaoStyles.title}>Geração de Energia Elétrica</Text>
      <LineChart
        data={data}
        width={392}
        height={200}
        yAxisLabel="kW"
        chartConfig={chartConfig}
      />
      <View style={geracaoStyles.legendContainer}>
        {data.datasets.map((dataset, index) => (
          <View style={geracaoStyles.legendItem} key={index}>
            <View style={{ ...geracaoStyles.legendColor, backgroundColor: dataset.color(1) }}></View>
            <Text style={geracaoStyles.legendText}>
              {dataset.color(1) === 'rgba(255, 165, 0, 1)'
                ? 'Potência do Inversor'
                : dataset.color(1) === 'rgba(0, 128, 0, 1)'
                ? 'Potência gerada pela placa solar'
                : 'Potência consumida'}
            </Text>
          </View>
        ))}
      </View>
      <Text style={geracaoStyles.title}>Balanço de Energia</Text>
      <View style={{ flexDirection: 'row' }}>
        <BarChart
          data={barChartData}
          width={387}
          height={200}
          yAxisLabel="kW"
          chartConfig={barChartConfig}
        />
      </View>
    </View>
  );
};

export default Main;

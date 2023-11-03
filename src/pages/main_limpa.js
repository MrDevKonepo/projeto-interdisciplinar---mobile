import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import geracaoStyles from '../styles/style_geracao'; // Importando estilos como geracaoStyles

const data = {
  //labels: ['12. Jul', '08:00', '16:00', '13. Jul'],
  datasets: [
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

const Main = () => {
  return (
    <View>
      <Text style={geracaoStyles.title}>Radiação Solar</Text>
      <LineChart
        data={data}
        width={392}
        height={200}
        yAxisLabel="W/m2"
        chartConfig={chartConfig}
      />
      <View style={geracaoStyles.legendContainer}>
        {data.datasets.map((dataset, index) => (
          <View style={geracaoStyles.legendItem} key={index}>
            <View style={{ ...geracaoStyles.legendColor, backgroundColor: dataset.color(1) }}></View>
            <Text style={geracaoStyles.legendText}>
              {dataset.color(1) === 'rgba(0, 128, 0, 1)'
                ? 'Radiação Solar Direta Normal'
                : 'Radiação Solar Direta Global'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Main;

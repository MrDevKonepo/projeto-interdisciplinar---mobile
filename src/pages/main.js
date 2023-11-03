import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

const Main = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function fetchDados() {
      try {
        const startDate = '2021-01-01';
        const endDate = '2021-01-30';
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
      {renderCharts()}
    </ScrollView>
  );
};

export default Main;

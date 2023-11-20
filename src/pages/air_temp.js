import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import calculateMode from '../../backend/global_functions/mode';
import calculateMedian from '../../backend/global_functions/median';
import calculateStandardDeviation from '../../backend/global_functions/standard_deviation';
import calculateSkewness from '../../backend/global_functions/skewness';
import calculateKurtosis from '../../backend/global_functions/kurtosis';
import styles from '../styles/styles_statistics';

const AirTemp = () => {
    const [dados, setDados] = useState([]);
    const [startDate, setStartDate] = useState(0);
    const [endDate, setEndDate] = useState(0);
    const [totalAirTemp, setTotalAirTemp] = useState(0);
    const [averageAirTemp, setAverageAirTemp] = useState(0);
    const [airTempValues, setAirTempValues] = useState(0);
    const [modeAirTemp, setModeAirTemp] = useState([]);
    const [medianAirTemp, setMedianAirTemp] = useState([]);
    const [standardDeviationAirTemp, setStandardDeviationAirTemp] = useState(0);
    const [skewnessAirTemp, setSkewnessAirTemp] = useState(0);
    const [kurtosis, setKurtosis] = useState(0);
    
    // Agrupa os dados por hora
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

    const handleStartDateChange = (text) => {
        setStartDate(text);
    };

    const handleEndDateChange = (text) => {
        setEndDate(text);
    };

    // Atualiza os dados quando um novo filtro é realizado
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

            } else {
                alert("Não existem dados para o período informado");
            }
        } catch (error) {
            console.error('Erro ao buscar os dados: ', error);
        }
    };

    // Renderiza os gráficos separando por período do dia
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
                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 8 }}>{period.name}</Text>
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
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, marginRight: 10, textAlign: 'center' }}
                    onChangeText={handleStartDateChange}
                    value={startDate}
                    placeholder="Data inicial (YYYY-MM-DD)"
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, marginRight: 10, textAlign: 'center' }}
                    onChangeText={handleEndDateChange}
                    value={endDate}
                    placeholder="Data final (YYYY-MM-DD)"
                />
                <TouchableOpacity
                    style={{ backgroundColor: '#2d81c2', padding: 10, borderRadius: 3, height: 40, width: 100, alignItems: 'center', justifyContent: 'center', padding: '110' }}
                    onPress={fetchNewData}
                >
                    <Text style={{ color: '#fff', fontSize: 18 }}>Buscar</Text>
                </TouchableOpacity>
            </View>
            {renderCharts()}
            <Text style={ styles.statisticsTitle }>
                Cálculos Estatísticos
            </Text>
            <View style={ styles.statisticsContainer }>
                <View style={ styles.statisticsContainerLegend }>
                    <Text style={ styles.statisticsLegend } >Moda</Text>    
                    <Text style={ styles.statisticsValue }>{modeAirTemp.join(', ')}</Text>
                </View>
                <View style={ styles.statisticsContainerLegend }>
                    <Text style={ styles.statisticsLegend } >Média</Text>    
                    <Text style={ styles.statisticsValue }>{averageAirTemp.toFixed(2)}</Text>
                </View>
            </View>
            <View style={ styles.statisticsContainer }>
                <View style={ styles.statisticsContainerLegend }>
                    <Text style={ styles.statisticsLegend } >Mediana</Text>    
                    <Text style={ styles.statisticsValue }>{medianAirTemp}</Text>
                </View>
                <View style={ styles.statisticsContainerLegend }>
                    <Text style={ styles.statisticsLegend } >Curtose</Text>    
                    <Text style={ styles.statisticsValue }>{kurtosis.toFixed(2)}</Text>
                </View>
            </View>
            <View style={ styles.statisticsContainer }>
                <View style={ styles.statisticsContainerLegend }>
                    <Text style={ styles.statisticsLegend } >Desvio Padrão</Text>    
                    <Text style={ styles.statisticsValue }>{standardDeviationAirTemp.toFixed(2)}</Text>
                </View>
                <View style={ styles.statisticsContainerLegend }>
                    <Text style={ styles.statisticsLegend } >Assimetria</Text>    
                    <Text style={ styles.statisticsValue }>{skewnessAirTemp.toFixed(2)}</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default AirTemp;

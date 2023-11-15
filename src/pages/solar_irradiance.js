import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import geracaoStyles from '../styles/style_geracao';
import calculateMode from '../../backend/global_functions/mode';
import calculateMedian from '../../backend/global_functions/median';
import calculateStandardDeviation from '../../backend/global_functions/standard_deviation';
import calculateSkewness from '../../backend/global_functions/skewness';
import calculateKurtosis from '../../backend/global_functions/kurtosis';

const SolarIrradiance = () => {
    const [dados, setDados] = useState([]);
    const [startDate, setStartDate] = useState('2021-01-01');
    const [endDate, setEndDate] = useState('2021-01-01');
    const [selectedDataPoint, setSelectedDataPoint] = useState(null);
    const [chartData, setChartData] = useState({});
    const dniColor = '0, 0, 255';
    const ghiColor = '0, 128, 0';
    const [averageDNI, setAverageDNI] = useState(0); // Para calcular as medias
    const [averageGHI, setAverageGHI] = useState(0);
    const [dniValues, setDniValues] = useState([]); // Array para os calculos estatisticos
    const [ghiValues, setGhiValues] = useState([]);
    const [dniMode, setDniMode] = useState([]);
    const [ghiMode, setGhiMode] = useState([]);
    const [dniMedian, setDniMedian] = useState([]);
    const [ghiMedian, setGhiMedian] = useState([]);
    const [dniStandardDeviation, setDniStandardDeviation] = useState(0);
    const [ghiStandardDeviation, setGhiStandardDeviation] = useState(0);
    const [dniSkewness, setDniSkewness] = useState(0);
    const [ghiSkewness, setGhiSkewness] = useState(0);
    const [dniKurtosis, setDniKurtosis] = useState(0);
    const [ghiKurtosis, setGhiKurtosis] = useState(0);

    const handleStartDateChange = (text) => {
        setStartDate(text);
    };

    const handleEndDateChange = (text) => {
        setEndDate(text);
    };

    // Filtra os dados por hora, considerando o período selecionado
    const aggregateDataByHour = (data, startDate, endDate, startHour, endHour) => {
        const filteredData = data.filter(item => {
            const itemDate = new Date(item.period_end);
            const isWithinTimeRange = itemDate.getHours() >= startHour && itemDate.getHours() <= endHour;

            return (
                isWithinTimeRange &&
                itemDate >= new Date(startDate) &&
                itemDate < new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000)
            );
        });

        const aggregatedData = {};

        filteredData.forEach(item => {
            const itemDate = new Date(item.period_end);
            const hour = itemDate.getHours();

            if (!aggregatedData[hour]) {
                aggregatedData[hour] = {
                    count: 1,
                    dni: item.dni,
                    ghi: item.ghi,
                };
            } else {
                aggregatedData[hour].count++;
                aggregatedData[hour].dni += item.dni;
                aggregatedData[hour].ghi += item.ghi;
            }
        });

        return aggregatedData;
    };    

    // Atualiza os dados
    const fetchNewData = async () => {
        try {
            const response = await fetch(`http://192.168.100.60:3000/api/dadosSolares/date/${startDate}/${endDate}`);

            if (response.ok) {
                const data = await response.json();
                setDados(data);

                // Média de DNI
                const sumDNI = data.reduce((acc, item) => acc + item.dni, 0);
                const averageDNI = sumDNI / data.length;
                setAverageDNI(averageDNI);

                // Média de GHI
                const sumGHI = data.reduce((acc, item) => acc + item.ghi, 0);
                const averageGHI = sumGHI / data.length;
                setAverageGHI(averageGHI);

                // Cria um array com todos os registros de DNI
                const dniArray = data.map(item => item.dni);
                setDniValues(dniArray);

                // Cria um array com todos os registros de DNI
                const ghiArray = data.map(item => item.ghi);
                setGhiValues(ghiArray);

                // Calcular a moda - DNI
                const dniMode = calculateMode(dniArray);
                setDniMode(dniMode);

                // Calcular a moda - GHI
                const ghiMode = calculateMode(ghiArray);
                setGhiMode(ghiMode);

                // Calcular a mediana - DNI
                const dniMedian = calculateMedian(dniArray);
                setDniMedian(dniMedian);

                // Calcular a mediana - GHI
                const ghiMedian = calculateMedian(ghiArray);
                setGhiMedian(ghiMedian);

                // Calcular o desvio padrão - DNI
                const dniStandardDeviation = calculateStandardDeviation(dniArray);
                setDniStandardDeviation(dniStandardDeviation);

                // Calcular o desvio padrão - GHI
                const ghiStandardDeviation = calculateStandardDeviation(ghiArray);
                setGhiStandardDeviation(ghiStandardDeviation);

                // Calcular a assimetria - DNI
                const dniSkewness = calculateSkewness(dniArray);
                setDniSkewness(dniSkewness);

                // Calcular a assimetria - GHI
                const ghiSkewness = calculateSkewness(ghiArray);
                setGhiSkewness(ghiSkewness);

                // Calcular a curtose - DNI
                const dniKurtosis = calculateKurtosis(dniArray);
                setDniKurtosis(dniKurtosis);

                // Calcular a curtose - GHI
                const ghiKurtosis = calculateKurtosis(ghiArray);
                setGhiKurtosis(ghiKurtosis);


            } else {
                console.error('Erro ao buscar os dados');
            }
        } catch (error) {
            console.error('Erro ao buscar os dados: ', error);
        }
    };

    // Alimenta os gráficos com os dados filtrados
    const createChartData = (aggregatedData, label, dniColor, ghiColor, datasetKey) => {
        const labels = Object.keys(aggregatedData).map(hour => `${hour}:00`);
        const dniData = Object.values(aggregatedData).map(data => data.dni);
        const ghiData = Object.values(aggregatedData).map(data => data.ghi);

        return {
            [datasetKey]: {
                labels: labels,
                datasets: [
                    {
                        data: dniData,
                        color: (opacity = 1) => `rgba(${dniColor}, ${opacity})`,
                        strokeWidth: 2,
                        label: 'Irradiação Solar Direta Normal (dni)',
                    },
                    { 
                        data: ghiData,
                        color: (opacity = 1) => `rgba(${ghiColor}, ${opacity})`,
                        strokeWidth: 2,
                        label: 'Irradiação Solar Global Horizontal (ghi)',
                    },
                ],
            },
        };
    }

    // Dados para renderizar os gráficos
    const renderChart = (aggregatedData, label, dniColor, ghiColor, datasetKey) => {
        const chartData = createChartData(aggregatedData, label, dniColor, ghiColor, datasetKey);

        return (
            <View key={datasetKey}>
                <LineChart
                    style={{ margin: 8 }}
                    data={chartData[datasetKey]}
                    width={392}
                    height={200}
                    chartConfig={{
                        backgroundGradientFrom: 'white',
                        backgroundGradientTo: 'white',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        strokeWidth: 2,
                    }}
                    onDataPointClick={({ value, dataset, getColor }) => handleDataPointClick(value, dataset, getColor)}
                />
            </View>
        );
    };

    // Separa os gráficos por período do dia
    useEffect(() => {
        if (dados.length > 0) {
            const morningData = aggregateDataByHour(dados, startDate, endDate, 6, 11);
            const afternoonData = aggregateDataByHour(dados, startDate, endDate, 12, 17);
            const eveningData = aggregateDataByHour(dados, startDate, endDate, 18, 23);
            const midnightData = aggregateDataByHour(dados, startDate, endDate, 0, 5);

            setChartData({
                morning:   renderChart(morningData  , 'Irradiação Solar Manhã'    , '0, 0, 255', '0, 128, 0', 'morning'),
                afternoon: renderChart(afternoonData, 'Irradiação Solar Tarde'    , '0, 0, 255', '0, 128, 0', 'afternoon'),
                evening:   renderChart(eveningData  , 'Irradiação Solar Noite'    , '0, 0, 255', '0, 128, 0', 'evening'),
                midnight:  renderChart(midnightData , 'Irradiação Solar Madrugada', '0, 0, 255', '0, 128, 0', 'midnight'),
            });
        }
    }, [dados]);

    // Mostra o valor exato de cada ponto, quando clicados
    const handleDataPointClick = (value, dataset, getColor) => {
        setSelectedDataPoint({
            value,
            label: dataset.label,
            color: getColor(),
        });

        Alert.alert(
            'Irradiação Exata',
            `Valor: ${value}`,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
        );
    };

    return (
        <ScrollView>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, marginRight: 5 }}
                        onChangeText={handleStartDateChange}
                        value={startDate}
                        placeholder="Data inicial (YYYY-MM-DD)"
                    />
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderWidth: 1, flex: 1, marginRight: 5 }}
                        onChangeText={handleEndDateChange}
                        value={endDate}
                        placeholder="Data final (YYYY-MM-DD)"
                    />
                    <Button title="Buscar Dados" onPress={fetchNewData} />
                </View>
                <View style={{ alignItems: 'center', marginLeft: 70, marginTop: 10, flexDirection: 'row', justifyContent: 'left' }}>
                    <View style={{ backgroundColor: `rgb(${dniColor})`, width: 15, height: 15, borderRadius: 1, marginRight: 5 }} />
                    <Text style={{ textAlign: 'center', color: 'black' }}>Irradiação Solar Direta Normal (DNI)</Text>
                </View>
                <View style={{ alignItems: 'center', marginLeft: 70, marginTop: 10, marginVertical: 15, flexDirection: 'row', justifyContent: 'left' }}>
                    <View style={{ backgroundColor: `rgb(${ghiColor})`, width: 15, height: 15, borderRadius: 1, marginRight: 5 }} />
                    <Text style={{ textAlign: 'center', color: 'black' }}>Irradiação Solar Global Horizontal (GHI)</Text>
                </View>
                {chartData.morning}
                {chartData.afternoon}
                {chartData.evening}
                {chartData.midnight}
                <Text>Média de DNI: {averageDNI.toFixed(2)}</Text>
                <Text>Média de GHI: {averageGHI.toFixed(2)}</Text>
                <Text>Moda de DNI: {dniMode.join(', ')}</Text>
                <Text>Moda de GHI: {ghiMode.join(', ')}</Text>
                <Text>Mediana de DNI: {dniMedian}</Text>
                <Text>Mediana de GHI: {ghiMedian}</Text>
                <Text>Desvio Padrão de DNI: {dniStandardDeviation.toFixed(2)}</Text>
                <Text>Desvio Padrão de GHI: {ghiStandardDeviation.toFixed(2)}</Text>
                <Text>Assimetria de DNI: {dniSkewness.toFixed(2)}</Text>
                <Text>Assimetria de GHI: {ghiSkewness.toFixed(2)}</Text>
                <Text>Curtose de DNI: {dniKurtosis.toFixed(2)}</Text>
                <Text>Curtose de GHI: {ghiKurtosis.toFixed(2)}</Text>
            </View>
        </ScrollView>
    );
};

export default SolarIrradiance;

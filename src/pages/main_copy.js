import React, { Component } from 'react';
import { Container } from './style';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;   

/*

const chartConfig = {
    //backgroundGradientFrom: "#1E2923",
    //backgroundGradientFromOpacity: 0,
    //backgroundGradientTo: "#08130D",
    //backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    //strokeWidth: 2, // optional, default 3
    //barPercentage: 0.5,
    //useShadowColorFromDataset: false // optional
};

*/

const chartConfig = {
    backgroundGradientFrom: "#ffffff", // Define o fundo como branco
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#ffffff", // Define o fundo como branco
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Define todas as cores como preto
    strokeWidth: 2, // Define a largura das linhas
};


const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        //color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        color: (opacity = 1) => `rgba(300, 80, 0, ${opacity})`, // Cor da linha (preta)
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Energia gerada por mês"] // optional
  };

export default class Main extends Component {

    render(){
        
        return(
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
            />
        )
    }
}

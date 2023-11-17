import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    // CSS do filtro de data

    // View para manter tudo em uma linha
    dataFilterContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        margin: 10
    },

    // TextInput para informar a data
    dataFilterInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        flex: 1, 
        marginRight: 10, 
        textAlign: 'center'
    },

    // Botão de busca
    dataFilterButton: {
        backgroundColor: '#2d81c2', 
        padding: 10, 
        borderRadius: 3, 
        height: 40, 
        width: 100, 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '110'
    },

    // Texto do botão de busca
    dataFilterButtonTitle: {
        color: '#fff', 
        fontSize: 18
    },

    // FIM do filtro de data

    // CSS das legendas

    // View para alinhar o quadrado com a cor e o texto
    graphicLegendsContainer: {
        alignItems: 'center', 
        marginLeft: 70, 
        marginTop: 10, 
        flexDirection: 'row', 
        justifyContent: 'left'
    },

    // Texto da legenda
    graphicLegendsText: {
        textAlign: 'center', 
        color: 'black'
    },


    // CSS dos cálculos estatísticos

    // Text para o título "Cálculos Estatísticos"
    statisticsTitle: {
        color: 'black', 
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        marginBottom: 18, 
        marginTop: 18
    },

    // View para agrupar dois itens por lina 
    statisticsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 3,
        marginBottom: 10
    },

    // View que controla cada cálculo individualmente por linha
    statisticsContainerLegend: {
        flex: 1, 
        paddingRight: 10
    },

    // Text com o título do cálculo
    statisticsLegend: {
        textAlign: 'center', 
        justifyContent: 'center', 
        alignItems: 'center', 
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 5,
        marginRight: 5
    },

    // Text com o valor do cálculo
    statisticsValue: {
        textAlign: 'center', 
        justifyContent: 'center', 
        alignItems: 'center', 
        color: 'black', 
        fontSize: 14,
        marginTop: 15
    }

    // FIM dos cálculos estatísticos

});

export default styles;
import { StyleSheet } from 'react-native';

const geracaoStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    //textAlign: 'left',
    marginVertical: 10,
  },
  legendContainer: {
    flexDirection: 'column', // Mude de 'row' para 'column'
    alignItems: 'left',
    marginTop: 5,
    marginVertical: 15,
    marginLeft: 73,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendColor: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  legendText: {
    fontSize: 13 // Ajuste o tamanho da fonte conforme necessário
  },
});

export default geracaoStyles;

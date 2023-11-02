import { StyleSheet } from 'react-native';

const geracaoStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  legendContainer: {
    flexDirection: 'column', // Mude de 'row' para 'column'
    alignItems: 'left',
    marginTop: 10,
    marginLeft: 100,
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
    fontSize: 13, // Ajuste o tamanho da fonte conforme necessário
  },
});

export default geracaoStyles;

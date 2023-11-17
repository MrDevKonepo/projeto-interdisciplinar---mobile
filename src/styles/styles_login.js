import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input:{
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        padding: 10,
        marginVertical:8,
        width: '80%',
    },
    button:{
        borderRadius: 5,
        padding: 10,
        width: '80%',
        alignItems: 'center',
        backgroundColor: '#2d81c2',
        marginBottom: 100
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17
    },
    logo:{
        width: '80%', 
        height: 200, 
        marginTop: 20, 
        marginTop: 0
    }
});

export default styles;

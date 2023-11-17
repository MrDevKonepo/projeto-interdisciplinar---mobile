import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },
    button: {
        alignItems: 'center',
        margin: 10,
        marginTop: 30,
        marginBottom: 60,
    },
    button: {
        alignItems: 'center',
        margin: 10,
        marginTop: 30,
        marginBottom: 60
    },
    buttonContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        //justifyContent: 'center',
        marginTop: 70
    },
    buttonText:{
        color: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 22,
        marginTop: 13,
        //flexWrap: 'wrap',
        //numberOfLines: 2
    },
    logo:{
        width: '80%', 
        height: 200, 
        marginTop: 20,
        marginBottom: 20,
        marginRight: 18
    }
});

export default styles;
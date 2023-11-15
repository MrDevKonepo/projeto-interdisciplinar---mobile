import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Main = () => {

    const navigation = useNavigation();

    const handleAirTemp = () => {
        navigation.navigate('air_temp');
    }

    const handleSolarIrradiance = () => {
        navigation.navigate('solar_irradiance');
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleAirTemp}>
                <Text style={styles.buttonText}>Temperatura do Ar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSolarIrradiance}>
                <Text style={styles.buttonText}>Irradiação Solar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginVertical:10,
        width: '80%',
    },
    button:{
        backgroundColor: '#2d81c2',
        borderRadius: 5,
        padding: 10,
        width: '80%',
        alignItems: 'center',
        margin: 10
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default Main;
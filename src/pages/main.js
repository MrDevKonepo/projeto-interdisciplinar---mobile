import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles/styles_main';


const Main = () => {
    const navigation = useNavigation();

    const handleAirTemp = () => {
        navigation.navigate('air_temp');
    }

    const handleSolarIrradiance = () => {
        navigation.navigate('solar_irradiance');
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../files/logo_solaire.jpg')}
                style={styles.logo}
                resizeMode='contain'
            />
            <TouchableOpacity style={styles.button} onPress={handleAirTemp}>
                <FontAwesome5 name="temperature-high" size={53} color="#000" />
                <Text style={ styles.buttonText } >Temperatura do Ar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSolarIrradiance}>
                <MaterialIcons name="solar-power" size={53} color="#000" />
                <Text style={ styles.buttonText } >Irradiação Solar</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Main;

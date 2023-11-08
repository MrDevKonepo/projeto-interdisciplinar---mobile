import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Main = () => {

    const navigation = useNavigation();

    const handleAirTemp = () => {
        navigation.navigate('air_temp');
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleAirTemp}>
                <Text style={styles.buttonText}>Temperatura do Ar</Text>
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
        backgroundColor: '#3498db',
        borderRadius: 5,
        padding: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default Main;
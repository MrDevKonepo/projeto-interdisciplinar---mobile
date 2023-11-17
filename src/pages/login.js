import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/styles_login';
import { ImageBackground } from 'react-native';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const navigation = useNavigation();

    const handleLogin = () => {
        if (email === '' && password === ''){
            navigation.navigate('main');
        }else{
            alert('E-mail ou senha inválidos!')
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../files/logo_solaire.jpg')}
                style={styles.logo}
                resizeMode='contain'
            />
            <TextInput
                style={styles.input}
                placeholder='E-mail'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder='Senha'
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;
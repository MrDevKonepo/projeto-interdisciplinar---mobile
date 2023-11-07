import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login';
import AirTemp from './pages/air_temp';

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={Login} options={{
                    title: 'LOGIN',
                    headerTitleAlign: 'center',
                    headerStyle:{
                        backgroundColor:'#3498db',
                    },
                    headerTitleStyle:{
                        fontWeight: 'bold',
                        color: '#fff'
                    }
                }}/>
                <Stack.Screen name="air_temp" component={AirTemp} options={{
                    title: 'TEMPERATURA DO AR',
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerLeft: null,
                    headerStyle:{
                        backgroundColor:'#3498db',
                    },
                    headerTitleStyle:{
                        fontWeight: 'bold',
                        color: '#fff'
                    }
                }}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}
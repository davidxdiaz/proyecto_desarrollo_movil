import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from './types';

// Importamos las pantallas y el Tab Navigator
import { LoginScreen } from '../screens/LoginScreen';
import { MainTabNavigator } from './MainTabNavigator';

// Instanciamos el Stack
const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Login" // La app siempre inicia en el Login por ahora
      screenOptions={{
        headerShown: false, // Ocultamos la barra superior nativa del Stack
      }}
    >
      {/* Pantalla 1: Login */}
      <Stack.Screen name="Login" component={LoginScreen} />
      
      {/* Pantalla 2: Toda la estructura de pestañas anidada */}
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabNavigator} 
        // options={{ gestureEnabled: false }} // Evita que el usuario regrese al login deslizando
      />
    </Stack.Navigator>
  );
};
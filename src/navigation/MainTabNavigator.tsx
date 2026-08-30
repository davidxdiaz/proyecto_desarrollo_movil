import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { RootTabParamList } from './types';

// Pantallas temporales (Placeholders) para construir el esqueleto
const HomeScreen = () => <View style={styles.screen}><Text>Home Screen</Text></View>;
const PerfilesScreen = () => <View style={styles.screen}><Text>Perfiles Screen</Text></View>;
const DocumentosScreen = () => <View style={styles.screen}><Text>Documentos Screen</Text></View>;
const AjustesScreen = () => <View style={styles.screen}><Text>Ajustes Screen</Text></View>;

// Instanciamos el Tab Navigator pasándole nuestro tipado estricto
const Tab = createBottomTabNavigator<RootTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // Utilizamos el Primary Blue definido en el sistema de diseño para la pestaña activa
        tabBarActiveTintColor: '#0056B3', 
        tabBarInactiveTintColor: '#727784',
        headerShown: true, // Muestra la barra superior (Header) por defecto
        headerStyle: {
          backgroundColor: '#F8F9FA', // Background Light Gray 
        },
        headerTitleStyle: {
          color: '#0056B3', // Título en color primario
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Perfiles" component={PerfilesScreen} />
      <Tab.Screen name="Documentos" component={DocumentosScreen} />
      <Tab.Screen name="Ajustes" component={AjustesScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // Fondo general de la app
  },
});
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { RootTabParamList } from './types';

import { AjustesScreen } from '../screens/AjustesScreen';
import { DocumentosScreen } from '../screens/DocumentosScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { PerfilesScreen } from '../screens/PerfilesScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // 1. Configuración dinámica de Íconos
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          // Asignamos el ícono correspondiente según el nombre de la ruta
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Perfiles') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Documentos') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Ajustes') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // 2. Estilos del sistema de diseño
        tabBarActiveTintColor: '#0056B3', // Primary Blue[cite: 1]
        tabBarInactiveTintColor: '#727784', // Outline[cite: 1]
        headerShown: false, // Ocultamos el header aquí para no duplicarlo
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F1F3F4',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Perfiles" component={PerfilesScreen} />
      <Tab.Screen name="Documentos" component={DocumentosScreen} />
      <Tab.Screen name="Ajustes" component={AjustesScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
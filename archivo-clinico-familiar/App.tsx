import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainTabNavigator } from './src/navigation/MainTabNavigator';

export default function App() {
  return (
    // NavigationContainer gestiona el árbol de navegación y el estado de la aplicación
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}
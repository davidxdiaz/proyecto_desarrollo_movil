import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importamos el enrutador de pestañas 
import { RootNavigator } from './src/navigation/RootNavigator';

// 1. Retenemos el Splash Screen nativo para que no desaparezca de golpe
SplashScreen.preventAutoHideAsync();

export default function App() {
  // 2. Estado local para saber si los recursos ya están listos
  const [appIsReady, setAppIsReady] = useState(false);

  // 3. Efecto secundario para cargar recursos asíncronos al montar la app
  useEffect(() => {
    async function prepareResources() {
      try {
        // Cargamos las tipografías estrictas del sistema de diseño
        await Font.loadAsync({
          'Work Sans': require('./src/assets/WorkSans-SemiBold.ttf'), // Usado para headline-lg y headline-md
          'Inter-Regular': require('./src/assets/Inter-Regular.ttf'), // body-lg, body-md
          'Inter-Medium': require('./src/assets/Inter-Medium.ttf'),   // label-md (peso 500)
          'Inter-SemiBold': require('./src/assets/Inter-SemiBold.ttf')// title-lg (peso 600)
        });

        // Aquí en el futuro podríamos cargar tokens de sesión o datos de SQLite

      } catch (e) {
        console.warn('Error cargando recursos:', e);
      } finally {
        // Independientemente de si falla o tiene éxito, marcamos la app como lista
        setAppIsReady(true);
      }
    }

    prepareResources();
  }, []); // El arreglo vacío [] asegura que esto solo se ejecute una vez al inicio

  // 4. Efecto para ocultar el Splash Screen una vez que la app está lista
  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // 5. Renderizado de seguridad preventivo
  if (!appIsReady) {
    return <View style={{ flex: 1, backgroundColor: '#F8F9FA' }} />;
  }

  // 6. Retorno del árbol de componentes principal
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
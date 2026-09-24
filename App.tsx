import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { WorkSans_600SemiBold } from '@expo-google-fonts/work-sans';
import 'react-native-url-polyfill/auto';
import { Provider } from "react-redux";
import { store } from "./src/store/store";

import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importamos el enrutador de pestañas 
import { RootNavigator } from './src/navigation/RootNavigator';

// 1. Retenemos el Splash Screen nativo para que no desaparezca de golpe
SplashScreen.preventAutoHideAsync();


export default function App() {
  // 2. Cargamos las fuentes (Hook en el nivel superior cumpliendo las Reglas de React)
  const [fontsLoaded] = useFonts({
    'Work Sans': WorkSans_600SemiBold,
    'Inter': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
  });

  // 3. Estado local para saber si todos los recursos están listos
  const [appIsReady, setAppIsReady] = useState(false);

  // 4. Efecto para actualizar el estado cuando las dependencias asíncronas terminen
  useEffect(() => {
    if (fontsLoaded) {
      // Aquí en el futuro puedes agregar validaciones de red o tokens de usuario.
      // Por ahora, si las fuentes cargaron, la app está lista.
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  // 5. Función optimizada para ocultar el Splash Screen cuando el UI esté renderizado
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // 6. Pantalla de carga preventiva (Early Return)
  if (!appIsReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0056B3" />
      </View>
    );
  }

  // 7. Retorno del árbol de componentes principal
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      {/* 8. El View notifica a Expo que ya se dibujó la interfaz y puede quitar el Splash */}
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
    </Provider>

  );
}


// 9. Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // Background Light Gray
  },
});


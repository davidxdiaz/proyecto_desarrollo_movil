import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton } from '../components/CustomButton';
import { CustomInput } from '../components/CustomInput';
import { RootStackParamList } from '../navigation/types';

export const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // 1. Gestión de Estado para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Gestión de Estado para los mensajes de error
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 3. Lógica de Validación Estricta
  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    // Expresión regular para validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError('El correo electrónico es obligatorio.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Ingresa un formato de correo válido.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('La contraseña es obligatoria.');
      isValid = false;
    } else if (password.length < 6) {
      // Simulación del error visto en LoginScreen.jpeg
      setPasswordError('Contraseña inválida. Por favor, inténtalo de nuevo.');
      isValid = false;
    }

    return isValid;
  };


  
  // 4. Manejador del evento de inicio de sesión
  const handleLogin = () => {
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Navegamos al conjunto de pestañas, reemplazando la pantalla de Login
        navigation.replace('MainTabs',{ screen: 'Home' }); 
      }, 1500);
    }
  };

  // 5. Renderizado de la Interfaz
  return (
    <SafeAreaView style={styles.safeArea}>
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Tarjeta principal con acento vertical */}
        <View style={styles.card}>
          
          {/* Círculo azul simulando el logo */}
          <View style={styles.logoPlaceholder} />
          
          {/* Encabezados tipográficos */}
          <Text style={styles.title}>Archivo Clínico Familiar</Text>
          <Text style={styles.subtitle}>Accede a tus registros médicos</Text>

          {/* Formulario */}
          <View style={styles.formContainer}>
            <CustomInput
              label="Correo Electrónico"
              placeholder="ejemplo@correo.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError(''); // Limpia el error al escribir
              }}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Ionicons name="mail-outline" size={20} color="#727784" />}
            />

            <CustomInput
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError(''); // Limpia el error al escribir
              }}
              error={passwordError}
              secureTextEntry
              leftIcon={<Ionicons name="lock-closed-outline" size={20} color={passwordError ? '#DC3545' : '#727784'} />}
            />

            {/* Botón de acción principal */}
            <View style={styles.buttonContainer}>
              <CustomButton 
                title="Iniciar Sesión" 
                onPress={handleLogin} 
                isLoading={isLoading} 
              />
            </View>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// 6. Sistema de Diseño y Flexbox
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Background Light Gray
  },
  container: {
    flex: 1,
    paddingTop:16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16, // Margen lateral estándar del Grid
  },
  card: {
    backgroundColor: '#FFFFFF', // Surface White
    borderRadius: 16,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#0056B3', // Acento vertical Primary Blue
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3, // Sombra para Android (Level 1 Surface)
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0056B3', // Primary Blue
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Work Sans',
    fontSize: 22, // headline-md
    fontWeight: '600',
    color: '#0056B3', // Primary Blue
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 14, // body-md
    color: '#424752', // on-surface-variant
    marginBottom: 32,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: 16,
  }
});
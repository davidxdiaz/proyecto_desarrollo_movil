import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/types';

// 1. Subcomponente: Fila de Opción de Ajustes
// Altamente reutilizable para cualquier configuración futura
interface SettingsOptionProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isDestructive?: boolean; // Para pintar de rojo acciones de peligro
  hasSwitch?: boolean;     // Para mostrar un Toggle en lugar de una flecha
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  isDestructive = false,
  hasSwitch = false,
  switchValue = false,
  onSwitchChange,
}) => {
  // Determinamos el color basado en si es una acción destructiva (ej. Cerrar sesión)
  const itemColor = isDestructive ? '#DC3545' : '#191c1d'; // Error Red vs on-surface
  const iconColor = isDestructive ? '#DC3545' : '#727784'; // Error Red vs outline

  return (
    <TouchableOpacity 
      style={styles.optionContainer} 
      onPress={onPress} 
      disabled={hasSwitch || !onPress}
      activeOpacity={0.7}
    >
      <View style={styles.optionIconWrapper}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      
      <View style={styles.optionTextContent}>
        <Text style={[styles.optionTitle, { color: itemColor }]}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>

      {/* Renderizado condicional: Switch (Toggle) o Flecha de navegación */}
      {hasSwitch ? (
        <Switch
          trackColor={{ false: '#E1E3E4', true: '#0056B3' }} // surface-variant vs Primary Blue
          thumbColor="#FFFFFF"
          onValueChange={onSwitchChange}
          value={switchValue}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#c2c6d4" /> // outline-variant[cite: 1]
      )}
    </TouchableOpacity>
  );
};

// 2. Componente Principal
export const AjustesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // Estado local para simular la activación de notificaciones y biometría
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);

  const handleLogout = () => {
    console.log('Limpiando tokens y cerrando sesión...');
    
    // Reseteamos por completo el árbol de navegación
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Encabezado de la pantalla */}
        <View style={styles.header}>
          <Text style={styles.title}>Ajustes</Text>
        </View>

        {/* Sección de Perfil del Usuario */}
        <View style={styles.profileCard}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
            style={styles.avatar} 
            contentFit="cover"
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>David Xavier</Text>
            <Text style={styles.profileEmail}>david.x@correo.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={18} color="#0056B3" />
          </TouchableOpacity>
        </View>

        {/* Bloque de Configuraciones Generales */}
        <Text style={styles.sectionTitle}>Cuenta y Seguridad</Text>
        <View style={styles.settingsBlock}>
          <SettingsOption 
            icon="person-outline" 
            title="Información personal" 
            onPress={() => console.log('Ir a info')} 
          />
          <SettingsOption 
            icon="shield-checkmark-outline" 
            title="Privacidad y Datos" 
            onPress={() => console.log('Ir a privacidad')} 
          />
          <SettingsOption 
            icon="finger-print-outline" 
            title="Acceso Biométrico" 
            subtitle="Usa Face ID o Huella para entrar"
            hasSwitch
            switchValue={biometricsEnabled}
            onSwitchChange={setBiometricsEnabled}
          />
        </View>

        {/* Bloque de Preferencias */}
        <Text style={styles.sectionTitle}>Preferencias</Text>
        <View style={styles.settingsBlock}>
          <SettingsOption 
            icon="notifications-outline" 
            title="Notificaciones Push" 
            hasSwitch
            switchValue={notificationsEnabled}
            onSwitchChange={setNotificationsEnabled}
          />
          <SettingsOption 
            icon="color-palette-outline" 
            title="Apariencia" 
            subtitle="Claro"
            onPress={() => console.log('Cambiar tema')} 
          />
        </View>

        {/* Bloque de Soporte y Salida */}
        <Text style={styles.sectionTitle}>Soporte</Text>
        <View style={styles.settingsBlock}>
          <SettingsOption 
            icon="help-circle-outline" 
            title="Centro de ayuda" 
            onPress={() => console.log('Ayuda')} 
          />
          <SettingsOption 
            icon="log-out-outline" 
            title="Cerrar sesión" 
            isDestructive 
            onPress={handleLogout} 
          />
        </View>

        {/* Footer de versión para dar un toque técnico y profesional */}
        <Text style={styles.versionText}>Archivo Clínico Familiar v1.0.0</Text>
        
      </ScrollView>
    </SafeAreaView>
  );
};

// 3. Sistema de Diseño y Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Background Light Gray[cite: 1]
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24, // Ritmo vertical lg[cite: 1]
    marginTop: 8,
  },
  title: {
    fontFamily: 'Work Sans',
    fontSize: 28, // headline-lg[cite: 1]
    fontWeight: '600',
    color: '#191c1d',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Surface White[cite: 1]
    borderRadius: 16, // rounded-xl[cite: 1]
    padding: 16,
    marginBottom: 32, // xl spacing[cite: 1]
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Work Sans',
    fontSize: 18, // title-lg[cite: 1]
    fontWeight: '600',
    color: '#191c1d',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#727784',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4FA', // Contenedor muy claro basado en el azul primario
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontSize: 14, // body-md[cite: 1]
    fontWeight: '600',
    color: '#424752', // on-surface-variant[cite: 1]
    marginBottom: 12,
    marginLeft: 4,
    textTransform: 'uppercase', // Buena práctica UI para separar secciones
    letterSpacing: 0.5,
  },
  settingsBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden', // Asegura que los items internos no se salgan del borde redondeado
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4', // Separador sutil
  },
  optionIconWrapper: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  optionTextContent: {
    flex: 1,
    justifyContent: 'center',
  },
  optionTitle: {
    fontFamily: 'Inter',
    fontSize: 16, // body-lg[cite: 1]
    fontWeight: '500',
  },
  optionSubtitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#727784',
    marginTop: 2,
  },
  versionText: {
    fontFamily: 'Inter',
    fontSize: 12, // label-md[cite: 1]
    color: '#c2c6d4', // outline-variant[cite: 1]
    textAlign: 'center',
    marginTop: 16,
  }
});
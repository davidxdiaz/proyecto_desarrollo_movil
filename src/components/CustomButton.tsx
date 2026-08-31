import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';

// 1. Tipado estricto con TypeScript (La "Interfaz")
export interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost'; // Opcional, por defecto será 'primary'
  isLoading?: boolean; // Para mostrar un spinner cuando la app esté cargando datos
  disabled?: boolean; // Para evitar múltiples clics
}

// 2. Definición del Componente Funcional
export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary', // Valor por defecto
  isLoading = false,
  disabled = false,
}) => {
  // 3. Renderizado Condicional de Estilos
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'ghost':
        return styles.ghostButton;
      case 'primary':
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    if (variant === 'primary') return styles.primaryText;
    return styles.secondaryText; // El texto secundario y ghost comparten color en este diseño
  };

  // 4. Retorno del JSX
  return (
    <TouchableOpacity
      // Combinamos estilos base con los condicionales. Si está deshabilitado, bajamos la opacidad.
      style={[styles.buttonBase, getButtonStyle(), disabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#ffffff' : '#0056b3'} />
      ) : (
        <Text style={[styles.textBase, getTextStyle()]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// 5. Hoja de Estilos (Flexbox y Sistema de Diseño)
const styles = StyleSheet.create({
  // Estructura base para todos los botones
  buttonBase: {
    height: 48, // Altura dictada por el sistema de diseño
    borderRadius: 12, // Radio de 12px para botones
    justifyContent: 'center', // Centra el contenido verticalmente usando Flexbox
    alignItems: 'center', // Centra el contenido horizontalmente usando Flexbox
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  // Variante: Primario (Fondo azul, sin borde)
  primaryButton: {
    backgroundColor: '#0056b3', // Primary Container del sistema de colores
  },
  // Variante: Secundario (Fondo transparente, borde azul de 1.5px)
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#0056b3',
  },
  // Variante: Ghost (Sin fondo, sin borde)
  ghostButton: {
    backgroundColor: 'transparent',
  },
  // Tipografía base para botones (Inter, peso 600)
  textBase: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
  },
  // Color de texto para botón primario
  primaryText: {
    color: '#ffffff',
  },
  // Color de texto para variantes secundarias
  secondaryText: {
    color: '#0056b3',
  },
  // Estado deshabilitado
  disabledButton: {
    opacity: 0.5,
  },
});
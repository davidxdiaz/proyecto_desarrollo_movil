import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

// 1. Interfaz de Props: Extendemos TextInputProps para heredar las propiedades nativas
export interface CustomInputProps extends TextInputProps {
  label: string; // La etiqueta siempre debe estar visible (Requisito de diseño)
  error?: string; // Mensaje de error opcional (si existe, el input cambia a estado de error)
  leftIcon?: React.ReactNode; // Permite inyectar un icono a la izquierda (ej. correo o candado)
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  leftIcon,
  ...props // Operador rest para agrupar el resto de props (ej. placeholder, secureTextEntry)
}) => {
  // 2. Gestión de Estado Local para el Foco
  const [isFocused, setIsFocused] = useState(false);

  // 3. Renderizado Condicional del Estilo del Contenedor
  const getContainerStyle = () => {
    if (error) {
      return styles.inputContainerError; // Estado de Error: Borde rojo de 2px
    }
    if (isFocused) {
      return styles.inputContainerActive; // Estado Activo: Borde azul de 2px
    }
    return styles.inputContainerDefault; // Estado por Defecto: Borde gris de 1px
  };

  // 4. Retorno del JSX
  return (
    <View style={styles.wrapper}>
      {/* Etiqueta superior */}
      <Text style={styles.label}>{label}</Text>

      {/* Contenedor principal del input y su icono */}
      <View style={[styles.inputContainer, getContainerStyle()]}>
        {/* Renderizado condicional del icono si se proporciona */}
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        
        <TextInput
          style={styles.input}
          placeholderTextColor="#727784"
          // Manejadores de eventos para actualizar el estado visual
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          // Propagamos el resto de las propiedades nativas al TextInput
          {...props}
        />
      </View>

      {/* Renderizado condicional del mensaje de error */}
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

// 5. Sistema de Diseño y Flexbox
const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16, // Espaciado base (Fluid Grid)
    width: '100%',
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: '#191c1d',
    marginBottom: 8, // Separación entre el label y la caja
  },
  inputContainer: {
    flexDirection: 'row', // Flexbox: Alinea icono y campo de texto horizontalmente
    alignItems: 'center', // Flexbox: Centra verticalmente los elementos internos
    backgroundColor: '#FFFFFF', // Surface White
    borderRadius: 12, // Forma redondeada amigable
    minHeight: 48, // Touch target accesible
    paddingHorizontal: 12,
  },
  inputContainerDefault: {
    borderWidth: 1,
    borderColor: '#E0E0E0', // Borde gris claro por defecto
  },
  inputContainerActive: {
    borderWidth: 2,
    borderColor: '#0056B3', // Primary Blue al hacer foco
  },
  inputContainerError: {
    borderWidth: 2,
    borderColor: '#DC3545', // Error Red si hay fallo
  },
  iconContainer: {
    marginRight: 8, // Separación entre el icono y el texto
  },
  input: {
    flex: 1, // Flexbox: Permite que el input ocupe todo el espacio sobrante
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#191c1d',
    height: '100%', // Se ajusta a los 48px del contenedor
  },
  errorText: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#DC3545', // Error Red
    marginTop: 4,
  },
});
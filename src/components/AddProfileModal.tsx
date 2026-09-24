import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { saveProfileToSupabase } from '../store/slices/profilesSlice';
import { AppDispatch } from '../store/store';
import { CustomInput } from './CustomInput'; // Reutilizamos el componente que creamos antes

// 1. Interfaz estricta para las props del Modal
interface AddProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddProfileModal = ({ visible, onClose }: AddProfileModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // 2. Estados locales del formulario
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [details, setDetails] = useState('');
  const [nextRevision, setNextRevision] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ name: '', age: '' });

  // 3. Lógica de validación
  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: '', age: '' };

    if (!name.trim()) {
      newErrors.name = 'El nombre es obligatorio.';
      isValid = false;
    }
    
    // Validamos que la edad sea un número válido
    if (!age.trim() || isNaN(Number(age)) || Number(age) < 0) {
      newErrors.age = 'Ingresa una edad válida.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 4. Manejador de guardado asíncrono
  const handleSave = async () => {
    if (validateForm()) {
      setIsLoading(true);
      
      // Construimos el payload. El avatar y los detalles van "quemados" por ahora.
      const newProfile = {
        name: name.trim(),
        age: Number(age),
        nextRevision: nextRevision.trim() || 'No programada',
        type: 'pediatric' as const,
        details: details,
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
        isUpToDate: true,
      };

      try {
        // Despachamos el Thunk y usamos .unwrap() para atrapar errores de la promesa
        await dispatch(saveProfileToSupabase(newProfile)).unwrap();
        
        // Limpiamos el formulario y cerramos el modal tras el éxito
        setName('');
        setAge('');
        setNextRevision('');
        setErrors({ name: '', age: '' });
        onClose();
      } catch (error) {
        console.error('Error al guardar:', error);
        setErrors(prev => ({ ...prev, name: 'Error al guardar en el servidor.' }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    // 5. Componente Modal Nativo
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <KeyboardAvoidingView 
        style={styles.overlay} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* 6. Contenedor de la Tarjeta Modal */}
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Nuevo Perfil Familiar</Text>
          <Text style={styles.subtitle}>Ingresa los datos médicos básicos.</Text>

          {/* 7. Reutilización de CustomInput */}
          <CustomInput
            label="Nombre completo"
            placeholder="Ej. Zoé"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors(prev => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            leftIcon={<Ionicons name="person-outline" size={20} />}
          />

          <CustomInput
            label="Edad (años)"
            placeholder="Ej. 3"
            value={age}
            onChangeText={(text) => {
              setAge(text);
              setErrors(prev => ({ ...prev, age: '' }));
            }}
            keyboardType="numeric"
            error={errors.age}
            leftIcon={<Ionicons name="calendar-outline" size={20} />}
          />

          <CustomInput
            label="Siguiente Revisión (Opcional)"
            placeholder="Ej. 15 Oct"
            value={nextRevision}
            onChangeText={setNextRevision}
            leftIcon={<Ionicons name="medical-outline" size={20} />}
          />

          <CustomInput
            label="Detalles"
            placeholder="Perfil Pediátrico"
            value={details}
            onChangeText={setDetails}
            leftIcon={<Ionicons name="medical-outline" size={20} />}
          />

          {/* 8. Botones de Acción */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, styles.saveButton]} 
              onPress={handleSave}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.saveButtonText}>Guardar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// 9. Estilos estructurados según DESIGN.md
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurece el fondo
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, // margin-mobile
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#ffffff', // surface-container-lowest
    borderRadius: 16, // rounded-xl[cite: 6]
    padding: 24, // lg spacing[cite: 6]
    // Level 2 Ambient shadow[cite: 6]
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  title: {
    fontFamily: 'Work Sans',
    fontSize: 22, // headline-md[cite: 6]
    fontWeight: '600',
    color: '#191c1d', // on-surface[cite: 6]
    marginBottom: 8, // xs spacing[cite: 6]
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 14, // body-md[cite: 6]
    color: '#424752', // on-surface-variant[cite: 6]
    marginBottom: 24, // lg spacing[cite: 6]
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16, // md spacing[cite: 6]
  },
  button: {
    flex: 1,
    height: 48, // 48px Touch Target mínimo exigido[cite: 6]
    borderRadius: 12, // rounded-lg para botones[cite: 6]
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f5', // surface-container-low[cite: 6]
    marginRight: 8,
  },
  cancelButtonText: {
    fontFamily: 'Inter',
    fontSize: 16, // body-lg[cite: 6]
    fontWeight: '600',
    color: '#424752', // on-surface-variant[cite: 6]
  },
  saveButton: {
    backgroundColor: '#0056b3', // primary-container[cite: 6]
    marginLeft: 8,
  },
  saveButtonText: {
    fontFamily: 'Inter',
    fontSize: 16, // body-lg[cite: 6]
    fontWeight: '600',
    color: '#ffffff', // on-primary[cite: 6]
  }
});
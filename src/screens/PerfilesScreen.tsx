import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileCard } from '../components/ProfileCard';

export const PerfilesScreen = () => {
  // 1. Simulación de Datos (Mock Data) provenientes de una API o Base de Datos Local
  const perfilesFamiliares = [
    {
      id: '1',
      name: 'David',
      type: 'tutor' as const,
      age: 28, 
      details: 'Tipo de sangre: O+',
      avatarUrl: 'https://i.pravatar.cc/150?img=11',
      isUpToDate: true,
    },
    {
      id: '2',
      name: 'Zoé',
      type: 'pediatric' as const,
      age: 3,
      details: 'Pediatra: Dra. Salinas',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
      nextRevision: '15 Oct',
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 2. Encabezado de la Pantalla */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Perfiles Familiares</Text>
            <Text style={styles.subtitle}>Gestiona la información médica de tu familia.</Text>
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Nuevo</Text>
          </TouchableOpacity>
        </View>

        {/* 3. Mapeo de la Lista de Perfiles */}
        {perfilesFamiliares.map((perfil) => (
          <ProfileCard
            key={perfil.id}
            name={perfil.name}
            type={perfil.type}
            age={perfil.age}
            details={perfil.details}
            avatarUrl={perfil.avatarUrl}
            isUpToDate={perfil.isUpToDate}
            nextRevision={perfil.nextRevision}
          />
        ))}

        {/* 4. Tarjeta "Ghost" para agregar nuevo miembro */}
        <TouchableOpacity style={styles.addMemberCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-add-outline" size={24} color="#727784" />
          </View>
          <Text style={styles.addMemberText}>Agregar miembro</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

// 5. Estilos de la Pantalla Principal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Background Light Gray
  },
  scrollContent: {
    padding: 16, // Margen de 16px para el Grid
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24, // Separación "lg" (24px) según el ritmo vertical
  },
  headerTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontFamily: 'Work Sans',
    fontSize: 22, // headline-md[cite: 1]
    fontWeight: '600',
    color: '#191c1d',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#424752',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#0056B3',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter',
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  addMemberCard: {
    borderWidth: 2,
    borderColor: '#E1E3E4',
    borderStyle: 'dashed', // Borde punteado para indicar una zona de "drop" o "vacía"
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EDEEEF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  addMemberText: {
    fontFamily: 'Inter',
    fontSize: 16,
    color: '#424752',
    fontWeight: '500',
  }
});
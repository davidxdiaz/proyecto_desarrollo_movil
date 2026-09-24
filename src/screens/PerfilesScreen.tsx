import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// 1. Importaciones de Redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddProfileModal } from '../components/AddProfileModal';
import { ProfileCard } from '../components/ProfileCard';


import { fetchProfilesFromSupabase } from '../store/slices/profilesSlice';
import { AppDispatch, RootState } from '../store/store';

export const PerfilesScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  // 2. Suscripción al estado global
  const { profiles: perfilesFamiliares, status: loadingStatus } = useSelector((state: RootState) => state.profiles)
  const dispatch = useDispatch<AppDispatch>();

  const handleAddNewProfile = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    // Solo hacemos fetch si el estado es 'idle' (inactivo inicial)
    if (loadingStatus === 'idle') {
      dispatch(fetchProfilesFromSupabase());
    }
  }, [loadingStatus, dispatch]);

  if (loadingStatus === 'loading' && perfilesFamiliares.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0056B3" />
        <Text style={styles.loadingText}>Cargando historiales médicos...</Text>
      </SafeAreaView>
    );
  }
  // 4. Renderizado individual para optimizar memoria
  const renderItem = ({ item }: { item: any }) => (
    <ProfileCard
      key={item.id}
      name={item.name}
      type={item.type}
      age={item.age}
      details={item.details}
      avatarUrl={item.avatarUrl}
      isUpToDate={item.isUpToDate}
      nextRevision={item.nextRevision}
    />
  );

  // 5. Botón Ghost renderizado al final de la lista
  const ListFooter = () => (
    <TouchableOpacity style={styles.addMemberCard} onPress={handleAddNewProfile}>
      <View style={styles.iconCircle}>
        <Ionicons name="person-add-outline" size={24} color="#727784" />
      </View>
      <Text style={styles.addMemberText}>Agregar miembro</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Perfiles Familiares</Text>
          <Text style={styles.subtitle}>Gestiona la información médica de tu familia.</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddNewProfile}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Nuevo</Text>
        </TouchableOpacity>
      </View>

      {/* 6. FlatList reemplaza al ScrollView con .map() */}
      <FlatList
        data={perfilesFamiliares}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContent}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
      />
      <AddProfileModal 
        visible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
      />
    </SafeAreaView>
  );
};

// ... (Conserva los mismos estilos StyleSheet.create que ya tenías)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Level 0 (Background)
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24, // Ritmo lg
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerTextContainer: { flex: 1, paddingRight: 16 },
  title: {
    fontFamily: 'Work Sans',
    fontSize: 22,
    fontWeight: '600',
    color: '#191c1d',
    marginBottom: 4,
  },
  subtitle: { fontFamily: 'Inter', fontSize: 14, color: '#424752' },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#0056B3', // Primary Blue[cite: 2]
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 44, // Touch target accesible[cite: 2]
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
    borderStyle: 'dashed',
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
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter',
    marginTop: 16,
    color: '#424752', // on-surface-variant
  },
});
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Obtenemos el ancho de la pantalla para calcular las columnas del Grid
const { width } = Dimensions.get('window');

// 1. Subcomponente: Tarjeta de Acción Rápida
interface ActionCardProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, iconName, onPress }) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.actionIconContainer}>
      <Ionicons name={iconName} size={28} color="#727784" />
    </View>
    <Text style={styles.actionCardText}>{title}</Text>
  </TouchableOpacity>
);

// 2. Subcomponente: Ítem de Historial de Documento
interface DocumentItemProps {
  title: string;
  patient: string;
  date: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ title, patient, date, iconName }) => (
  <TouchableOpacity style={styles.documentItem} activeOpacity={0.7}>
    <View style={styles.documentIconWrapper}>
      <Ionicons name={iconName} size={24} color="#0056B3" />
    </View>
    <View style={styles.documentTextContent}>
      <Text style={styles.documentTitle}>{title}</Text>
      <Text style={styles.documentSubtitle}>Paciente: {patient}</Text>
    </View>
    <View style={styles.documentMeta}>
      <Text style={styles.documentDate}>{date}</Text>
      <Ionicons name="ellipsis-vertical" size={20} color="#727784" />
    </View>
  </TouchableOpacity>
);

// 3. Componente Principal
export const DocumentosScreen = () => {
  // Mock data para el historial, incluyendo perfiles familiares
  const documentHistory = [
    { id: '1', title: 'Receta Pediátrica', patient: 'Zoé', date: '22 Oct', icon: 'document-text-outline' as const },
    { id: '2', title: 'Examen de Sangre', patient: 'David', date: '15 Oct', icon: 'flask-outline' as const },
    { id: '3', title: 'Cartilla de Vacunación', patient: 'Zoé', date: '10 Oct', icon: 'medical-outline' as const },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Encabezado */}
        <View style={styles.header}>
          <View style={styles.headerTextWrapper}>
            <Text style={styles.title}>Documentos Recientes</Text>
            <Text style={styles.subtitle}>Gestiona y revisa tu historial clínico.</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={24} color="#0056B3" />
          </TouchableOpacity>
        </View>

        {/* Grid de Acciones Rápidas */}
        <View style={styles.gridContainer}>
          <ActionCard 
            title="Añadir nuevo documento" 
            iconName="document" 
            onPress={() => console.log('Añadir')} 
          />
          <ActionCard 
            title="Escanear receta" 
            iconName="scan-outline" 
            onPress={() => console.log('Escanear')} 
          />
          <ActionCard 
            title="Importar archivo" 
            iconName="folder-open-outline" 
            onPress={() => console.log('Importar')} 
          />
        </View>

        {/* Sección de Historial */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Historial de escaneos</Text>
          
          {documentHistory.map((doc) => (
            <DocumentItem 
              key={doc.id}
              title={doc.title}
              patient={doc.patient}
              date={doc.date}
              iconName={doc.icon}
            />
          ))}
        </View>

      </ScrollView>

      {/* Botón Flotante (FAB) como se ve en DocumentosScreen.jpeg */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// 4. Sistema de Diseño y Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Background Light Gray
  },
  scrollContent: {
    padding: 16, // Margen estándar
    paddingBottom: 80, // Espacio para que el FAB no tape el último elemento
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24, // Ritmo vertical lg
  },
  headerTextWrapper: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontFamily: 'Work Sans',
    fontSize: 22, // headline-md[cite: 1]
    fontWeight: '600',
    color: '#191c1d', // on-surface[cite: 1]
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 14, // body-md[cite: 1]
    color: '#424752', // on-surface-variant[cite: 1]
  },
  filterButton: {
    padding: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que los elementos pasen a la siguiente línea
    justifyContent: 'space-between',
    marginBottom: 32, // xl spacing[cite: 1]
  },
  actionCard: {
    // Calculamos el ancho para que quepan 2 tarjetas con un pequeño espacio en medio
    width: (width - 48) / 2, 
    backgroundColor: '#FFFFFF', // Surface White[cite: 1]
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E1E3E4', // surface-variant[cite: 1]
    borderStyle: 'dashed', // Para dar el efecto de "zona de acción"
  },
  actionIconContainer: {
    marginBottom: 12,
  },
  actionCardText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#727784',
    textAlign: 'center',
    fontWeight: '500',
  },
  historySection: {
    flex: 1,
  },
  sectionTitle: {
    fontFamily: 'Work Sans',
    fontSize: 18, // title-lg[cite: 1]
    fontWeight: '600',
    color: '#424752',
    marginBottom: 16,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Level 1 (Cards/Surface)[cite: 1]
  },
  documentIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F4FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  documentTextContent: {
    flex: 1,
  },
  documentTitle: {
    fontFamily: 'Inter',
    fontSize: 16, // body-lg[cite: 1]
    fontWeight: '600',
    color: '#191c1d',
    marginBottom: 4,
  },
  documentSubtitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#727784',
  },
  documentMeta: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 40,
  },
  documentDate: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#727784',
    marginBottom: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    width: 64,
    height: 64,
    borderRadius: 20, // Forma más cuadrada/redondeada como en tu imagen
    backgroundColor: '#0056B3', // Primary Blue[cite: 1]
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0056B3',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
});
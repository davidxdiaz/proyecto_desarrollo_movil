import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. Subcomponente: Tarjeta de Alerta Médica (Reutilizable en esta vista)
interface AlertCardProps {
  title: string;
  subtitle: string;
  date: string;
  type: 'urgent' | 'success' | 'info';
  icon: keyof typeof Ionicons.glyphMap;
  tagText?: string;
}

const AlertCard: React.FC<AlertCardProps> = ({ title, subtitle, date, type, icon, tagText }) => {
  // Renderizado condicional basado en el sistema de colores
  const getAccentColor = () => {
    switch (type) {
      case 'urgent': return '#DC3545'; // Error Red
      case 'success': return '#28A745'; // Success Green
      case 'info':
      default: return '#0056B3'; // Primary Blue
    }
  };

  const accentColor = getAccentColor();

  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.cardTitle, { color: accentColor }]}>{title}</Text>
        {tagText && (
          <View style={[styles.tag, { backgroundColor: type === 'urgent' ? '#FADBD8' : '#EAFAF1' }]}>
            <Text style={[styles.tagText, { color: accentColor }]}>{tagText}</Text>
          </View>
        )}
      </View>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
      <View style={styles.cardFooter}>
        <Ionicons name={icon} size={16} color="#727784" style={styles.cardIcon} />
        <Text style={styles.cardDate}>{date}</Text>
      </View>
    </View>
  );
};

// 2. Componente Principal de la Pantalla
export const HomeScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      
      {/* Sección 1: Encabezado de Bienvenida */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Bienvenido de nuevo</Text>
          <Text style={styles.nameText}>Hola, David</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#191c1d" />
        </TouchableOpacity>
      </View>

      {/* Sección 2: Botón de Acción Principal (Quick Action) */}
      <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
        <Ionicons name="add" size={20} color="#FFFFFF" />
        <Text style={styles.primaryButtonText}>Nuevo Registro</Text>
      </TouchableOpacity>

      {/* Sección 3: Tarjetas de Notificaciones Activas */}
      <View style={styles.section}>
        <AlertCard 
          title="Próxima Cita"
          subtitle="Pediatría General (Para: Zoé)"
          date="Jueves, 24 Oct - 10:30 AM"
          type="urgent"
          icon="time-outline"
          tagText="En 2 días"
        />
        
        <AlertCard 
          title="Recordatorio de Vacunas"
          subtitle="Triple Viral (SRP) - Paciente: Zoé"
          date="Pendiente de agendar"
          type="success"
          icon="medical-outline"
          tagText="Pendiente"
        />
      </View>

      {/* Sección 4: Resumen de Salud (Lista) */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Resumen de Salud</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>Ver todos &gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Ítem de lista de ejemplo */}
      <TouchableOpacity style={styles.listItem}>
        <View style={styles.listIconContainer}>
          <Ionicons name="document-text-outline" size={24} color="#0056B3" />
        </View>
        <View style={styles.listTextContainer}>
          <Text style={styles.listTitle}>Resultados de Laboratorio</Text>
          <Text style={styles.listSubtitle}>Examen de sangre (David)</Text>
        </View>
        <Text style={styles.listTime}>Hace 2 días</Text>
        <Ionicons name="chevron-forward" size={20} color="#727784" />
      </TouchableOpacity>

    </ScrollView>
  );
};

// 3. Sistema de Diseño y Flexbox
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Background Light Gray
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  greetingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#424752',
  },
  nameText: {
    fontFamily: 'Work Sans',
    fontSize: 28, // headline-lg[cite: 1]
    fontWeight: '600',
    color: '#0056B3',
  },
  notificationButton: {
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#0056B3', // Primary Blue[cite: 1]
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // Nivel 1 Surface[cite: 1]
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  cardSubtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#191c1d',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    marginRight: 6,
  },
  cardDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#424752',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Work Sans',
    fontSize: 18, // title-lg[cite: 1]
    fontWeight: '600',
    color: '#191c1d',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#0056B3',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#0056B3',
    marginBottom: 12,
  },
  listIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F4FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listTextContainer: {
    flex: 1,
  },
  listTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#191c1d',
  },
  listSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#727784',
  },
  listTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#727784',
    marginRight: 8,
  }
});
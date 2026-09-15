import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// 1. Tipado Estricto de los Datos del Perfil
export interface ProfileProps {
  name: string;
  type: 'tutor' | 'pediatric';
  age: number;
  details: string; // Ej: "Tipo de sangre: O+" o "Pediatra: Dra. Salinas"
  avatarUrl?: string;
  isUpToDate?: boolean; // Para el punto verde del tutor
  nextRevision?: string; // Para la tarjeta pediátrica
}

export const ProfileCard: React.FC<ProfileProps> = ({
  name,
  type,
  age,
  details,
  avatarUrl,
  isUpToDate,
  nextRevision,
}) => {
  // 2. Lógica Condicional: Evaluamos el tipo de perfil para definir colores
  const isPediatric = type === 'pediatric';
  // Primary Blue (#0056B3) para Tutor, Success Green (#28A745) para Pediátrico
  const accentColor = isPediatric ? '#28A745' : '#0056B3'; 

  return (
    <View style={[styles.cardContainer, { borderLeftColor: accentColor }]}>
      <View style={styles.headerRow}>
        {/* Renderizado de la imagen usando expo-image para mejor rendimiento */}
        <Image 
          source={{ uri: avatarUrl || 'https://via.placeholder.com/150' }} 
          style={styles.avatar} 
          contentFit="cover"
        />
        
        <View style={styles.infoColumn}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            {/* Tag tipo píldora (Pill shape) con renderizado condicional de color */}
            <View style={[styles.tag, { backgroundColor: isPediatric ? '#E8F5E9' : '#E6F0FA' }]}>
              <Text style={[styles.tagText, { color: accentColor }]}>
                {isPediatric ? 'PEDIÁTRICO' : 'TUTOR LEGAL'}
              </Text>
            </View>
          </View>
          <Text style={styles.detailsText}>{age} años • {details}</Text>
        </View>

        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={20} color="#424752" />
        </TouchableOpacity>
      </View>

      {/* 3. Renderizado Condicional del Contenido Específico */}
      {isPediatric ? (
        <View style={styles.pediatricExtra}>
          <View style={styles.subCard}>
            <Ionicons name="medical-outline" size={16} color="#0056B3" />
            <Text style={styles.subCardText}>Cartilla de vacunación</Text>
            <Text style={styles.subCardDate}>Actualizada ayer</Text>
          </View>
          {nextRevision && (
            <View style={styles.subCard}>
              <Ionicons name="calendar-outline" size={16} color="#727784" />
              <Text style={styles.subCardText}>Próxima revisión: {nextRevision}</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.tutorExtra}>
          {isUpToDate && (
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Todo al día</Text>
            </View>
          )}
        </View>
      )}

      {/* Botón de acción final dinámico */}
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>
          {isPediatric ? 'Ver detalles pediátricos' : 'Ver detalles'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// 4. Sistema de Diseño y Flexbox
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF', // Surface White
    borderRadius: 16, // rounded-xl para contenedores médicos
    padding: 16,
    borderLeftWidth: 4, // Barra de acento vertical de 4px
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24, // 50% para hacerlo circular
    marginRight: 12,
  },
  infoColumn: {
    flex: 1, // Toma todo el espacio disponible empujando el botón de menú a la derecha
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Work Sans',
    fontSize: 18, // title-lg
    fontWeight: '600',
    color: '#191c1d',
    marginRight: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999, // Pill-shape para diferenciar de botones interactivos
  },
  tagText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '600',
  },
  detailsText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#424752', // on-surface-variant
  },
  menuButton: {
    padding: 4,
  },
  pediatricExtra: {
    marginTop: 8,
  },
  subCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', // Contenedores internos grises
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  subCardText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#191c1d',
    marginLeft: 8,
    flex: 1,
  },
  subCardDate: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#727784',
  },
  tutorExtra: {
    marginTop: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#28A745', // Success Green
    marginRight: 6,
  },
  statusText: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#424752',
  },
  actionButton: {
    marginTop: 8,
    alignItems: 'flex-end', // Alinea el botón a la derecha
  },
  actionButtonText: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
    color: '#0056B3',
  },
});
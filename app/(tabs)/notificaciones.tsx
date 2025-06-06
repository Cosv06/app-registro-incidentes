import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function Notificaciones() {
  const { from } = useLocalSearchParams();
  const router = useRouter();

  const handleCerrar = () => {
    if (from) {
      router.push(`/${from}`);
    } else {
      router.back(); // fallback si no se pasa 'from'
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón de cierre en la esquina */}
      <Pressable onPress={handleCerrar} style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </Pressable>

      <Text style={styles.title}>Historial de notificaciones</Text>
      <Text style={styles.subtitle}>(Aquí aparecerán tus notificaciones recientes)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  closeText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
});

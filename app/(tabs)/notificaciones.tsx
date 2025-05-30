import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Notificaciones() {
  return (
    <View style={styles.container}>
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

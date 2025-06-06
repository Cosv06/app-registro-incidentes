import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useNotifications } from '../../context/NotificationContext';

export default function SeguimientoActivoScreen() {
  const router = useRouter();
  const { hasNotifications, markAsRead } = useNotifications();

  const actividades = [
    'Implementación del área de laboratorio',
    'Desfibrilador descompuesto',
    'MP de monitores',
    'Inoperatividad de acelerador lineal'
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftIcons}>
          <Pressable onPress={() => router.push('/home')}>
            <FontAwesome name="home" size={24} color="#000" />
          </Pressable>
          <Pressable
            onPress={() => {
              markAsRead();
              router.push({ pathname: '/notificaciones', params: { from: 'seguimiento-activo' } });
            }}
            style={styles.bellWrapper}
          >
            <FontAwesome name="bell" size={24} color="#000" />
            {hasNotifications && <View style={styles.notificationDot} />}
          </Pressable>
        </View>
        <Image source={require('../../assets/imagenesApp/logo-creo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Seguimiento activo</Text>

      {actividades.map((actividad, index) => (
        <TouchableOpacity key={index} style={styles.boton}>
          <Text style={styles.botonTexto}>{actividad}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  leftIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  bellWrapper: {
    position: 'relative',
    marginLeft: 15,
  },
  notificationDot: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#BCA892',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

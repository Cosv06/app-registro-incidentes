import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNotifications } from '../../context/NotificationContext';

export default function NuevoRegistro() {
  const router = useRouter();
  const { hasNotifications, markAsRead } = useNotifications();

  return (
    <View style={styles.container}>
      {/* Iconos arriba */}
      <View style={styles.header}>
        <View style={styles.leftIcons}>
          <Pressable onPress={() => router.push('/home')}>
            <FontAwesome name="home" size={24} color="#000" />
          </Pressable>

          <Pressable
            onPress={() => {
              markAsRead();
              router.push({ pathname: '/notificaciones', params: { from: 'nuevo-registro' } });
            }}
            style={styles.bellWrapper}
          >
            <FontAwesome name="bell" size={24} color="#000" />
            {hasNotifications && <View style={styles.notificationDot} />}
          </Pressable>
        </View>

        <Image
          source={require('../../assets/imagenesApp/logo-creo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Nuevo registro</Text>

      {/* Registro de incidente */}
      <Text style={styles.sectionTitle}>Registro de incidente</Text>
      <TouchableOpacity style={styles.buttonOrange}>
        <Text style={styles.buttonText}>Ingresar por código</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonYellow}>
        <Text style={styles.buttonText}>Escanear código</Text>
      </TouchableOpacity>

      {/* Nuevo informe */}
      <Text style={styles.sectionTitle}>Nuevo informe</Text>
      <TouchableOpacity style={styles.buttonOrange}>
        <Text style={styles.buttonText}>Ingresar por código</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonYellow}>
        <Text style={styles.buttonText}>Escanear código</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0050C8',
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonOrange: {
    backgroundColor: '#E28A1A',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonYellow: {
    backgroundColor: '#E1B529',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

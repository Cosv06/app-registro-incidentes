import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNotifications } from '../../context/NotificationContext';

export default function InventarioScreen() {
  const router = useRouter();
  const { hasNotifications, markAsRead } = useNotifications();

  const areas = [
    'Consulta externa',
    'Medicina oncológica',
    'Diagnóstico por imágenes',
    'Radioncología',
    'Centro quirúrgico',
    'Salud ocupacional',
    'Salud mental',
    'Laboratorio clínico',
    'Ingeniería clínica',
  ];

  return (
    <View style={styles.container}>
      {/* Encabezado superior */}
      <View style={styles.header}>
        <View style={styles.leftIcons}>
          <Pressable onPress={() => router.push('/home')}>
            <FontAwesome name="home" size={24} color="#000" />
          </Pressable>

          <Pressable
            onPress={() => {
              markAsRead();
              router.push({ pathname: '/notificaciones', params: { from: 'inventario' } });
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

      <Text style={styles.title}>Inventario</Text>
      <Text style={styles.subtitle}>Áreas</Text>

      {areas.map((area, index) => (
        <TouchableOpacity key={index} style={styles.buttonGreen}>
          <Text style={styles.buttonText}>{area}</Text>
        </TouchableOpacity>
      ))}
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0050C8',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonGreen: {
    backgroundColor: '#28A745',
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

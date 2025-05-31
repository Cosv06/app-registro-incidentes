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
import { useNotifications } from '../context/NotificationContext';

export default function HomeScreen() {
  const router = useRouter();
  const { hasNotifications, markAsRead } = useNotifications();

  return (
    <View style={styles.container}>
      {/* Encabezado superior */}
      <View style={styles.header}>
        {/* Icono de campana */}
        <Pressable
          onPress={() => {
            markAsRead();
            router.push('/tabs/notificaciones');
          }}
          style={styles.bellWrapper}
        >
          <FontAwesome name="bell" size={24} color="#000" />
          {hasNotifications && <View style={styles.notificationDot} />}
        </Pressable>

        {/* Logo */}
        <Image
          source={require('../assets/imagenesApp/logo-creo.png')}
          style={styles.logo}
        />
      </View>

      {/* Sección de actividades */}
      <Text style={styles.sectionTitle}>Actividades</Text>

      <TouchableOpacity
        style={styles.buttonYellow}
        onPress={() => router.push('/nuevo-registro')}
      >
        <Text style={styles.buttonText}>Nuevo registro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonYellow}>
        <Text style={styles.buttonText}>Seguimiento activo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonYellow}>
        <Text style={styles.buttonText}>Historial de incidentes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonYellow}
        onPress={() => router.push('/estadisticas')}
      >
        <Text style={styles.buttonText}>Estadísticas</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.buttonYellow}
        onPress={() => router.push('/inventario')}
      >
        <Text style={styles.buttonText}>Inventario</Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonYellow}>
        <Text style={styles.buttonText}>Asignación de tareas</Text>
      </TouchableOpacity>

      {/* Sección de cuenta */}
      <Text style={styles.sectionTitle}>Cuenta</Text>

      <TouchableOpacity style={styles.buttonRed}>
        <Text style={styles.buttonText}>Administrar cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRedLight}>
        <Text style={styles.buttonText}>Mis actividades</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonDark}>
        <Text style={styles.buttonText}>Cerrar sesión</Text>
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
  bellWrapper: {
    position: 'relative',
    padding: 5,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  buttonYellow: {
    backgroundColor: '#E1B529',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonRed: {
    backgroundColor: '#832222',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonRedLight: {
    backgroundColor: '#A74141',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonDark: {
    backgroundColor: '#3A0C0C',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

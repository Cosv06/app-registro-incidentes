import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNotifications } from '../../context/NotificationContext';

export default function AdminCuentaJefeScreen() {
  const router = useRouter();
  const { hasNotifications, markAsRead } = useNotifications();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [nombreApellido, setNombreApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [secureText, setSecureText] = useState(true);

  const toggleSecureEntry = () => setSecureText(!secureText);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.leftIcons}>
          <Pressable onPress={() => router.push('/home')}>
            <FontAwesome name="home" size={22} color="#000" />
          </Pressable>
          <Pressable
            onPress={() => {
              markAsRead();
              router.push({ pathname: '/notificaciones', params: { from: 'admin-cuenta-jefe' } });
            }}
            style={styles.bellWrapper}
          >
            <FontAwesome name="bell" size={22} color="#000" />
            {hasNotifications && <View style={styles.notificationDot} />}
          </Pressable>
        </View>
        <Image
          source={require('../../assets/imagenesApp/logo-creo.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.title}>Administrar cuenta</Text>
      <Text style={styles.subtitle}>Datos del usuario</Text>

      <TextInput
        placeholder="Usuario..."
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
      />

      {/* Campo de contraseña con vista */}
      <View style={styles.passwordWrapper}>
        <TextInput
          placeholder="Contraseña..."
          secureTextEntry={secureText}
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeButton}>
          <FontAwesome name={secureText ? 'eye-slash' : 'eye'} size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Nombre y apellido del usuario..."
        style={styles.input}
        value={nombreApellido}
        onChangeText={setNombreApellido}
      />

      <TextInput
        placeholder="Número de celular"
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <TextInput
        placeholder="Correo electrónico..."
        style={styles.input}
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.buttonBlack}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.buttonRed}
        onPress={() => router.push('/admin-usuarios')}
      >
        <Text style={styles.buttonText}>Administrar usuarios</Text>
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
  },
  leftIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  bellWrapper: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
  },
  logo: {
    width: 100,
    height: 45,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    color: '#B10000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eyeButton: {
    paddingHorizontal: 10,
  },
  buttonBlack: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonRed: {
    backgroundColor: '#A94442',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

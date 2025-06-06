import { useRouter } from 'expo-router'; // ← importación agregada
import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter(); // ← hook para navegación

  return (
    <View style={styles.container}>
      <Image source={require('../assets/imagenesApp/logo-creo.png')} style={styles.logo} />
      <Text style={styles.title}>Registro de incidentes</Text>
      <Text style={styles.subtitle}>Usuario existente</Text>

      <TextInput placeholder="Usuario existente" style={styles.input} />
      <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/home')} // ← navegación a HomeScreen
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B40000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
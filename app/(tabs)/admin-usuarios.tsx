import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNotifications } from '../../context/NotificationContext';

interface Usuario {
  id: number;
  nombre: string;
  contrasena: string;
  cargo: 'Jefe' | 'Ingeniero' | 'Practicante' | 'Pasante' | 'Nuevo';
}

export default function AdministrarUsuariosScreen() {
  const router = useRouter();
  const { hasNotifications, markAsRead } = useNotifications();

  const [usuarios, setUsuarios] = useState<Usuario[]>([
    { id: 1, nombre: 'Manuel_A', contrasena: '1234', cargo: 'Jefe' },
    { id: 2, nombre: 'Richard_R', contrasena: '5678', cargo: 'Jefe' },
    { id: 3, nombre: 'Carlos_S', contrasena: '9999', cargo: 'Pasante' },
    { id: 4, nombre: 'Leonardo_Z', contrasena: '2222', cargo: 'Pasante' },
  ]);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [editNombre, setEditNombre] = useState('');
  const [editContrasena, setEditContrasena] = useState('');
  const [cargoSeleccionado, setCargoSeleccionado] = useState<'Jefe' | 'Ingeniero' | 'Practicante' | 'Pasante'>('Pasante');
  const [modalConfirmacionVisible, setModalConfirmacionVisible] = useState(false);

  const obtenerColor = (cargo: string) => {
    switch (cargo) {
      case 'Jefe': return styles.rojo;
      case 'Ingeniero': return styles.verde;
      case 'Practicante': return styles.azul;
      case 'Pasante': return styles.amarillo;
      default: return styles.gris;
    }
  };

  const agregarUsuario = () => {
    if (nuevoNombre.trim() && nuevaContrasena.trim()) {
      const nuevo: Usuario = {
        id: Date.now(),
        nombre: nuevoNombre,
        contrasena: nuevaContrasena,
        cargo: 'Nuevo',
      };
      setUsuarios(prev => [...prev, nuevo]);
      setNuevoNombre('');
      setNuevaContrasena('');
      setModalConfirmacionVisible(true);
    }
  };

  const seleccionarUsuario = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
    setEditNombre(usuario.nombre);
    setEditContrasena(usuario.contrasena);
    setCargoSeleccionado(usuario.cargo);
    setModalVisible(true);
  };

  const modificarUsuario = () => {
    if (usuarioSeleccionado) {
      setUsuarios(prev => prev.map(u =>
        u.id === usuarioSeleccionado.id
          ? { ...u, nombre: editNombre, contrasena: editContrasena, cargo: cargoSeleccionado }
          : u
      ));
      setModalVisible(false);
    }
  };

  const eliminarUsuario = () => {
    if (usuarioSeleccionado) {
      setUsuarios(prev => prev.filter(u => u.id !== usuarioSeleccionado.id));
      setModalVisible(false);
    }
  };

  const usuariosOrdenados = [...usuarios].sort((a, b) => {
    const orden = { 'Jefe': 1, 'Ingeniero': 2, 'Practicante': 3, 'Pasante': 4, 'Nuevo': 5 };
    return orden[a.cargo] - orden[b.cargo];
  });

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
              router.push({ pathname: '/notificaciones', params: { from: 'admin-usuarios' } });
            }}
            style={styles.bellWrapper}
          >
            <FontAwesome name="bell" size={24} color="#000" />
            {hasNotifications && <View style={styles.notificationDot} />}
          </Pressable>
        </View>
        <Image source={require('../../assets/imagenesApp/logo-creo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Administración de usuarios</Text>
      <Text style={styles.subtitle}>Nuevo usuario</Text>
      <TextInput placeholder="Nombre de usuario..." style={styles.input} value={nuevoNombre} onChangeText={setNuevoNombre} />
      <TextInput placeholder="Contraseña..." style={styles.input} secureTextEntry value={nuevaContrasena} onChangeText={setNuevaContrasena} />
      <TouchableOpacity style={styles.registrar} onPress={agregarUsuario}>
        <Text style={styles.botonTexto}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Usuarios existentes</Text>
      {usuariosOrdenados.map(u => (
        <TouchableOpacity
          key={u.id}
          style={[styles.boton, obtenerColor(u.cargo)]}
          onPress={() => seleccionarUsuario(u)}
        >
          <Text style={styles.botonTexto}>{u.nombre}</Text>
        </TouchableOpacity>
      ))}

      {/* Modal de edición */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <TextInput
                  placeholder="Nombre de usuario"
                  style={styles.input}
                  value={editNombre}
                  onChangeText={setEditNombre}
                />
                <TextInput
                  placeholder="Contraseña"
                  style={styles.input}
                  secureTextEntry
                  value={editContrasena}
                  onChangeText={setEditContrasena}
                />
                <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Cargo</Text>
                {['Jefe', 'Ingeniero', 'Practicante', 'Pasante'].map(opcion => (
                  <TouchableOpacity key={opcion} onPress={() => setCargoSeleccionado(opcion as any)}>
                    <Text style={{ padding: 5, color: cargoSeleccionado === opcion ? 'blue' : 'black' }}>{opcion}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.botonNegro} onPress={modificarUsuario}>
                  <Text style={styles.botonTexto}>Modificar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonRojo} onPress={eliminarUsuario}>
                  <Text style={styles.botonTexto}>Eliminar cuenta</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de confirmación */}
      <Modal
        visible={modalConfirmacionVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalConfirmacionVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalConfirmacionVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.confirmacionModal}>
              <Text style={styles.confirmacionTexto}>Se ha registrado nuevo usuario</Text>
              <FontAwesome name="user" size={50} color="#888" style={{ marginTop: 10 }} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    color: 'darkred',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  registrar: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  boton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rojo: {
    backgroundColor: '#A94442',
  },
  verde: {
    backgroundColor: '#A4D4AE',
  },
  azul: {
    backgroundColor: '#81D4FA',
  },
  amarillo: {
    backgroundColor: '#E1B529',
  },
  gris: {
    backgroundColor: '#aaa',
  },
  botonNegro: {
    backgroundColor: '#000',
    marginTop: 10,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  botonRojo: {
    backgroundColor: '#A94442',
    marginTop: 10,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  confirmacionModal: {
    backgroundColor: '#eee',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmacionTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

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
  View,
} from 'react-native';
import { useNotifications } from '../../context/NotificationContext';

interface Tarea {
  id: number;
  descripcion: string;
  tipo: 'asignada' | 'propia';
  autor?: string;
  fecha?: string;
  color: 'blue' | 'lightblue' | 'red' | 'lightred';
}

let idCounter = 1;

export default function AsignacionUsuarioScreen() {
  const router = useRouter();
  const { hasNotifications, markAsRead } = useNotifications();

  const [tareas, setTareas] = useState<Tarea[]>([ // ejemplo base
    {
      id: idCounter++,
      descripcion: 'Supervisar la implementación de Laboratorio',
      tipo: 'asignada',
      autor: 'Ing. Manuel',
      fecha: '03/06/2025',
      color: 'blue'
    },
    {
      id: idCounter++,
      descripcion: 'Revisar la normativa técnica del AL',
      tipo: 'asignada',
      autor: 'Ing. Manuel',
      fecha: '03/06/2025',
      color: 'lightblue'
    },
    {
      id: idCounter++,
      descripcion: 'Realizar mantenimiento de las centrífugas',
      tipo: 'asignada',
      autor: 'Ing. Manuel',
      fecha: '03/06/2025',
      color: 'blue'
    },
    {
      id: idCounter++,
      descripcion: 'Coordinar el MP de los desfibriladores',
      tipo: 'asignada',
      autor: 'Ing. Manuel',
      fecha: '03/06/2025',
      color: 'lightblue'
    },
    {
      id: idCounter++,
      descripcion: 'Revisar el inventario',
      tipo: 'propia',
      color: 'red'
    },
    {
      id: idCounter++,
      descripcion: 'Validar el app',
      tipo: 'propia',
      color: 'lightred'
    },
  ]);

  const [descripcionPropia, setDescripcionPropia] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);
  const [colorAlternadorPropia, setColorAlternadorPropia] = useState(true);

  const handleAgregarPropia = () => {
    if (descripcionPropia.trim()) {
      const nueva: Tarea = {
        id: idCounter++,
        descripcion: descripcionPropia,
        tipo: 'propia',
        color: colorAlternadorPropia ? 'lightred' : 'red'
      };
      setTareas([nueva, ...tareas]);
      setDescripcionPropia('');
      setColorAlternadorPropia(!colorAlternadorPropia);
    }
  };

  const handleTareaCumplida = (id: number) => {
    setTareas(tareas.filter(t => t.id !== id));
    setModalVisible(false);
  };

  const mostrarModal = (tarea: Tarea) => {
    setTareaSeleccionada(tarea);
    setModalVisible(true);
  };

  const obtenerTitulo = (texto: string) => texto.split(' ').slice(0, 5).join(' ');

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
              router.push('/notificaciones');
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

      <Text style={styles.sectionTitle}>Tareas asignadas</Text>
      {tareas.filter(t => t.tipo === 'asignada').map(t => (
        <TouchableOpacity
          key={t.id}
          style={[styles.boton, t.color === 'blue' ? styles.azul : styles.celeste]}
          onPress={() => mostrarModal(t)}>
          <Text style={styles.botonTexto}>{obtenerTitulo(t.descripcion)}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Actividades propias</Text>
      {tareas.filter(t => t.tipo === 'propia').map(t => (
        <TouchableOpacity
          key={t.id}
          style={[styles.boton, t.color === 'red' ? styles.rojoClaro : styles.rojo]}
          onPress={() => mostrarModal(t)}>
          <Text style={styles.botonTexto}>{obtenerTitulo(t.descripcion)}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Nueva actividad</Text>
      <TextInput
        placeholder="Descripción de actividad"
        style={styles.input}
        value={descripcionPropia}
        onChangeText={setDescripcionPropia}
      />
      <TouchableOpacity style={styles.agregar} onPress={handleAgregarPropia}>
        <Text style={styles.botonTexto}>Agregar</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <Pressable style={styles.modalContainer} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContent}>
            {tareaSeleccionada && (
              <>
                {tareaSeleccionada.autor && (
                  <Text>Asignado por: {tareaSeleccionada.autor}</Text>
                )}
                {tareaSeleccionada.fecha && (
                  <Text>Fecha: {tareaSeleccionada.fecha}</Text>
                )}
                <Text style={{ marginVertical: 10 }}>{tareaSeleccionada.descripcion}</Text>
                <TouchableOpacity
                  style={styles.tareaCumplida}
                  onPress={() => handleTareaCumplida(tareaSeleccionada.id)}>
                  <Text style={styles.botonTexto}>Tarea cumplida</Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
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
    marginVertical: 10,
  },
  boton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  azul: {
    backgroundColor: '#2196F3',
  },
  celeste: {
    backgroundColor: '#81D4FA',
  },
  rojo: {
    backgroundColor: '#A94442',
  },
  rojoClaro: {
    backgroundColor: '#D46A6A',
  },
  agregar: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
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
  tareaCumplida: {
    backgroundColor: '#000',
    marginTop: 10,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
});

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

interface Tarea {
  id: number;
  descripcion: string;
  tipo: 'asignada' | 'propia';
  autor?: string;
  fecha?: string;
  color: 'blue' | 'lightblue' | 'red' | 'lightred';
}

let idCounter = 1;

export default function AsignacionTareasScreen() {
  const router = useRouter();
  const { hasNotifications, markAsRead } = useNotifications();

  const [tareas, setTareas] = useState<Tarea[]>([
    {
      id: idCounter++,
      descripcion: 'Reunión con gerencia para revisar KPIs mensuales',
      tipo: 'asignada',
      autor: 'Ing. Manuel',
      fecha: '03/06/2025',
      color: 'lightblue'
    },
    {
      id: idCounter++,
      descripcion: 'Revisión del Centro quirúrgico y equipamiento',
      tipo: 'asignada',
      autor: 'Ing. Manuel',
      fecha: '03/06/2025',
      color: 'blue'
    },
    {
      id: idCounter++,
      descripcion: 'Evaluar postulantes de la pasantía',
      tipo: 'propia',
      color: 'red'
    },
    {
      id: idCounter++,
      descripcion: 'Revisar los avances de los proyectos actuales',
      tipo: 'propia',
      color: 'lightred'
    },
  ]);

  const [descripcionPropia, setDescripcionPropia] = useState('');
  const [usuario, setUsuario] = useState('');
  const [descripcionAsignada, setDescripcionAsignada] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(null);
  const [colorAlternadorAsignada, setColorAlternadorAsignada] = useState(true);
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

  const handleAsignarTarea = () => {
    if (descripcionAsignada.trim() && usuario.trim()) {
      const nueva: Tarea = {
        id: idCounter++,
        descripcion: descripcionAsignada,
        tipo: 'asignada',
        autor: 'Ing. Manuel',
        fecha: '03/06/2025',
        color: colorAlternadorAsignada ? 'blue' : 'lightblue'
      };
      setTareas([nueva, ...tareas]);
      setDescripcionAsignada('');
      setUsuario('');
      setColorAlternadorAsignada(!colorAlternadorAsignada);
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
      {/* Header con íconos y logo */}
      <View style={styles.header}>
        <View style={styles.leftIcons}>
          <Pressable onPress={() => router.push('/home')}>
            <FontAwesome name="home" size={24} color="#000" />
          </Pressable>
          <Pressable onPress={() => {
            markAsRead();
            router.push('/notificaciones');
          }} style={styles.bellWrapper}>
            <FontAwesome name="bell" size={24} color="#000" />
            {hasNotifications && <View style={styles.notificationDot} />}
          </Pressable>
        </View>
        <Image source={require('../../assets/imagenesApp/logo-creo.png')} style={styles.logo} />
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
          style={[styles.boton, t.color === 'red' ? styles.rojo : styles.rojoClaro]}
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

      <Text style={styles.sectionTitle}>Asignar nuevas actividades</Text>
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        placeholder="Descripción de actividad"
        style={styles.input}
        value={descripcionAsignada}
        onChangeText={setDescripcionAsignada}
      />
      <TouchableOpacity style={styles.agregar} onPress={handleAsignarTarea}>
        <Text style={styles.botonTexto}>Asignar</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
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
              </View>
            </TouchableWithoutFeedback>
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
    backgroundColor: '#D26A66',
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

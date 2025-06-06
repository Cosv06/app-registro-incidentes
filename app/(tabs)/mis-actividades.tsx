import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNotifications } from '../../context/NotificationContext';

const actividadesEjemplo = [
  { anio: 2025, mes: 'Enero', descripcion: 'Supervisar la implementación de Laboratorio', color: 'blue' },
  { anio: 2025, mes: 'Enero', descripcion: 'Revisar la normativa técnica del AL', color: 'lightblue' },
  { anio: 2025, mes: 'Enero', descripcion: 'Revisar el inventario', color: 'red' },
  { anio: 2025, mes: 'Enero', descripcion: 'Validar el app', color: 'lightred' },
];

export default function MisActividadesScreen() {
  const router = useRouter();
  const { hasNotifications, markAsRead } = useNotifications();
  const [aniosAbiertos, setAniosAbiertos] = useState<number[]>([]);
  const [mesesAbiertos, setMesesAbiertos] = useState<Record<number, string[]>>({});

  const toggleAnio = (anio: number) => {
    setAniosAbiertos(prev => prev.includes(anio) ? prev.filter(a => a !== anio) : [...prev, anio]);
  };

  const toggleMes = (anio: number, mes: string) => {
    setMesesAbiertos(prev => {
      const abiertos = prev[anio] || [];
      return {
        ...prev,
        [anio]: abiertos.includes(mes) ? abiertos.filter(m => m !== mes) : [...abiertos, mes]
      };
    });
  };

  const obtenerColor = (color: string) => {
    switch (color) {
      case 'blue': return styles.azul;
      case 'lightblue': return styles.celeste;
      case 'red': return styles.rojo;
      case 'lightred': return styles.rojoClaro;
      default: return styles.gris;
    }
  };

  const aniosDisponibles = Array.from(new Set(actividadesEjemplo.map(a => a.anio))).sort((a, b) => b - a);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftIcons}>
          <TouchableOpacity onPress={() => router.push('/home')}>
            <FontAwesome name="home" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              markAsRead();
              router.push({ pathname: '/notificaciones', params: { from: 'mis-actividades' } });
            }}
            style={styles.bellWrapper}
          >
            <FontAwesome name="bell" size={24} color="#000" />
            {hasNotifications && <View style={styles.notificationDot} />}
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>Mis actividades</Text>

      {aniosDisponibles.map(anio => (
        <View key={anio}>
          <TouchableOpacity onPress={() => toggleAnio(anio)}>
            <Text style={styles.anio}>{anio} ▼</Text>
          </TouchableOpacity>
          {aniosAbiertos.includes(anio) && (
            <View>
              {Array.from(new Set(actividadesEjemplo.filter(a => a.anio === anio).map(a => a.mes))).map(mes => (
                <View key={mes}>
                  <TouchableOpacity onPress={() => toggleMes(anio, mes)}>
                    <Text style={styles.mes}>{mes} ▼</Text>
                  </TouchableOpacity>
                  {mesesAbiertos[anio]?.includes(mes) && (
                    <View>
                      {actividadesEjemplo.filter(a => a.anio === anio && a.mes === mes).map((actividad, index) => (
                        <View key={index} style={[styles.boton, obtenerColor(actividad.color)]}>
                          <Text style={styles.botonTexto}>{actividad.descripcion}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  anio: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  mes: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
  boton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 20,
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
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
  gris: {
    backgroundColor: '#aaa',
  },
});

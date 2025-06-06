import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNotifications } from '../../context/NotificationContext';

const INCIDENTES = {
  2025: {
    Enero: [
      'Implementación del área de laboratorio',
      'Desfibrilador descompuesto',
      'MP de monitores',
      'Inoperatividad de acelerador lineal',
    ],
  },
  2024: {},
  2023: {},
};

export default function HistorialIncidentesScreen() {
  const router = useRouter();
  const { hasNotifications, markAsRead } = useNotifications();

  const [anioAbierto, setAnioAbierto] = useState<number | null>(2025);
  const [mesAbierto, setMesAbierto] = useState<string | null>('Enero');

  const toggleAnio = (anio: number) => {
    setAnioAbierto(prev => (prev === anio ? null : anio));
    setMesAbierto(null);
  };

  const toggleMes = (mes: string) => {
    setMesAbierto(prev => (prev === mes ? null : mes));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <View style={styles.leftIcons}>
          <Pressable onPress={() => router.push('/home')}>
            <FontAwesome name="home" size={24} color="#000" />
          </Pressable>
          <Pressable
            onPress={() => {
              markAsRead();
              router.push({ pathname: '/notificaciones', params: { from: 'historial-incidentes' } });
            }}
            style={styles.bellWrapper}
          >
            <FontAwesome name="bell" size={24} color="#000" />
            {hasNotifications && <View style={styles.notificationDot} />}
          </Pressable>
        </View>
        <Image source={require('../../assets/imagenesApp/logo-creo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Historial de incidentes</Text>

      {Object.keys(INCIDENTES).sort((a, b) => Number(b) - Number(a)).map(anio => (
        <View key={anio}>
          <TouchableOpacity onPress={() => toggleAnio(Number(anio))}>
            <Text style={styles.anio}>{anio} ▼</Text>
          </TouchableOpacity>

          {anioAbierto === Number(anio) && (
            <View style={styles.mesesContainer}>
              {Object.keys(INCIDENTES[Number(anio)]).map(mes => (
                <View key={mes}>
                  <TouchableOpacity onPress={() => toggleMes(mes)}>
                    <Text style={styles.mes}>{mes} ▼</Text>
                  </TouchableOpacity>
                  {mesAbierto === mes && (
                    <View>
                      {INCIDENTES[Number(anio)][mes].map((incidente, i) => (
                        <TouchableOpacity key={i} style={styles.botonIncidente}>
                          <Text style={styles.textoIncidente}>{incidente}</Text>
                        </TouchableOpacity>
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
    padding: 20,
    backgroundColor: '#fff',
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
    marginBottom: 10,
  },
  anio: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  mes: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
    marginVertical: 5,
  },
  botonIncidente: {
    backgroundColor: '#B9A890',
    padding: 12,
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  textoIncidente: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mesesContainer: {
    marginBottom: 10,
  },
});

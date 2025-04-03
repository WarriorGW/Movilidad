import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCjv8TzRvcU3bC5b1gYKYbpP55YQIZ6a_0';

const routeCoordinates = [
  { latitude: 21.841412535710823, longitude: -102.35435767344093 },
  { latitude: 21.846164456443717, longitude: -102.35328375500428 },
  { latitude: 21.851113965739412, longitude: -102.3537067346566 },
  { latitude: 21.84841656197246, longitude: -102.34078323302542 },
  { latitude: 21.84457339537701, longitude: -102.32999193304572 },
  { latitude: 21.84286887384979, longitude: -102.32182099599545 },
  { latitude: 21.842455911043313, longitude: -102.31684953304573 },
  { latitude: 21.843719492108182, longitude: -102.31275036188158 },
  { latitude: 21.843206346252327, longitude: -102.31630074531367 },
  { latitude: 21.845890630056623, longitude: -102.30566108446874 },
  { latitude: 21.84472032393697, longitude: -102.29426876115694 },
  { latitude: 21.845620989589438, longitude: -102.28656291770223 },
  { latitude: 21.85571933347145, longitude: -102.26061493868565 },
  { latitude: 21.8563197241571, longitude: -102.25205940522754 },
  { latitude: 21.862227609589947, longitude: -102.24820313304512 },
  { latitude: 21.868180846019293, longitude: -102.24416004653729 },
  { latitude: 21.87724269146967, longitude: -102.24695980235785 },
  { latitude: 21.887581712734292, longitude: -102.25160854653681 },
  { latitude: 21.894337914968155, longitude: -102.25322073304419 },
  { latitude: 21.900426444437038, longitude: -102.25337501770062 },
  { latitude: 21.90954063506349, longitude: -102.25880346187962 },
  { latitude: 21.915955989278874, longitude: -102.261209646536 },
  { latitude: 21.92081103666711, longitude: -102.2614504330434 },
  { latitude: 21.930283329737822, longitude: -102.26845181769971 },
  { latitude: 21.936629416744122, longitude: -102.27366414838633 },
  { latitude: 21.942361677833944, longitude: -102.28023019607953 },
  { latitude: 21.951569150947503, longitude: -102.32744818886322 },
  { latitude: 21.952312004690913, longitude: -102.33315510893254 },
  { latitude: 21.95340349736662, longitude: -102.34250967537076 },
  { latitude: 21.95279974544087, longitude: -102.34595271769908 },
  { latitude: 21.95170724991033, longitude: -102.35147731089447 },
];


const MapScreen: React.FC = () => {
  const [region, setRegion] = useState({
    latitude: 21.851113965739412,
    longitude: -102.3537067346566,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showDirections, setShowDirections] = useState(false);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await Geolocation.requestAuthorization('whenInUse');
        if (granted === 'granted') {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const [currentLocation, setCurrentLocation] = useState<{latitude: number, longitude: number} | null>(null);
              setRegion({ latitude, longitude, latitudeDelta: 0.05, longitudeDelta: 0.05 });
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      } catch (err) {
        console.warn(err);
      }
    };
    
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={4}
          strokeColor="blue"
        />
      </MapView>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowDirections(!showDirections)}
      >
        <Text style={styles.buttonText}>
          {showDirections ? 'Ocultar Ruta' : 'Mostrar Ruta'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapScreen;
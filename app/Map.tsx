import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ navigation }: any) {
  // const [location, setLocation] =
  //   useState<Location.LocationObjectCoords | null>(null);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       console.log("Permiso denegado");
  //       return;
  //     }
  //     const loc = await Location.getCurrentPositionAsync({});
  //     setLocation(loc.coords);
  //   })();
  // }, []);

  return (
    <View style={styles.container}>
      {/* {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          provider="google"
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Estás aquí"
          />
        </MapView>
      ) : (
        <Text>Cargando ubicación...</Text>
      )} */}
      <View style={styles.buttonContainer}>
        <Button
          title="Ir al Login"
          onPress={() => navigation.navigate("Login")}
          color="#007bff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
  },
});

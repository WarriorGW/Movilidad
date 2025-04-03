import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

const frequentData = [
  { id: "1", title: "Destino frecuente", subtitle: "Universidad - 30 min" },
  {
    id: "2",
    title: "Líneas frecuentes",
    subtitle: "Autobús 32, Metro Línea 2",
  },
  { id: "3", title: "Estación más cercana", subtitle: "Est. Centro - 500m" },
];

const favoritePlaces = [
  { id: "1", name: "Casa", address: "Av. Siempre Viva 742" },
  { id: "2", name: "Trabajo", address: "Oficinas Central, Torre A" },
];

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Input de Dirección con botón de búsqueda */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="¿A dónde quieres ir?"
          placeholderTextColor="#aaa"
        />
        <TouchableNativeFeedback
          onPress={() => console.log("Buscar dirección")}
        >
          <View style={styles.searchButton}>
            <Ionicons name="search" size={24} color="#fff" />
          </View>
        </TouchableNativeFeedback>
      </View>

      {/* Carrusel de opciones frecuentes */}
      <FlatList
        horizontal
        data={frequentData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableNativeFeedback onPress={() => console.log(item.title)}>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Sección de Lugares Favoritos */}
      <Text style={styles.sectionTitle}>Lugares Favoritos</Text>
      {favoritePlaces.map((place) => (
        <TouchableNativeFeedback
          key={place.id}
          onPress={() => console.log(place.name)}
        >
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Ionicons
                name={place.name === "Casa" ? "home" : "briefcase"}
                size={24}
                color="#6200ee"
                style={styles.icon}
              />
              <View>
                <Text style={styles.listItemTitle}>{place.name}</Text>
                <Text style={styles.listItemDescription}>{place.address}</Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#6200ee",
    borderRadius: 8,
    paddingLeft: 16,
    fontSize: 16,
  },
  searchButton: {
    padding: 12,
    backgroundColor: "#6200ee",
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginRight: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    width: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6200ee",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#777",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  listItem: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  listItemContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  icon: {
    marginRight: 10,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  listItemDescription: {
    fontSize: 14,
    color: "#777",
  },
});

export default Home;

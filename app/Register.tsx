import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [nombre, setNombre] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [nombreError, setNombreError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  const handleLogin = () => {
    let valid = true;

    // Resetear errores
    setNombreError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!nombre) {
      setNombreError("El nombre es requerido.");
      valid = false;
    } else if (nombre.length < 8 || nombre.length > 20) {
      setNombreError("El nombre debe tener entre 8 y 20 caracteres.");
      valid = false;
    }

    if (!password) {
      setPasswordError("La contraseña es requerida.");
      valid = false;
    } else if (password.length < 6 || password.length > 20) {
      setPasswordError("La contraseña debe tener entre 6 y 20 caracteres.");
      valid = false;
    }

    if (confirmPassword !== password) {
      setConfirmPasswordError("Las contraseñas no coinciden.");
      valid = false;
    }

    if (valid) {
      // Aquí iría tu lógica de login o navegación
      alert(`Bienvenido, ${nombre}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#aaa"
        value={nombre}
        onChangeText={setNombre}
      />
      {nombreError ? <Text style={styles.errorText}>{nombreError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {confirmPasswordError ? (
        <Text style={styles.errorText}>{confirmPasswordError}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Crear Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    width: "100%",
    color: "red",
    marginBottom: 5,
    fontSize: 14,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

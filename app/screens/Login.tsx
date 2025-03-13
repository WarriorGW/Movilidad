import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { API_URL, useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

  // useEffect(() => {
  //   const testCall = async () => {
  //     const result = await axios.get(`${API_URL}/users`);
  //     console.log("file: Login - result: ", result);
  //   };

  //   testCall();
  // });

  const login = async () => {
    if (!onLogin) return alert("Hubo un error, intentelo de nuevo mas tarde.");

    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    if (!onRegister)
      return alert("Hubo un error, intentelo de nuevo mas tarde.");

    const result = await onRegister!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login();
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: "logo.png" }} style={styles.image} />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text: string) => setPassword(text)}
          value={password}
        />
        <Button onPress={login} title="Sing in" />
        <Button onPress={register} title="Create account" />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  form: {
    gap: 10,
    width: "60%",
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
  },
  container: {
    alignItems: "center",
    width: "100%",
  },
});

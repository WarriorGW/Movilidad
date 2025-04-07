import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-5">
      <Text className="text-2xl font-bold text-red-600">Crear Cuenta</Text>

      <TextInput
        className="w-full bg-white p-3 rounded-md my-2 border border-gray-300"
        placeholder="Nombre"
        placeholderTextColor="#aaa"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        className="w-full bg-white p-3 rounded-md my-2 border border-gray-300"
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        className="w-full bg-white p-3 rounded-md my-2 border border-gray-300"
        placeholder="Confirmar Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity className="bg-blue-500 p-3 rounded-md mt-5 w-full items-center">
        <Text className="text-white text-lg font-bold">Crear Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

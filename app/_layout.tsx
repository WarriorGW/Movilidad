import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, ColorSchemeName } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Directions from "./screens/Directions";
import Login from "./screens/Login";
import Map from "./screens/Map";
import Register from "./screens/Register";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  const colorScheme = useColorScheme(); // Detecta el tema del sistema

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Direcciones") {
            iconName = "list";
          } else if (route.name === "Mapa") {
            iconName = "map";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#121212" : "#ffffff",
        },
        tabBarActiveTintColor: colorScheme === "dark" ? "#ffffff" : "#000000",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#888" : "#444",
      })}
    >
      <Tab.Screen name="Direcciones" component={Directions} />
      <Tab.Screen name="Mapa" component={Map} />
    </Tab.Navigator>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <RootContent colorScheme={colorScheme} />
    </AuthProvider>
  );
}

function RootContent({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { authState, onLogout } = useAuth(); // Llamado del hook aquí

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="Iniciar" component={Login} />
        <Stack.Screen name="Registrar" component={Register} />
      </Stack.Navigator>
    </ThemeProvider>
  );
}

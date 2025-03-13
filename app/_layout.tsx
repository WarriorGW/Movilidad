import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./screens/Home";
import Login from "./screens/Login";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

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
  // return (
  //   <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
  //     <Stack>
  //       <Stack.Screen name="Login" options={{ headerShown: false }} />
  //       <Stack.Screen name="Map" options={{ headerShown: false }} />
  //       <Stack.Screen name="Register" options={{ headerShown: false }} />
  //       <Stack.Screen name="+not-found" />
  //     </Stack>
  //     {/* <StatusBar style="auto" /> */}
  //   </ThemeProvider>
  // );
  const { authState, onLogout } = useAuth();
  return (
    <AuthProvider>
      <Stack.Navigator>
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Logout" />,
            }}
          />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </AuthProvider>
  );
}

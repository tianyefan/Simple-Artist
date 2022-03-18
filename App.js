import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LogBox } from "react-native";

import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import MagicScreen from "./app/screens/MagicScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

export default function App() {
  //const [user, setUser] = useState(null);
  const HomeStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeStack" component={HomeScreen} />
        <Stack.Screen name="MagicStack" component={MagicScreen} />
      </Stack.Navigator>
    );
  };
  const HomeTabScreens = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="HomeTab" component={HomeTabScreens} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

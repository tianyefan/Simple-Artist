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
import PersonScreen from "./app/screens/PersonScreen";
import MagicScreen from "./app/screens/MagicScreen";
import PublishScreen from "./app/screens/PublishScreen";
import DetailScreen from "./app/screens/DetailScreen";
import SignInScreen from "./app/screens/SignInScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

export default function App() {
  //const [user, setUser] = useState(null);
  // const HomeStack = () => {
  //   return (
  //     <Stack.Navigator screenOptions={{ headerShown: false }}>
  //       <Stack.Screen name="HomeStack" component={HomeScreen} />

  //     </Stack.Navigator>
  //   );
  // };
  const HomeTabScreens = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Person") {
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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Person" component={PersonScreen}/>
        {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      </Tab.Navigator>
    );
  };
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen}/>
          <Stack.Screen name="SignUp" component={SignUpScreen}/>
          <Stack.Screen name="HomeTab" component={HomeTabScreens} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="MagicStack" component={MagicScreen} />
          <Stack.Screen name="PublishStack" component={PublishScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

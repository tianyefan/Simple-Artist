import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import Masonry from "./app/components/Masonry";
import ProfileScreen from "./app/screens/ProfileScreen";
import { NativeBaseProvider } from "native-base";
import React from "react";
import Card from "./app/components/Card";
import MyList from "./app/components/MyList";
import BottomBar from "./app/components/BottomBar";
import Topbar from "./app/components/Topbar";
import Feed from "./app/components/Feed";
export default function App() {
  return (
    <NativeBaseProvider>
      <ProfileScreen />
    </NativeBaseProvider>
  );
}

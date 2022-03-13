import React, { useState } from "react";
import { Box, Text } from "native-base";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  DancingScript_400Regular,
} from "@expo-google-fonts/dancing-script";

import Masonry from "../components/Masonry";

function HomeScreen() {
  const [screen, setScreen] = useState("");
  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Box
          flexDir="row"
          safeArea
          bgColor="blueGray.50"
          justifyContent="center"
        >
          <Text
            fontFamily="DancingScript_400Regular"
            fontSize={30}
            width="40%"
            marginLeft={30}
          >
            Simple Artist
          </Text>
          <FontAwesome5
            name="feather-alt"
            size={55}
            color="#000"
            style={{ marginLeft: 60 }}
          />
        </Box>
        <Masonry />
        <Box
          flexDir="row"
          position="absolute"
          bottom={0}
          justifyContent="space-between"
          h={75}
          bgColor="blueGray.50"
          w="100%"
        >
          <MaterialCommunityIcons
            name={screen === "Home" ? "home" : "home-outline"}
            size={35}
            color="#000"
            onPress={() => {
              setScreen("Home");
            }}
            style={{ padding: 10 }}
          />

          <MaterialCommunityIcons
            name="plus-box-outline"
            size={42}
            color="#000"
            onPress={() => {
              setScreen("Create");
            }}
            style={{ padding: 5 }}
          />
          <MaterialIcons
            name={screen === "Profile" ? "person" : "person-outline"}
            size={35}
            color="#000"
            onPress={() => {
              setScreen("Profile");
            }}
            style={{ padding: 10 }}
          />
        </Box>
      </>
    );
  }
}

export default HomeScreen;

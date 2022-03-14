import React from "react";
import { Box, Text } from "native-base";
import {
  FontAwesome5,
} from "@expo/vector-icons";
import {
  useFonts,
  DancingScript_400Regular,
} from "@expo-google-fonts/dancing-script";
import AppLoading from "expo-app-loading";
function Topbar() {
  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Box flexDir="row" safeArea bgColor="blueGray.50" justifyContent="center">
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
    );
  }
}

export default Topbar;

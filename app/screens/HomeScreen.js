import React, { useState } from "react";
import { Stack, Box } from "native-base";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  DancingScript_400Regular,
} from "@expo-google-fonts/dancing-script";

import Masonry from "../components/Masonry";
import Topbar from "../components/Topbar";
import BottomBar from "../components/BottomBar";
function HomeScreen() {
  return (
    <>
      <Topbar />
      <Box>
        <Masonry />
      </Box>
      <BottomBar />
    </>
  );
}

export default HomeScreen;

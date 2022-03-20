import React, { useState } from "react";
import { Box } from "native-base";
import Create from "../components/Create";
import Masonry from "../components/Masonry";
import Topbar from "../components/Topbar";
function HomeScreen({ navigation }) {
  return (
    <>
      <Topbar />
      <Box>
        <Masonry navigation={navigation}/>
      </Box>
      <Create navigation={navigation}/>
    </>
  );
}

export default HomeScreen;

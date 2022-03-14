import React from "react";
import { Box, Text, Stack, Image, Button, View } from "native-base";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
function Feed({ uri }) {
  return (
    <Box alignSelf="center" justifyContent="center" shadow="9">
      <Image
        source={{ uri: uri }}
        w={300}
        h={200}
        borderRadius={15}
        alt="card_image"
        my={2}
      />
      <MaterialCommunityIcons
        name="heart-outline"
        size={40}
        color="red"
        style={{ position: "absolute", left: 10, top: 10 }}
      />
    </Box>
  );
}

export default Feed;

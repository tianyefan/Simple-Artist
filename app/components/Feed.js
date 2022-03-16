import React from "react";
import { Box, Text, Stack, Image, Button, View } from "native-base";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
function Feed({ uri }) {
  const [save, setSave] = React.useState(false);
  return (
    <Box alignSelf="center" justifyContent="center" shadow="9">
      <Image
        source={{ uri: uri }}
        w={270}
        h={180}
        borderRadius={15}
        alt="card_image"
        my={5}
      />
      <MaterialCommunityIcons
        name={save === true ? "heart" : "heart-outline"}
        size={40}
        color="red"
        style={{ position: "absolute", left: 10, top: 30 }}
        onPress={() => {
          setSave((prevState) => !prevState);
        }}
      />
    </Box>
  );
}

export default Feed;

import React from "react";
import { Box, Text, Stack, Image, Button, View, Pressable } from "native-base";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
function Feed({ uri, feedId, navigation }) {
  const [save, setSave] = React.useState(false);
  const handlePress = () => {
    navigation.push("Detail", {
      uri: uri,
      feedId: feedId,
    });
  };
  return (
    <Box alignSelf="flex-start" justifyContent="center" shadow="9" px={12}>
      <Pressable onPress={handlePress}>
        <Image
          source={{ uri: uri }}
          w={270}
          h={180}
          borderRadius={15}
          alt="card_image"
          my={5}
          zIndex={99}
        />
      </Pressable>
      <MaterialCommunityIcons
        name={save === true ? "heart" : "heart-outline"}
        size={40}
        color="red"
        style={{ position: "absolute", left: 55, top: 30 }}
        onPress={() => {
          setSave((prevState) => !prevState);
        }}
      />
    </Box>
  );
}

export default Feed;

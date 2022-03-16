import React from "react";
import { Box, Text, Stack, Image, Button, IconButton } from "native-base";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
function Card({ uri }) {
  return (
    <Stack
      flexDir="row"
      justifyContent="center"
      borderBottomWidth={1}
      borderColor="dark.600"
      safeArea
      alignItems="center"
      h={140}
    >
      <Box alignSelf="center" justifyContent="center" my={5}>
        <Image
          source={{ uri: uri }}
          w={150}
          h={100}
          borderRadius={15}
          alt="card_image"
          mx={5}
        />
      </Box>
      <Box>
        <IconButton
          _icon={{ as: MaterialIcons, name: "delete", color: "red.400" }}
          borderRadius="full"
          _pressed={{bg: "red.100"}}
          marginBottom={5}
        ></IconButton>
      </Box>
    </Stack>
  );
}

export default Card;

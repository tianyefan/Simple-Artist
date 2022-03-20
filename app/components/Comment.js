import React from "react";
import { Box, Text, Image, Stack, Pressable } from "native-base";

function Comment({ uri, comment, navigation }) {
  return (
    <Stack
      direction="column"
      borderBottomWidth={1}
      borderBottomColor="trueGray.100"
      p={2}
    >
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Box
          flexDir="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          mx={2}
          my={2}
        >
          <Image src={uri} size="xs" borderRadius={50} alt="pro_image" />
          <Text mx={2} my="auto">
            The Doogge
          </Text>
        </Box>
      </Pressable>
      <Box mx={2} my={2}>
        <Text fontSize={15}>{comment}</Text>
      </Box>
    </Stack>
  );
}

export default Comment;

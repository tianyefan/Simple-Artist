import React, { useEffect, useState } from "react";
import { Box, Text, Image, Stack, Pressable } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Comment({ uri, comment, navigation }) {
  const [name, setName] = useState('')
  useEffect(async () => {
    await AsyncStorage.getItem("user")
      .then((res) => {
        //console.log(JSON.parse(res).name)
        setName(JSON.parse(res).name)
      })
      .catch(err => console.log(err))
  },[])
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
            {name === '' ? 'Guest' : name }
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

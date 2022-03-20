import React from "react";
import { Box, Image, Text, Stack } from "native-base";
import Topbar from "../components/Topbar";
function DetailScreen({ route, navigation }) {
  const { uri } = route.params;
  const prof_pic =
    "https://firebasestorage.googleapis.com/v0/b/smart-med-aba54.appspot.com/o/doge.jpg?alt=media&token=a297f8f7-185f-4b90-9d5d-151982bc1541";
  return (
    <>
      <Topbar />
      <Stack direction="column">
        <Box flexDir="row" alignItems="center" justifyContent="center" my={2}>
          <Image src={prof_pic} borderRadius={50} size="xs" mx={2} alt="pro_pic"/>
          <Text>The Doogge</Text>
        </Box>
        <Box  shadow="5">
          <Image src={uri} w={300} h={300} mx="auto" my={1} alt="image" borderRadius={10}/>
        </Box>
        <Box my={2}>
          <Text fontSize={25} mx={5}>Example Title</Text>
        </Box>
        <Box>
          <Text mx={5}>#Tag</Text>
        </Box>
      </Stack>
    </>
  );
}

export default DetailScreen;

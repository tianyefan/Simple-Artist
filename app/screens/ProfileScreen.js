import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  DancingScript_400Regular,
} from "@expo-google-fonts/dancing-script";
import { Box, Text, Image, Button, Stack } from "native-base";
import MyList from "../components/MyList";
import Topbar from "../components/Topbar";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen() {
  const imagescr =
    "https://firebasestorage.googleapis.com/v0/b/smart-med-aba54.appspot.com/o/doge.jpeg?alt=media&token=cd2dac08-c9ec-4ec8-91b6-a8ca63977322";
  const prof_pic =
    "https://firebasestorage.googleapis.com/v0/b/smart-med-aba54.appspot.com/o/doge.jpg?alt=media&token=a297f8f7-185f-4b90-9d5d-151982bc1541";
  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
  });
  // const [mode, setMode] = useState("Saved");
  // const [data, setData] = useState([]);
  // const id = 123456
  //console.log(route.params);
  // useEffect(async () => {
  //   await AsyncStorage.getItem('user')
  //     .then((res) => {
  //       console.log(JSON.parse(res))
  //     })
  //     .catch(err => console.log(err))
  // }, []);
  //console.log(user);
  //const userId = route.params.userId
  //console.log(user["profile_pic"])
  //console.log(userId)
  // const ListHeaderComponent = () => {
  //   return (
  //     <Stack direction="column" alignItems="center">
  //       <Box my={5}>
  //         <Image
  //           alignSelf="center"
  //           w={250}
  //           h={125}
  //           source={{ uri: imagescr }}
  //           alt="bg"
  //           borderRadius={15}
  //         />
  //         <Image
  //           alignSelf="center"
  //           size="xs"
  //           source={{ uri: prof_pic }}
  //           alt="bg"
  //           borderRadius={50}
  //           marginTop={-5}
  //         />
  //         <Text textAlign="center" fontSize="md" my={2}>
  //           The Doodge
  //         </Text>
  //       </Box>
  //       <Box
  //         flexDir="row"
  //         alignItems="center"
  //         w="100%"
  //         justifyContent="center"
  //         my={2}
  //       >
  //         <Button
  //           borderRadius={10}
  //           bgColor={mode === "Saved" ? "black" : "gray.50"}
  //           size="lg"
  //           _pressed={{ opacity: 0.6 }}
  //           marginX={5}
  //           onPress={(e) => {
  //             e.preventDefault();
  //             setMode("Saved");
  //             //setData([]);
  //           }}
  //         >
  //           <Text
  //             color={mode === "Saved" ? "white" : "black"}
  //             fontFamily="DancingScript_400Regular"
  //           >
  //             Saved
  //           </Text>
  //         </Button>
  //         <Button
  //           borderRadius={10}
  //           bgColor={mode === "Created" ? "black" : "gray.50"}
  //           size="lg"
  //           _pressed={{ opacity: 0.6 }}
  //           marginX={5}
  //           onPress={(e) => {
  //             e.preventDefault();
  //             setMode("Created");
  //             //setData([]);
  //           }}
  //         >
  //           <Text
  //             color={mode === "Created" ? "white" : "black"}
  //             fontFamily="DancingScript_400Regular"
  //           >
  //             Created
  //           </Text>
  //         </Button>
  //       </Box>
  //     </Stack>
  //   );
  // };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Topbar />
        {/* <Box my={2}>
        </Box> */}
      </>
    );
  }
}

export default ProfileScreen;
//<MyList
//            ListHeaderComponent={ListHeaderComponent}
//            navigation={navigation}
//            data={data}
//            userId={id}
//            mode={mode}
//          />
import React, { useState, useEffect } from "react";
import { Box, Stack, Image, Button, Text } from "native-base";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  DancingScript_400Regular,
} from "@expo-google-fonts/dancing-script";
import Topbar from "../components/Topbar";
import MyList from "../components/MyList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getBackground } from "../util/profileUtil";
function PersonScreen({ navigation }) {
  const [mode, setMode] = useState("Saved");
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  useEffect(async () => {
    await AsyncStorage.getItem("user")
      .then(async (res) => {
        //console.log(JSON.parse(res));
        setUser(JSON.parse(res));
        await axios
          .get(`${serverUrl}/users/${JSON.parse(res).id}`)
          .then((res) => {
            //console.log(res.data)
            if (mode === "Saved") {
              setData(res.data["savedFeed"]);
            } else if (mode === "Created") {
              setData(res.data["createdFeed"]);
            }
          });
      })
      .catch((err) => console.log(err));
  }, []);

  const bg = getBackground();

  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
  });
  const ListHeaderComponent = () => {
    return (
      <Stack direction="column" alignItems="center">
        <Box my={5}>
          <Image
            alignSelf="center"
            w={250}
            h={125}
            source={{ uri: bg }}
            alt="bg"
            borderRadius={15}
          />
          <Image
            alignSelf="center"
            size="xs"
            source={{ uri: user.profile_pic }}
            alt="bg"
            borderRadius={50}
            marginTop={-5}
          />
          <Text textAlign="center" fontSize="md" my={2}>
            {user.name}
          </Text>
        </Box>
        <Box
          flexDir="row"
          alignItems="center"
          w="100%"
          justifyContent="center"
          my={2}
        >
          <Button
            borderRadius={10}
            bgColor={mode === "Saved" ? "black" : "gray.50"}
            size="lg"
            _pressed={{ opacity: 0.6 }}
            marginX={5}
            onPress={async (e) => {
              e.preventDefault();
              setMode("Saved");
              //   await axios
              //     .get(`${serverUrl}/users/${user.id}`)
              //     .then((res) => {
              //       //console.log(res.data["savedFeed"])
              //       setData(res.data["savedFeed"]);
              //     })
              //     .catch((err) => console.log(err));
            }}
          >
            <Text
              color={mode === "Saved" ? "white" : "black"}
              fontFamily="DancingScript_400Regular"
            >
              Saved
            </Text>
          </Button>
          <Button
            borderRadius={10}
            bgColor={mode === "Created" ? "black" : "gray.50"}
            size="lg"
            _pressed={{ opacity: 0.6 }}
            marginX={5}
            onPress={async (e) => {
              e.preventDefault();
              setMode("Created");
              // await axios
              //   .get(`${serverUrl}/users/${user.id}`)
              //   .then((res) => {
              //     //console.log(res.data["createdFeed"])
              //     setData(res.data["createdFeed"]);
              //   })
              //   .catch((err) => console.log(err));
            }}
          >
            <Text
              color={mode === "Created" ? "white" : "black"}
              fontFamily="DancingScript_400Regular"
            >
              Created
            </Text>
          </Button>
        </Box>
      </Stack>
    );
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Topbar />
        {user && (
          <Box my={2}>
            <MyList
              ListHeaderComponent={ListHeaderComponent}
              navigation={navigation}
              data={data}
              userId={user.id}
              mode={mode}
            />
          </Box>
        )}
      </>
    );
  }
}

export default PersonScreen;

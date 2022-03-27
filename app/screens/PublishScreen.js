import React, { useState } from "react";
import {
  Box,
  Input,
  Text,
  Image,
  Button,
  KeyboardAvoidingView,
} from "native-base";
import Topbar from "../components/Topbar";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  DancingScript_400Regular,
  DancingScript_700Bold,
} from "@expo-google-fonts/dancing-script";
import AppLoading from "expo-app-loading";
import { Platform } from "react-native";
import axios from "axios";
import serverUrl from "../util/serverUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async } from "@firebase/util";

function PublishScreen({ route, navigation }) {
  const { uri, id } = route.params;
  //console.log(route.params);
  const [tag, setTag] = useState("Other");
  const [imageName, setImageName] = useState("");
  // const [userId, setUserId] = useState('');
  // const [profile_pic, setProfile_pic] = useState('')
  // const [userName, setuserName] = useState
  //const [user, setUser] = useState({})

  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
    DancingScript_700Bold,
  });

  const Feed = {};
  const User = {};
  const handlePublish = async () => {
    // make post request to create Feed
    // make put request to update user profile
    // direct page to homeTab after successfully doing above
    await AsyncStorage.getItem("user")
      .then(async (res) => {
        Feed.author = JSON.parse(res).name;
        Feed.id = id;
        Feed.imageSrc = uri;
        Feed.tag = tag;
        Feed.imageName = imageName;
        Feed.comments = [];
        Feed.savedBy = [];
        await axios
          .post(`${serverUrl}/feeds/${id}`, JSON.stringify(Feed))
          .then(async (res) => {
            const feed = res.data;
            //make put request to update user profile
            await AsyncStorage.getItem("user").then(async (res) => {
              User.id = JSON.parse(res).id;
              User.name = JSON.parse(res).name;
              User.profile_pic = JSON.parse(res).profile_pic;
              User.createdFeed = JSON.parse(res).createdFeed.concat(
                feed
              );
              User.savedFeed = JSON.parse(res).savedFeed;
              console.log(User)

              await axios
                .put(`${serverUrl}/users/${User.id}`, JSON.stringify(User))
                .then((res) => {
                  console.log(res.data);
                  navigation.push("HomeTab");
                })
                .catch((err) => console.log(err));
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Topbar />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Input
            type="text"
            variant="underlined"
            placeholder="Put your intersting title here"
            textAlign="center"
            w={280}
            alignSelf="center"
            marginTop={10}
            value={imageName}
            onChangeText={(text) => setImageName(text)}
            fontSize={18}
            fontWeight="bold"
            fontFamily="DancingScript_700Bold"
            isRequired
            my={1}
          />
          <Image
            src={uri}
            w={200}
            h={200}
            mx="auto"
            my={5}
            borderRadius={15}
            alt="monet"
            resizeMode="cover"
          />
          <Text
            fontSize={18}
            textAlign="center"
            fontWeight="bold"
            fontFamily="DancingScript_400Regular"
          >
            Choose one tag:
          </Text>
          <Box
            flexDir="row"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
            borderRadius={10}
            p={2}
          >
            <Button
              w={120}
              borderRadius={10}
              bgColor="gray.400"
              _pressed={{ opacity: 0.6 }}
              mx="auto"
              onPress={() => setTag("Landscape")}
              leftIcon={
                tag === "Landscape" ? (
                  <AntDesign name="checkcircleo" size={20} color="black" />
                ) : (
                  <></>
                )
              }
            >
              <Text color="white" fontFamily="DancingScript_400Regular">
                #Landscape
              </Text>
            </Button>
            <Button
              w={120}
              borderRadius={10}
              bgColor="gray.400"
              _pressed={{ opacity: 0.6 }}
              mx="auto"
              onPress={() => setTag("Pet")}
              leftIcon={
                tag === "Pet" ? (
                  <AntDesign name="checkcircleo" size={20} color="black" />
                ) : (
                  <></>
                )
              }
            >
              <Text color="white" fontFamily="DancingScript_400Regular">
                #Pet
              </Text>
            </Button>
            <Button
              w={120}
              borderRadius={10}
              bgColor="gray.400"
              _pressed={{ opacity: 0.6 }}
              mx="auto"
              my={2}
              onPress={() => setTag("Selfie")}
              leftIcon={
                tag === "Selfie" ? (
                  <AntDesign name="checkcircleo" size={20} color="black" />
                ) : (
                  <></>
                )
              }
            >
              <Text color="white" fontFamily="DancingScript_400Regular">
                #Selfie
              </Text>
            </Button>
            <Button
              w={120}
              borderRadius={10}
              bgColor="gray.400"
              _pressed={{ opacity: 0.6 }}
              mx="auto"
              my={2}
              onPress={() => setTag("Other")}
              leftIcon={
                tag === "Other" ? (
                  <AntDesign name="checkcircleo" size={20} color="black" />
                ) : (
                  <></>
                )
              }
            >
              <Text color="white" fontFamily="DancingScript_400Regular">
                #Other
              </Text>
            </Button>
          </Box>
          <Button
            w={100}
            h={50}
            mx="auto"
            my={5}
            borderRadius={10}
            _pressed={{ opacity: 0.6 }}
          >
            <Text
              color="white"
              fontFamily="DancingScript_400Regular"
              fontSize={20}
              my="auto"
              onPress={handlePublish}
            >
              Publish
            </Text>
          </Button>
        </KeyboardAvoidingView>
      </>
    );
  }
}

export default PublishScreen;

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
function PublishScreen({ route, navigation }) {
  //console.log(route.params);
  const [tag, setTag] = useState("Other");
  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
    DancingScript_700Bold,
  });

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
            fontSize={18}
            fontWeight="bold"
            fontFamily="DancingScript_700Bold"
            isRequired
            my={1}
          />
          <Image
            src={route.params.uri}
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
            bgColor="red.500"
            _pressed={{ opacity: 0.6 }}
          >
            <Text
              color="white"
              fontFamily="DancingScript_400Regular"
              fontSize={20}
              my="auto"
              onPress={() => {
                navigation.push("HomeTab");
              }}
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

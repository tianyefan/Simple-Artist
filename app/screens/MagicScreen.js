import React, { useState } from "react";
import {
  Box,
  Stack,
  Text,
  Image,
  Button,
  Input,
  KeyboardAvoidingView,
} from "native-base";
import Topbar from "../components/Topbar";
import { FontAwesome5 } from "@expo/vector-icons";
import { Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
function MagicScreen({ route, navigation }) {
  const { uri } = route.params;
  let image_uri = uri;
  let doge_url =
    "https://firebasestorage.googleapis.com/v0/b/smart-med-aba54.appspot.com/o/doge.jpeg?alt=media&token=cd2dac08-c9ec-4ec8-91b6-a8ca63977322";
  const [click, setClick] = useState(false);
  const [finish, setFinish] = useState(false);
  const [tag, setTag] = useState("Other");
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  return (
    <>
      <Topbar />
      {finish && (
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
            isRequired
            my={1}
          />
        </KeyboardAvoidingView>
      )}
      <Image
        src={click && finish ? doge_url : image_uri}
        w={300}
        h={200}
        borderRadius={15}
        margin="auto"
        alt="monet"
        resizeMode="cover"
        my={1}
      />
      {!finish && (
        <Button
          w={200}
          h={45}
          margin="auto"
          borderRadius={10}
          isLoading={click && !finish ? true : false}
          isLoadingText="Transforming..."
          _pressed={{ opacity: 0.7 }}
          onPress={async () => {
            setClick(true);
            await delay(3000);
            setFinish(true);
          }}
          bgColor="black"
          leftIcon={<FontAwesome5 name="magic" size={24} color="white" />}
          _loading={{
            bg: "black",
            _text: {
              color: "white",
            },
          }}
        >
          <Text color="white">Transform</Text>
        </Button>
      )}
      {finish && (
        <>
          <Text fontSize={15} textAlign="center" fontWeight="bold">
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
              variant="outline"
              w={120}
              borderRadius={10}
              mx="auto"
              onPress={() => setTag("Landscape")}
              leftIcon={
                tag === "Landscape" ? (
                  <AntDesign name="checkcircleo" size={20} color="green" />
                ) : (
                  <></>
                )
              }
            >
              #Landscape
            </Button>
            <Button
              variant="outline"
              w={120}
              borderRadius={10}
              mx="auto"
              onPress={() => setTag("Pet")}
              leftIcon={
                tag === "Pet" ? (
                  <AntDesign name="checkcircleo" size={20} color="green" />
                ) : (
                  <></>
                )
              }
            >
              #Pet
            </Button>
            <Button
              color="red.300"
              variant="outline"
              w={120}
              borderRadius={10}
              mx="auto"
              my={2}
              onPress={() => setTag("Selfie")}
              leftIcon={
                tag === "Selfie" ? (
                  <AntDesign name="checkcircleo" size={20} color="green" />
                ) : (
                  <></>
                )
              }
            >
              #Selfie
            </Button>
            <Button
              variant="outline"
              w={120}
              borderRadius={10}
              mx="auto"
              my={2}
              onPress={() => setTag("Other")}
              leftIcon={
                tag === "Other" ? (
                  <AntDesign name="checkcircleo" size={20} color="green" />
                ) : (
                  <></>
                )
              }
            >
              #Other
            </Button>
          </Box>
        </>
      )}
      {finish && (
        <Button
          w={75}
          h={35}
          m="auto"
          mb={2}
          borderRadius={10}
          bgColor="red.400"
          _pressed={{ opacity: 0.6 }}
        >
          Publish
        </Button>
      )}
    </>
  );
}

export default MagicScreen;

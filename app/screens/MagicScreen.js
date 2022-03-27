import React, { useState } from "react";
import { Text, Image, Button, Box } from "native-base";
import Topbar from "../components/Topbar";
import { FontAwesome5 } from "@expo/vector-icons";
import { Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  useFonts,
  DancingScript_400Regular,
} from "@expo-google-fonts/dancing-script";
import AppLoading from "expo-app-loading";
import serverUrl from "../util/serverUrl";
import axios from "axios";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
function MagicScreen({ route, navigation }) {
  const { uri, base64 } = route.params;
  let image_uri = uri;
  const [click, setClick] = useState(false);
  const [finish, setFinish] = useState(false);
  const [imageUrl, setImageUrl] = useState(image_uri);
  const [id, setId] = useState('')
  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
  });

  const handleTransform = async () => {
    //first upload the image to db
    // make request to server and get back transfromed
    // image
    setClick(true);
    await axios
      .post(
        `${serverUrl}/image`,
        JSON.stringify({
          base64: base64,
        })
      )
      .then((result) => {
        
        getDownloadURL(ref(storage, result.data["ref"])).then(async (url) => {
         
          await axios
            .post(
              `${serverUrl}/transform`,
              JSON.stringify({
                contentUrl: url,
              })
            )
            .then((res) => {
              getDownloadURL(ref(storage, res.data["ref"])).then(
                (transformedUrl) => {
                  setFinish(true);
                  setId(String(res.data["ref"]).substring(13))
                  setImageUrl(transformedUrl);
                }
              );
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  const handleOnPress = () => {
    navigation.push("PublishStack", {
      uri: imageUrl,
      id: id
    });
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Topbar />
        <Box alignItems="center" justifyContent="center">
          <Image
            src={imageUrl}
            w={300}
            h={300}
            margin="auto"
            borderRadius={15}
            alt="monet"
            resizeMode="cover"
            my={50}
          />
        </Box>
        {!finish && (
          <Button
            w={150}
            h={45}
            mx="auto"
            borderRadius={10}
            isLoading={click && !finish ? true : false}
            isLoadingText={
              <Text color="white" fontFamily="DancingScript_400Regular">
                Transforming
              </Text>
            }
            _pressed={{ opacity: 0.7 }}
            onPress={handleTransform}
            bgColor="black"
            leftIcon={
              <FontAwesome5 name="feather-alt" size={24} color="white" />
            }
            _loading={{
              bg: "black",
              _text: {
                color: "white",
              },
            }}
          >
            <Text color="white" fontFamily="DancingScript_400Regular">
              SimArt
            </Text>
          </Button>
        )}

        {finish && (
          <>
            <Box alignItems="center" justifyContent="center" flexDir="row">
              <Button
                mx="auto"
                bgColor="green.500"
                borderRadius={10}
                _pressed={{ opacity: 0.7 }}
                w={90}
              >
                <Text color="white" fontFamily="DancingScript_400Regular">
                  Download
                </Text>
              </Button>
              <Button
                mx="auto"
                bgColor="red.500"
                borderRadius={10}
                _pressed={{ opacity: 0.7 }}
                w={90}
                onPress={handleOnPress}
              >
                <Text color="white" fontFamily="DancingScript_400Regular">
                  Share
                </Text>
              </Button>
            </Box>
          </>
        )}
      </>
    );
  }
}

export default MagicScreen;

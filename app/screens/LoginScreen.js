import React from "react";
import { Dimensions } from "react-native";
import AppLoading from "expo-app-loading";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  useFonts,
  DancingScript_400Regular,
} from "@expo-google-fonts/dancing-script";
import {
  Box,
  Text,
  Button,
  Stack,
  Image,
  KeyboardAvoidingView,
} from "native-base";
import Carousel from "react-native-snap-carousel";
//import auth from "../firebase/firebase";
import Login from "../components/Login";
import { Platform, Keyboard } from "react-native";
function LoginScreen({ navigation }) {
  const IMAGES = [
    {
      uri: "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/Masterpiece%2Fstarry-night-print-by-vincent-van-gogh-vincent-van-gogh.jpg?alt=media&token=2349af90-d260-44cc-bf99-ca8e0d0aabdc",
    },
    {
      uri: "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/Masterpiece%2F800px-Monet_-_Impression%2C_Sunrise.jpg?alt=media&token=43d0b54c-8800-418b-a7de-da450fb3fccf",
    },
    {
      uri: "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/Masterpiece%2F700px-Monet_-_Monets_Garten_in_Giverny.jpg?alt=media&token=7434c97f-34ee-450d-abe4-ce9610de1543",
    },
    {
      uri: "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/Masterpiece%2F540px-Claude_Monet_-_The_Magpie_-_Google_Art_Project.jpg?alt=media&token=1fdc117d-2f0b-4e12-89ce-fc2ff591dbd7",
    },
    {
      uri: "https://firebasestorage.googleapis.com/v0/b/simart-5a0ac.appspot.com/o/Masterpiece%2FVincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg?alt=media&token=4b56eafa-939e-4bde-9c2d-e51dc164a0eb",
    },
  ];
  const handleLogin = () => {
    //console.log(auth)
    navigation.push("HomeTab");
  };
  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
  });
  const { width: screenWidth } = Dimensions.get("window");
  let renderItem = ({ item }) => {
    return (
      <Image
        source={{ uri: item.uri }}
        w={300}
        h={200}
        mt={10}
        borderRadius={30}
        alt="login_image"
        shadow="10"
      />
    );
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <Box bgColor="blueGray.50" safeArea>
          <Carousel
            data={IMAGES}
            renderItem={renderItem}
            itemWidth={screenWidth - 110}
            sliderWidth={screenWidth}
            loop={true}
            autoplay={true}
            layout="stack"
          />
        </Box>
        <Stack
          space={5}
          alignItems="center"
          direction="column"
          safeArea
          bgColor="blueGray.50"
          h="100%"
        >
          <Box>
            <Text fontSize={48} fontFamily="DancingScript_400Regular">
              SimArt
            </Text>
          </Box>
          <Box flexDir="row" alignItems="center">
            <Text
              fontSize={24}
              fontFamily="DancingScript_400Regular"
              maxW="70%"
            >
              Transform your photo into a masterpiece
            </Text>
            <FontAwesome5 name="feather-alt" size={60} color="black" />
          </Box>

          {/* <Button
              endIcon={<FontAwesome5 name="google" size={20} color="white" />}
              borderRadius={10}
              bgColor="red.400"
              fontWeight="bold"
              size="lg"
              _pressed={{ opacity: 0.6 }}
              onPress={handleLogin}
            >
              Login With
            </Button> */}
          <Login navigation={navigation}/>
        </Stack>
      </>
    );
  }
}

export default LoginScreen;

import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import AppLoading from "expo-app-loading";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  useFonts,
  DancingScript_400Regular,
} from "@expo-google-fonts/dancing-script";
import { Box, Text, Button, Stack, Image } from "native-base";
import Carousel from "react-native-snap-carousel";

function LoginScreen() {
  const IMAGES = [
    {
      illustration: "https://i.imgur.com/UYiroysl.jpg",
    },
    {
      illustration: "https://i.imgur.com/UPrs1EWl.jpg",
    },
    {
      illustration: "https://i.imgur.com/MABUbpDl.jpg",
    },
    {
      illustration: "https://i.imgur.com/KZsmUi2l.jpg",
    },
    {
      illustration: "https://i.imgur.com/2nCt3Sbl.jpg",
    },
  ];
  let [fontsLoaded] = useFonts({
    DancingScript_400Regular,
  });
  const { width: screenWidth } = Dimensions.get("window");
  let renderItem = ({ item }) => {
    return (
      <Image
        source={{ uri: item.illustration }}
        w={300}
        h={250}
        mt={10}
        borderRadius={30}
        alt="login_image"
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
          space={10}
          alignItems="center"
          direction="column"
          safeArea
          bgColor="blueGray.50"
          h="100%"
        >
          <Box>
            <Text fontSize={48} fontFamily="DancingScript_400Regular">
              Simple Artist
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
          <Box>
            <Button
              endIcon={<FontAwesome5 name="google" size={20} color="white" />}
              borderRadius={10}
              bgColor="red.400"
              fontWeight="bold"
              size="lg"
              _pressed={{ opacity: 0.6 }}
            >
              Login With
            </Button>
          </Box>
        </Stack>
      </>
    );
  }
}

export default LoginScreen;

import React from "react";
import {
  Box,
  Stack,
  Actionsheet,
  useDisclose,
  Text,
  Center,
  Button,
} from "native-base";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import { LogBox } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();


function BottomBar() {
  LogBox.ignoreAllLogs();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [screen, setScreen] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };
  const takePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };
  return (
    <>
      <Stack
        direction="row"
        position="absolute"
        bottom={0}
        justifyContent="center"
        h={75}
        bgColor="blueGray.50"
        w="100%"
        space={10}
      >
        <Box>
          <MaterialCommunityIcons
            name={screen === "Home" ? "home" : "home-outline"}
            size={35}
            color="#000"
            onPress={() => {
              setScreen("Home");
            }}
            style={{ padding: 10 }}
          />
        </Box>

        <Box>
          <MaterialCommunityIcons
            name="plus-box-outline"
            size={50}
            color="#000"
            onPress={onOpen}
            style={{ padding: 5 }}
          />
        </Box>
        <Box>
          <MaterialIcons
            name={screen === "Profile" ? "person" : "person-outline"}
            size={35}
            color="#000"
            onPress={() => {
              setScreen("Profile");
            }}
            style={{ padding: 10 }}
          />
        </Box>
      </Stack>
      <Center safeArea>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text fontSize={16}>Create</Text>
            </Box>
            <Actionsheet.Item
              startIcon={<MaterialIcons name="file-upload" size={30} />}
              onPress={pickImage}
            >
              Upload a Photo
            </Actionsheet.Item>
            <Actionsheet.Item
              startIcon={<MaterialIcons name="photo-camera" size={30} />}
              onPress={takePhoto}
            >
              Take a Photo
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={onClose}
              startIcon={<MaterialIcons name="close" size={30} />}
            >
              Cancel
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </>
  );
}

export default BottomBar;

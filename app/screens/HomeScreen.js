import React, { useState } from "react";
import {
  Box,
  Fab,
  Icon,
  useDisclose,
  Actionsheet,
  Center,
  Text,
} from "native-base";

import * as ImagePicker from "expo-image-picker";
import Masonry from "../components/Masonry";
import Topbar from "../components/Topbar";
import BottomBar from "../components/BottomBar";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
function HomeScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      navigation.push("MagicStack", {
        uri: selectedImage,
      });
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

    //console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      navigation.push("MagicStack", {
        uri: selectedImage,
      });
    }
  };
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <>
      <Topbar />
      <Box>
        <Masonry />
      </Box>
      <Fab
        renderInPortal={false}
        shadow={2}
        right={2}
        bottom={5}
        icon={<Icon color="white" as={AntDesign} name="plus" size="5" />}
        onPress={onOpen}
      />
      <Center safeArea>
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box w="100%" h={60} px={4} justifyContent="center">
              <Text fontSize={16}>Create</Text>
            </Box>
            <Actionsheet.Item
              onPress={pickImage}
              startIcon={<MaterialIcons name="file-upload" size={30} />}
            >
              Upload a Photo
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={takePhoto}
              startIcon={<MaterialIcons name="photo-camera" size={30} />}
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

export default HomeScreen;

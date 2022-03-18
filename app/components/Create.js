import React, { useState } from "react";
import {
  Box,
  Actionsheet,
  useDisclose,
  Text,
  Center,
  Fab,
  Icon,
} from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
function Create({ navigation }) {
  const { isOpen, onOpen, onClose } = useDisclose();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((res) => {
      navigation.push("MagicStack", {
        uri: res.uri,
      });
    });
  };

  const takePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      navigation.push("MagicStack", {
        uri: result.uri,
      });
    }
  };

  return (
    <>
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
            <Actionsheet.Header>
              <Text fontSize={16}>Create</Text>
            </Actionsheet.Header>
            <Actionsheet.Item
              onPress={pickImage}
              startIcon={<MaterialIcons name="file-upload" size={30} />}
            >
              <Text>Upload a photo</Text>
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={takePhoto}
              startIcon={<MaterialIcons name="photo-camera" size={30} />}
            >
              <Text>Take a Photo</Text>
            </Actionsheet.Item>
            <Actionsheet.Item
              onPress={onClose}
              startIcon={<MaterialIcons name="close" size={30} />}
            >
              <Text>Cancel</Text>
            </Actionsheet.Item>
          </Actionsheet.Content>
        </Actionsheet>
      </Center>
    </>
  );
}

export default Create;

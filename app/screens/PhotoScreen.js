import React, { useState } from "react";
import { Box, Button, Text, Stack, Image } from "native-base";
import * as ImagePicker from "expo-image-picker";

function PhotoScreen() {
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
        direction="column"
        safeArea
        alignItems="center"
        justifyContent="center"
        space={20}
      >
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            w={200}
            h={200}
            alt="picture"
          />
        )}
        <Box alignItems="center" justifyContent="center">
          <Button onPress={takePhoto}>Take a picture</Button>
        </Box>
        <Box>
          <Button onPress={pickImage}>Upload a picture</Button>
        </Box>
      </Stack>
    </>
  );
}

export default PhotoScreen;

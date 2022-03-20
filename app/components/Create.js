import React, { useState, useRef, useEffect } from "react";
import { Box, Fab, Icon } from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Animatable from "react-native-animatable";
function Create({ navigation }) {
  const AnimateFab = Animatable.createAnimatableComponent(Fab);
  const Fabref = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      Fabref.current.transition(
        { rotate: "0deg" },
        { rotate: "45deg" },
        250,
        "linear"
      );
    } else {
      Fabref.current.transition(
        { rotate: "45deg" },
        { rotate: "0deg" },
        250,
        "linear"
      );
    }
  }, [open]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((res) => {
      //setOpen(false);
      if (res.cancelled) {
        setOpen((prevState) => !prevState);
      }
      if (!res.cancelled) {
        navigation.push("MagicStack", {
          uri: res.uri,
        });
      }
    });
  };

  const takePhoto = async () => {
    // No permissions request is necessary for launching the image library
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.cancelled) {
      setOpen((prevState) => !prevState);
    }

    if (!result.cancelled) {
      //setOpen(false);
      navigation.push("MagicStack", {
        uri: result.uri,
      });
    }
  };

  return (
    <>
      <Box
        bottom={0}
        right={0}
        position="absolute"
        alignItems="center"
        justifyContent="center"
      >
        {open && (
          <AnimateFab
            renderInPortal={false}
            animation="bounceInUp"
            easing="linear"
            my={32}
            shadow={2}
            icon={
              <Icon color="white" as={MaterialIcons} name="image" size="5" />
            }
            onPress={pickImage}
          />
        )}
        {open && (
          <AnimateFab
            renderInPortal={false}
            animation="bounceInUp"
            easing="linear"
            my={16}
            shadow={2}
            icon={<Icon color="white" as={AntDesign} name="camera" size="5" />}
            onPress={takePhoto}
          />
        )}
        <AnimateFab
          renderInPortal={false}
          shadow={2}
          icon={<Icon color="white" as={AntDesign} name="plus" size="5" />}
          onPress={() => {
            setOpen((preState) => !preState);
          }}
          ref={Fabref}
        />
      </Box>

      {/* <Center safeArea>
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
      </Center> */}
    </>
  );
}

export default Create;

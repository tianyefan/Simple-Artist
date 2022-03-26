import React, { useState, useRef, useEffect } from "react";
import { Box, Fab, Icon } from "native-base";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Animatable from "react-native-animatable";
import { storage } from "../firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import {
  ref,
  uploadString,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import serverUrl from "../util/serverUrl";
import { supabase } from "../lib/supabase";
import { PhoneMultiFactorGenerator } from "firebase/auth/react-native";

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

    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    })
      .then(async (res) => {
        if (res.cancelled) {
          setOpen((prevState) => !prevState);
        }
        if (!res.cancelled) {
          // const fileName = `upload${uuidv4()}.jpg`;
          // var formData = new FormData();
          // formData.append("files", {
          //   uri: res.uri,
          //   name: fileName,
          //   type: `image/jpg`,
          // });

          // const { data, error } = await supabase.storage
          //   .from("simart-images")
          //   .upload(fileName, formData);

          // if (data) {
          //   console.log(data);
          // }

          // if (error) {
          //   console.log(error);
          // }
          await axios
            .post(
              `${serverUrl}/image`,
              JSON.stringify({
                base64: res.base64,
              })
            )
            .then((result) => {
              //console.log(result.data);
              getDownloadURL(ref(storage, result.data["ref"])).then((url) => {
                console.log(url);
                navigation.push("MagicStack", {
                  uri: url,
                });
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  const takePhoto = async () => {
    // No permissions request is necessary for launching the image library
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    })
      .then(async (res) => {
        if (res.cancelled) {
          setOpen((prevState) => !prevState);
        }
        if (!res.cancelled) {
          // const fileName = "testImage1";
          // var formData = new FormData();
          // formData.append("files", {
          //   uri: res.uri,
          //   name: fileName,
          //   type: `image/jpg`,
          // });

          // const { data, error } = await supabase.storage
          //   .from("simart-images")
          //   .upload(fileName, formData);

          // if (data) {
          //   console.log(data);
          // }

          // if (error) {
          //   console.log(error);
          // }
          await axios
            .post(
              `${serverUrl}/image`,
              JSON.stringify({
                base64: res.base64,
              })
            )
            .then((result) => {
              //console.log(result.data);
              getDownloadURL(ref(storage, result.data["ref"])).then((url) => {
                console.log(url);
                navigation.push("MagicStack", {
                  uri: url,
                });
              });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
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
    </>
  );
}

export default Create;

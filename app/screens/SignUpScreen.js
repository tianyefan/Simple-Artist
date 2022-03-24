import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import {
  Box,
  Text,
  Input,
  KeyboardAvoidingView,
  Stack,
  Button,
  Icon,
  useToast,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Platform, Keyboard } from "react-native";
import auth from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { async, stringify } from "@firebase/util";
import axios from "axios";
import serverUrl from "../util/serverUrl";
//const serverURL = "https://3d3d-2601-647-5701-4a40-7c47-b4f1-9f6d-c651.ngrok.io";

function SignUpScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const toast = useToast();
  const user = {};

  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        // make a post request to server and let server create
        //  a User and save to Firestore Storage
        userId = res.user.uid;
        user["id"] = userId
        user["name"] = res.user.email;
        user["profile_pic"] =
          "https://firebasestorage.googleapis.com/v0/b/smart-med-aba54.appspot.com/o/doge.jpg?alt=media&token=a297f8f7-185f-4b90-9d5d-151982bc1541";
      
        //console.log(JSON.stringify(user));
        await axios
          .post(`${serverUrl}/users/${userId}`, JSON.stringify(user))
          .then((response) => {
            //console.log(response.data);
            toast.show({
              description: "Sign up successfully!",
              placement: "bottom",
              duration: 1000,
            });
            navigation.push("SignIn");
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        toast.show({ description: stringify(err.code), placement: "bottom" });
        //console.log(err);
      });
  };

  return (
    <>
      <Topbar />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        my="auto"
      >
        <Stack space={4} w="100%" alignItems="center">
          <Text fontSize={18}>Register</Text>
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            h={43}
            fontSize={15}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="email" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Email Address"
            variant="rounded"
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            w={{
              base: "75%",
              md: "25%",
            }}
            h={43}
            fontSize={15}
            type={show ? "text" : "password"}
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
                onPress={() => setShow(!show)}
              />
            }
            placeholder="Password"
            variant="rounded"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Button
            my={3}
            w={100}
            borderRadius={10}
            variant="subtle"
            onPress={handleSignUp}
          >
            Register
          </Button>
        </Stack>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignUpScreen;

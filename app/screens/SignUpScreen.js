import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import {
  Text,
  Input,
  KeyboardAvoidingView,
  Stack,
  Button,
  Icon,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import auth from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import serverUrl from "../util/serverUrl";
import { getProfile } from "../util/profileUtil";

function SignUpScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const toast = useToast();

  
  const user = {};
  const pro_pic = getProfile()
  const handleSignUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        // make a post request to server and let server create
        //  a User and save to Firestore Storage
        userId = res.user.uid;
        user["id"] = userId;
        user["name"] = res.user.email;
        user["profile_pic"] = pro_pic;

        await axios
          .post(`${serverUrl}/users/${userId}`, JSON.stringify(user))
          .then((response) => {
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

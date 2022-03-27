import React, { useState } from "react";
import Topbar from "../components/Topbar";
import {
  Text,
  Input,
  Stack,
  Icon,
  KeyboardAvoidingView,
  Button,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import auth from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import serverUrl from "../util/serverUrl";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";

function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();

  const saveUser = async (response) => {
    await AsyncStorage.setItem("user", JSON.stringify(response.data))
    .then(() => {
      toast.show({
        description: "Sign in !",
        placement: "bottom",
        duration: 1000,
      });
      navigation.push("HomeTab");
    })
    .catch(
      (err) => console.log(err)
    );
  };

  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const userId = res.user.uid;
        await axios
          .get(`${serverUrl}/users/${userId}`)
          .then(async (response) => {
            saveUser(response);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        toast.show({
          description: JSON.stringify(err.code),
          placement: "bottom",
        });
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
          <Text fontSize={18}>Login</Text>
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
            w={70}
            borderRadius={10}
            variant="subtle"
            onPress={handleSignIn}
          >
            Login
          </Button>
        </Stack>
      </KeyboardAvoidingView>
    </>
  );
}

export default SignInScreen;

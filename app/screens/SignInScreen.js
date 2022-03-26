import React from "react";
import Topbar from "../components/Topbar";
import {
  Box,
  Text,
  Input,
  Stack,
  Icon,
  KeyboardAvoidingView,
  Button,
  useToast,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Platform, Keyboard } from "react-native";
import auth from "../firebase/firebase";
import { supabase } from "../lib/supabase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import serverUrl from "../util/serverUrl";
import axios from "axios";
function SignInScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const toast = useToast();
  //const serverURL =
  // "https://3d3d-2601-647-5701-4a40-7c47-b4f1-9f6d-c651.ngrok.io";

  const handleSignIn = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        const userId = res.user.uid;
        await axios
          .get(`${serverUrl}/users/${userId}`)
          .then((response) => {
            //console.log(response.data);
            toast.show({
              description: "Sign in !",
              placement: "bottom",
              duration: 1000,
            });
            navigation.push("HomeTab", {
              params: { user: response.data },
              screen: "Profile",
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        toast.show({
          description: JSON.stringify(err.code),
          placement: "bottom",
        });
        //console.log(err);
      });

    // const { user, error } = await supabase.auth.signIn({
    //   email: email,
    //   password: password,
    // });

    // if (user) {
    //   toast.show({
    //     description: "Sign in !",
    //     placement: "bottom",
    //     duration: 1000,
    //   });
    //   navigation.push("HomeTab", {
    //     params: { user : user },
    //     screen: "Profile",
    //   });
    // }
    // if (error) {
    //   console.log(error);
    // }
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

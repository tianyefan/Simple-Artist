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
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Platform, Keyboard } from "react-native";
import auth from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
function SignInScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user.email);
        navigation.push("HomeTab");
      })
      .catch((err) => {
        console.log(err);
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

import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Icon,
  Stack,
  KeyboardAvoidingView,
} from "native-base";

import { Platform, Keyboard , LogBox} from "react-native";
LogBox.ignoreAllLogs()
function Login({navigation}) {

  return (
    <Box>
        <Button my={3} borderRadius={10} variant="subtle" w={100} onPress={() => navigation.push('SignIn')}>
            Sign In
        </Button>
        <Button borderRadius={10} variant="subtle" onPress={() => navigation.push('SignUp')}>
            Sign Up
        </Button>
    </Box>
  );
}

export default Login;

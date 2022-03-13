import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native'
import { FontAwesome5 } from "@expo/vector-icons";
function LoginButton(props) {
  const content = (
    <SafeAreaView style={[styles.button,{backgroundColor: props.color}]}>
        <FontAwesome5 name="google" size={30} color="white" />
        <Text style={styles.text}>{props.title}</Text>
    </SafeAreaView>
  )

  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}

const styles = StyleSheet.create({
    button: {
        padding: 5,
        width: 180,
        height: 70,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent:  "center"
    },
    text: {
        color: '#fff',
        fontSize: 14,
        marginTop: 10,
    }
})

export default LoginButton
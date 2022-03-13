import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native'

function Button(props) {
  const content = (
    <SafeAreaView style={[styles.button,{backgroundColor: props.color}]}>
        <Text style={[styles.text,{color: props.textColor}]}>{props.title}</Text>
    </SafeAreaView>
  )

  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        width: 100,
        height: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: "center"
    },
    text: {
        fontSize: 14,
        fontFamily: "DancingScript_400Regular"
    }
})

export default Button
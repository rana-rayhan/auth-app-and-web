import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const AppLink = ({ onPress, text }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={css.linkStyle}>{text}</Text>
    </Pressable>
  );
};

const css = StyleSheet.create({
  container: {},
  linkStyle: {
    color: "blue",
    fontSize: 16,
    marginHorizontal: 5,
    marginTop: 10,
  },
});

export default AppLink;

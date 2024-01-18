import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const SubmitButton = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={css.container}>
      <Text style={css.btnTitle}>{title}</Text>
    </Pressable>
  );
};

const css = StyleSheet.create({
  container: {
    width: 350,
    backgroundColor: "blue",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 15,
  },
  btnTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SubmitButton;

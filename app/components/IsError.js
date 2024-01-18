import React from "react";
import { Text, StyleSheet } from "react-native";

const IsError = ({ isError }) => {
  return <Text style={css.errorStyle}>{isError}</Text>;
};

const css = StyleSheet.create({
  conatiner: {},
  errorStyle: {
    fontSize: 18,
    alignSelf: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    color: "red",
  },
});

export default IsError;

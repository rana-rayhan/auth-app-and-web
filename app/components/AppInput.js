import { StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";

const AppInput = ({ placeholder, handleChange, ...rest }) => {
  return (
    <TextInput
      autoCapitalize="none"
      style={css.inputStyle}
      placeholder={placeholder}
      onChangeText={handleChange}
    />
  );
};

const css = StyleSheet.create({
  container: {},
  inputStyle: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    width: 350,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default AppInput;

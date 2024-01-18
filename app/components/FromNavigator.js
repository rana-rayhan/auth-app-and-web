import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AppLink from "./AppLink";

const FromNavigator = ({ leftLink, rightLink, leftPress, rightPress }) => {
  return (
    <View style={css.container}>
      <AppLink onPress={leftPress} text={leftLink} />
      <AppLink onPress={rightPress} text={rightLink} />
    </View>
  );
};

const css = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appLink: {},
});

export default FromNavigator;

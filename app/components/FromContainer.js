import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const FromContainer = ({ children }) => {
  return (
    <View style={css.conatiner}>
      <ScrollView>
        <Icon name="lock" size={50} color="blue" style={css.headingText} />
        {children}
      </ScrollView>
    </View>
  );
};

const css = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headingText: {
    marginTop: 100,
    alignSelf: "center",
    color: "grey",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
    fontSize: 100,
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default FromContainer;

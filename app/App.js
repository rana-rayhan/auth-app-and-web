import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./components/navigation/AuthNavigator";
import ActiveEmail from "./components/screen/ActiveEmail";

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: "#fff" },
  };
  return (
    <NavigationContainer theme={theme}>
      <AuthNavigator />
      {/* <ActiveEmail/> */}
    </NavigationContainer>
  );
};

export default App;

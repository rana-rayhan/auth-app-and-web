import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screen/Login";
import ForgetPassword from "../screen/ForgetPassword";
import SignUp from "../screen/SignUp";
import ActiveEmail from "../screen/ActiveEmail";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="activeEmail" component={ActiveEmail} />
      <Stack.Screen name="forgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

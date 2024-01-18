import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FromContainer from "../FromContainer";
import AppInput from "../AppInput";
import SubmitButton from "../SubmitButton";
import FromNavigator from "../FromNavigator";
import { baseUrl } from "../../api/api";
import axios from "axios";
import IsError from "../IsError";

const Login = () => {
  const nvg = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isError, setError] = useState();

  const handleOnChange = (text, inputType) => {
    if (inputType === "email") {
      setEmail(text);
    } else if (inputType === "password") {
      setPassword(text);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = { email: email.toLowerCase(), password: password };
    try {
      const { data } = await axios.post(`${baseUrl}/api/users/login`, obj);
      console.log(data.payload);
    } catch (error) {
      if (error?.response?.data?.message?.message) {
        setError(error?.response?.data?.message?.message);
        console.log(error?.response?.data?.message?.message);
      } else {
        setError(error?.response?.data?.message);
        console.log(error?.response?.data?.message);
      }
    }
  };

  return (
    <FromContainer>
      {isError && <IsError isError={isError} />}
      <AppInput
        placeholder="example@example.com"
        handleChange={(text) => handleOnChange(text, "email")}
      />
      <AppInput
        placeholder="**********"
        handleChange={(text) => handleOnChange(text, "password")}
      />
      <SubmitButton onPress={handleSubmit} title="Login" />
      <FromNavigator
        leftPress={() => nvg.navigate("signup")}
        rightPress={() => nvg.navigate("forgetPassword")}
        leftLink="Sign up"
        rightLink="Forget Password"
      />
    </FromContainer>
  );
};

export default Login;

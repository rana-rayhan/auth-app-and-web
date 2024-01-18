import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import FromContainer from "../FromContainer";
import AppInput from "../AppInput";
import SubmitButton from "../SubmitButton";
import FromNavigator from "../FromNavigator";
import { baseUrl } from "../../api/api";
import axios from "axios";
import IsError from "../IsError";

const ForgetPassword = () => {
  const nvg = useNavigation();
  const [email, setEmail] = useState();
  const [isError, setError] = useState();

  const handleOnChange = (text) => {
    setEmail(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/users/forget-password`,
        {
          email: email.toLowerCase(),
        }
      );
      console.log(data);
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
        handleChange={handleOnChange}
        placeholder="example@example.com"
      />
      <SubmitButton onPress={handleSubmit} title="Send Reset Link" />
      <FromNavigator
        leftPress={() => nvg.navigate("login")}
        rightPress={() => nvg.navigate("signup")}
        leftLink="Login"
        rightLink="Sign Up"
      />
    </FromContainer>
  );
};

export default ForgetPassword;

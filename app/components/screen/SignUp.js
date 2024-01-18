import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AppInput from "../AppInput";
import SubmitButton from "../SubmitButton";
import FromNavigator from "../FromNavigator";
import FromContainer from "../FromContainer";
import axios from "axios";
import { baseUrl } from "../../api/api";
import IsError from "../IsError";

const SignUp = () => {
  const nvg = useNavigation();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isError, setError] = useState();

  const handleOnChange = (text, inputType) => {
    if (inputType === "email") {
      setEmail(text);
    } else if (inputType === "password") {
      setPassword(text);
    } else if (inputType === "name") {
      setName(text);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = { name, email: email.toLowerCase(), password: password };
    try {
      const { data } = await axios.post(`${baseUrl}/api/users`, obj);
      console.log(data?.payload);
      //
      nvg.navigate("activeEmail", { user: data.payload });
    } catch (error) {
      if (error?.response?.data?.message?.message) {
        setError(error?.response?.data?.message?.message);
      } else if (error?.response?.data?.message) {
        setError(error?.response?.data?.message);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <FromContainer>
      {isError && <IsError isError={isError} />}

      <AppInput
        placeholder="Jon doe"
        handleChange={(text) => handleOnChange(text, "name")}
      />
      <AppInput
        placeholder="example@example.com"
        handleChange={(text) => handleOnChange(text, "email")}
      />
      <AppInput
        placeholder="**********"
        handleChange={(text) => handleOnChange(text, "password")}
      />
      <SubmitButton onPress={handleSubmit} title="Sign Up" />
      <FromNavigator
        leftPress={() => nvg.navigate("login")}
        rightPress={() => nvg.navigate("forgetPassword")}
        leftLink="Login"
        rightLink="Forget Password"
      />
    </FromContainer>
  );
};

export default SignUp;

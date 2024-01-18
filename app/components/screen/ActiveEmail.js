import React, { useState } from "react";
import { StyleSheet } from "react-native";
import FromContainer from "../FromContainer";
import AppInput from "../AppInput";
import SubmitButton from "../SubmitButton";
import axios from "axios";
import { baseUrl } from "../../api/api";
import IsError from "../IsError";
import { useNavigation } from "@react-navigation/native";

const ActiveEmail = ({ route }) => {
  const user = route?.params?.user;
  const [isError, setError] = useState();
  const nvg = useNavigation();

  const [otp, setOtp] = useState();
  const handleOnChange = (text) => {
    setOtp(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("bdbdj", user.newUser._id);
      const { data } = await axios.post(`${baseUrl}/api/users/active`, {
        userId: user.newUser._id,
        otp: otp,
      });
      setError(data.message);
      nvg.navigate("login");
    } catch (error) {
      setError(error?.response?.data?.message?.message);
      console.log(error?.response?.data?.message?.message);
    }
  };

  const handleReSendOtp = async (e) => {
    e.preventDefault();

    try {
      console.log("bdbdj", user.newUser._id);
      const { data } = await axios.post(`${baseUrl}/api/users/resend-otp`, {
        userId: user.newUser._id,
      });
      console.log(data.payload);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <FromContainer>
      {isError && <IsError isError={isError} />}

      <AppInput
        placeholder={"Chek your email fro OTP"}
        handleChange={handleOnChange}
      />
      <SubmitButton onPress={handleSubmit} title={"Verify Email"} />
      <SubmitButton onPress={handleReSendOtp} title={"Resend OTP"} />
    </FromContainer>
  );
};

const styles = StyleSheet.create({});

export default ActiveEmail;

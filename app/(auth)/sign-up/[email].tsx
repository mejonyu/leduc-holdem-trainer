import { TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import SignUpModal from "@/components/AuthModal/SignUpModal";
import { useLocalSearchParams } from "expo-router";

type SearchParam = {
  email: string;
};

const SignUp = () => {
  const { email } = useLocalSearchParams<SearchParam>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SignUpModal email={email || ""} />
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

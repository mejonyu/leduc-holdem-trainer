import { TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import LogInModal from "@/components/AuthModal/LogInModal";
import { useLocalSearchParams } from "expo-router";

type SearchParam = {
  email: string;
};

const LogIn = () => {
  const { email } = useLocalSearchParams<SearchParam>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LogInModal email={email || ""} />
    </TouchableWithoutFeedback>
  );
};

export default LogIn;

import React from "react";
import ContinueWithEmailModal from "@/components/AuthModal/ContinueWithEmailModal";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const continueWithEmail = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ContinueWithEmailModal />
    </TouchableWithoutFeedback>
  );
};

export default continueWithEmail;

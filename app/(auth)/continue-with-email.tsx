import React from "react";
import ContinueWithEmailModal from "@/components/AuthModal/ContinueWithEmailModal";

const continueWithEmail = () => {
  return <ContinueWithEmailModal signUpLink="/sign-up" logInLink="/log-in" />;
};

export default continueWithEmail;

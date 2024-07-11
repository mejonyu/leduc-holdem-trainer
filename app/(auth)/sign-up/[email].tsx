import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useEffect } from "react";
import SignUpModal from "@/components/AuthModal/SignUpModal";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import styles from "@/components/AuthModal/AuthModal.styles";
import { Ionicons } from "@expo/vector-icons";

type SearchParam = {
  email: string;
};

const SignUp = () => {
  const { email } = useLocalSearchParams<SearchParam>();
  const navigation = useNavigation();

  const backToContinueWithEmail = () => {
    router.back();
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Create an account",
      headerBackTitleVisible: "false",
      headerShadowVisible: false,
      headerTintColor: "black",
      headerTitleStyle: styles.modalHeaderText,
      headerStyle: styles.headerStyle,
      headerLeft: () => (
        <Ionicons
          name="return-up-back"
          size={24}
          color="black"
          onPress={backToContinueWithEmail}
        />
      ),
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SignUpModal email={email || ""} />
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

import React from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/components/AuthModal/AuthModal.styles";
import { scaleIconSize } from "@/utils/dimensionScaling";

const AuthLayout = () => {
  const router = useRouter();

  const navBack = () => {
    router.back();
  };

  return (
    <Stack>
      <Stack.Screen
        name="continue-with-email"
        options={{
          headerTitle: "Bluff Buddy",
          headerStyle: styles.headerStyle,
          headerShadowVisible: false,
          headerTitleStyle: styles.modalHeaderText,
          headerLeft: () => (
            <Ionicons
              name="return-up-back"
              size={scaleIconSize(28)}
              color="black"
              onPress={navBack}
            />
          ),
        }}
      />
      <Stack.Screen
        name="sign-up/[email]"
        options={{
          headerTitle: "Create an account",
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTintColor: "black",
          headerTitleStyle: styles.modalHeaderText,
          headerStyle: styles.headerStyle,
          headerLeft: () => (
            <Ionicons
              name="return-up-back"
              size={scaleIconSize(28)}
              color="black"
              onPress={navBack}
            />
          ),
        }}
      />
      <Stack.Screen
        name="log-in/[email]"
        options={{
          headerTitle: "Log In",
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTintColor: "black",
          headerTitleStyle: styles.modalHeaderText,
          headerStyle: styles.headerStyle,
          headerLeft: () => (
            <Ionicons
              name="return-up-back"
              size={scaleIconSize(28)}
              color="black"
              onPress={navBack}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default AuthLayout;

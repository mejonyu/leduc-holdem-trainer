import React from "react";
import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/components/AuthModal/AuthModal.styles";

const AuthLayout = () => {
  const router = useRouter();

  const closeModal = () => {
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
              size={24}
              color="black"
              onPress={closeModal}
            />
          ),
        }}
      />
      <Stack.Screen name="sign-up/[email]" />
      <Stack.Screen name="log-in/[email]" />
    </Stack>
  );
};

export default AuthLayout;

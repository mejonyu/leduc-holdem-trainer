import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
  Keyboard,
  Easing,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import styles from "./AuthModal.styles";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { startShake } from "@/utils/animations";
import CustomButton from "../CustomButton/CustomButton";

interface LogInModalProps {
  email: string;
}

const LogInModal: React.FC<LogInModalProps> = ({ email }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasTriedToLogIn, setHasTriedToLogIn] = useState(false);
  const invalidInputAnimation = useRef(new Animated.Value(0)).current;
  const errorAnimation = useRef(new Animated.Value(0)).current;
  const { logIn } = useAuth();

  useEffect(() => {
    if (hasTriedToLogIn) {
      Animated.timing(errorAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [hasTriedToLogIn]);

  const errorOpacity = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const errorTranslateY = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 0],
  });

  const logInWithPassowrd = async (): Promise<void> => {
    Keyboard.dismiss();
    setLoading(true);
    const session = await logIn(email, password);
    if (session) {
      router.replace("/home");
    } else {
      startShake(invalidInputAnimation);
      setHasTriedToLogIn(true);
    }

    // if (error) Alert.alert(error.message);
    // if (!session)
    //   Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.heading}>Welcome Back!</Text>
        <Text style={styles.subheading}>Sign in to your account.</Text>
        <Text style={styles.inputLabel}>Email Address</Text>
        <TextInput
          style={styles.uneditableInput}
          value={email}
          editable={false}
        />
        <Text style={[styles.inputLabel, { marginTop: 0 }]}>Password</Text>
        <Animated.View
          style={{ transform: [{ translateX: invalidInputAnimation }] }}
        >
          <TextInput
            style={[
              styles.input,
              hasTriedToLogIn
                ? [styles.invalidInput, { marginBottom: 3 }]
                : null,
            ]}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Enter your password"
            placeholderTextColor={hasTriedToLogIn ? "#fcd2cd" : ""}
            secureTextEntry
          />
        </Animated.View>
        {/* <Text style={styles.terms}>
          By creating an account, you agree to the Terms of Sale, Terms of
          Service, and Privacy Policy.
        </Text> */}
        <Animated.View
          style={{
            opacity: errorOpacity,
            transform: [{ translateY: errorTranslateY }],
          }}
        >
          {hasTriedToLogIn && (
            <Text style={styles.errorText}>Incorrect Password</Text>
          )}
        </Animated.View>

        <CustomButton
          text="Log In"
          onPress={logInWithPassowrd}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default LogInModal;

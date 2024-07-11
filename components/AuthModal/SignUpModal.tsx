import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import styles from "./AuthModal.styles";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { startShake } from "@/utils/animations";

interface SignUpModalProps {
  email: string;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ email }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasTriedToSignUp, setHasTriedToSignUp] = useState(false);
  const invalidInputAnimation = useRef(new Animated.Value(0)).current;
  const errorAnimation = useRef(new Animated.Value(0)).current;
  const { signUp } = useAuth();

  useEffect(() => {
    if (hasTriedToSignUp) {
      Animated.timing(errorAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [hasTriedToSignUp]);

  const errorOpacity = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const errorTranslateY = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 0],
  });

  const signUpWithEmail = async (): Promise<void> => {
    Keyboard.dismiss();
    setLoading(true);
    try {
      const session = await signUp(email, password);
      if (session) {
        router.replace("/(tabs)/one");
      }
    } catch (error) {
      startShake(invalidInputAnimation);
      setHasTriedToSignUp(true);
    }

    // if (error) Alert.alert(error.message);
    // if (!session)
    //   Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.heading}>Start Now</Text>
        <Text style={styles.subheading}>
          Train your poker intuition by learning GTO Leduc Hold'em.
        </Text>
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
              hasTriedToSignUp
                ? [styles.invalidInput, { marginBottom: 3 }]
                : null,
            ]}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Must be at least 8 characters"
            placeholderTextColor={hasTriedToSignUp ? "#fcd2cd" : ""}
            secureTextEntry
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: errorOpacity,
            transform: [{ translateY: errorTranslateY }],
          }}
        >
          {hasTriedToSignUp && (
            <Text style={styles.errorText}>8+ characters required</Text>
          )}
        </Animated.View>
        <Text style={styles.terms}>
          By creating an account, you agree to the Terms of Sale, Terms of
          Service, and Privacy Policy.
        </Text>
        <TouchableOpacity
          style={[styles.continueButton, { marginTop: 15 }]}
          disabled={loading}
          onPress={signUpWithEmail}
        >
          <Text style={styles.continueButtonText}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpModal;

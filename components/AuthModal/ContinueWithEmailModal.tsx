import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
} from "react-native";
import { supabase } from "../../lib/supabase";

import styles from "./AuthModal.styles";
import { useRouter } from "expo-router";
import EmailInput from "./EmailInput";
import { startShake } from "@/utils/animations";
import CustomButton from "../CustomButton/CustomButton";

interface ContinueWithEmailModalProps {
  signUpLink: string;
  logInLink: string;
}

const ContinueWithEmailModal: React.FC<ContinueWithEmailModalProps> = ({
  signUpLink,
  logInLink,
}) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasFocusedOnce, setHasFocusedOnce] = useState(false);
  const invalidInputAnimation = useRef(new Animated.Value(0)).current;
  const errorAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isValid && hasFocusedOnce) {
      Animated.timing(errorAnimation, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(errorAnimation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [isValid, hasFocusedOnce]);

  const errorOpacity = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const errorTranslateY = errorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-2, 0],
  });

  const handleContinueWithEmail = async () => {
    Keyboard.dismiss();
    setLoading(true);
    if (isValid) {
      let { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single();
      if (data) {
        router.push(logInLink + `/${email}`);
      } else {
        router.push(signUpLink + `/${email}`);
      }
    } else {
      startShake(invalidInputAnimation);
    }
    setLoading(false);
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.heading}>Log in or create an account</Text>
        <Text style={styles.terms}>
          By continuing, you agree to the Terms of Sale, Terms of Service, and
          Privacy Policy.
        </Text>
        <Text style={styles.inputLabel}>Email Address</Text>
        <Animated.View
          style={{ transform: [{ translateX: invalidInputAnimation }] }}
        >
          <EmailInput
            email={email}
            setEmail={setEmail}
            isValid={isValid}
            setIsValid={setIsValid}
            hasFocusedOnce={hasFocusedOnce}
            setHasFocusedOnce={setHasFocusedOnce}
          />
        </Animated.View>
        <Animated.View
          style={{
            opacity: errorOpacity,
            transform: [{ translateY: errorTranslateY }],
          }}
        >
          {!isValid && hasFocusedOnce && (
            <Text style={styles.errorText}>Must be a valid email</Text>
          )}
        </Animated.View>
        <CustomButton
          text="Continue with email"
          onPress={handleContinueWithEmail}
          loading={loading}
        />
      </View>
    </View>
  );
};

export default ContinueWithEmailModal;

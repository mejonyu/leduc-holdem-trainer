import React, { useRef, useState } from "react";
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
import EmailInput from "../EmailInput";

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
  const invalidInputAnimation = useRef(new Animated.Value(0)).current;

  const handleContinueWithEmail = async () => {
    Keyboard.dismiss();
    setLoading(true);
    if (isValid) {
      let { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single();
      console.log(data);
      if (data) {
        router.push(logInLink + `/${email}`);
      } else {
        router.push(signUpLink + `/${email}`);
      }
    } else {
      startShake();
    }
    setLoading(false);
  };

  const startShake = () => {
    // Reset the animation value
    invalidInputAnimation.setValue(0);

    // Define the animation sequence
    Animated.sequence([
      Animated.timing(invalidInputAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(invalidInputAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(invalidInputAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(invalidInputAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(invalidInputAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            />
          </Animated.View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinueWithEmail}
            disabled={loading}
          >
            <Text style={styles.continueButtonText}>Continue with email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ContinueWithEmailModal;

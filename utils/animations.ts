import { Animated, Easing } from "react-native";
import { triggerErrorHapticFeedback } from "./haptics";

export const startShake = (animation: Animated.Value) => {
  // Reset the animation value
  animation.setValue(0);
  triggerErrorHapticFeedback();

  // Define the animation sequence
  Animated.sequence([
    Animated.timing(animation, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
    Animated.timing(animation, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
    Animated.timing(animation, {
      toValue: 10,
      duration: 50,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
    Animated.timing(animation, {
      toValue: -10,
      duration: 50,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
    Animated.timing(animation, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
  ]).start();
};

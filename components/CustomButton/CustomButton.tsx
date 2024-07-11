import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import styles from "./CustomButton.styles";

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  loading: boolean;
  customStyles?: StyleProp<ViewStyle>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  loading,
  customStyles,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, customStyles]}
      onPress={onPress}
      disabled={loading}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

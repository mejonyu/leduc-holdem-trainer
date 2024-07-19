import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import styles from "./CustomButton.styles";
import { View } from "react-native";

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  loading: boolean;
  customStyles?: StyleProp<ViewStyle>;
  subText?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  loading,
  customStyles,
  subText,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, customStyles]}
      onPress={onPress}
      disabled={loading}
    >
      <View style={styles.flexRow}>
        <Text style={styles.buttonText}>{text}</Text>
        {subText ? <Text style={styles.buttonSubText}>{subText}</Text> : null}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

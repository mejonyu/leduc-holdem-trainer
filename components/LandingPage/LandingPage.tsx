import { View, Text, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import styles from "./LandingPage.styles";

const LandingPage: React.FC = () => {
  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../../assets/images/bluff-buddy-logo-black.png")}
        resizeMode="contain"
      />
      <Link href="(auth)/continue-with-email">Log In</Link>
    </View>
  );
};

export default LandingPage;

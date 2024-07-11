import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import styles from "./LandingPage.styles";
import CustomButton from "../CustomButton/CustomButton";

const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
    router.push("/continue-with-email");
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/images/bluff-buddy-logo-black.png")}
        resizeMode="contain"
      />
      <Text style={styles.subheading}>
        Train your poker intuition by learning GTO Leduc Hold'em.
      </Text>
      <CustomButton
        text="Start Now"
        onPress={handleStart}
        loading={loading}
        customStyles={{ marginTop: 0, alignSelf: "stretch" }}
      />
    </View>
  );
};

export default LandingPage;

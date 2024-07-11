import React from "react";
import { View } from "react-native";
import LandingPage from "@/components/LandingPage/LandingPage";
import FallingChips from "@/components/LandingPage/FallingChips";
import styles from "@/components/LandingPage/LandingPage.styles";

const App: React.FC = () => {
  return (
    <>
      <FallingChips />
      <View style={styles.container}>
        <LandingPage />
      </View>
    </>
  );
};

export default App;

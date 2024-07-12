import React from "react";
import { View } from "react-native";
import LandingPage from "@/components/LandingPage/LandingPage";
import FallingChips from "@/components/LandingPage/FallingChips";
import styles from "@/components/LandingPage/LandingPage.styles";
import { useAuth } from "@/hooks/useAuth";

const App: React.FC = () => {
  return (
    <View style={styles.appContainer}>
      {/* <FallingChips /> */}
      <View style={styles.container}>
        <LandingPage />
      </View>
    </View>
  );
};

export default App;

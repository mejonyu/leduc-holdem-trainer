import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import styles from "./PlayGameButton.styles";
import { triggerButtonHapticFeedback } from "@/utils/haptics";

const PlayGameButton = () => {
  const routeToGame = () => {
    triggerButtonHapticFeedback();
    router.push("/app/game");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={routeToGame}>
      {/* <Link href="/app/game" style={styles.buttonText}>
        Go to game
      </Link> */}
      <Text style={styles.buttonText}>Train</Text>
    </TouchableOpacity>
  );
};

export default PlayGameButton;

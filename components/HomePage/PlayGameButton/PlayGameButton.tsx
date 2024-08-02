import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import styles from "./PlayGameButton.styles";

const PlayGameButton = () => {
  const routeToGame = () => {
    router.push("/app/game");
  };

  return (
    <TouchableOpacity style={styles.container} onPress={routeToGame}>
      {/* <Link href="/app/game" style={styles.buttonText}>
        Go to game
      </Link> */}
      <Text style={styles.buttonText}>Play</Text>
    </TouchableOpacity>
  );
};

export default PlayGameButton;

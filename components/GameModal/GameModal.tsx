import React, { useEffect, useState, useRef } from "react";
import { View, Animated, Easing } from "react-native";
import styles from "./GameModal.styles";
import Card from "./Card";
import { useLeducMCCFRGame } from "@/hooks/useLeducMCCFRGame";
import LeducMCCFRGame from "@/lib/game/LeducMCCFRGame";
import CustomButton from "../CustomButton/CustomButton";
import { Ionicons } from "@expo/vector-icons";

const GameModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isPlayer1, setIsPlayer1] = useState(true);
  const { game, setGame } = useLeducMCCFRGame();

  //   console.log(game?.getState().getP1Card().getRank());

  // Animated values
  const playerCardPosition = useRef(new Animated.Value(0)).current;
  const opponentCardPosition = useRef(new Animated.Value(0)).current;
  const playerCardFlip = useRef(new Animated.Value(0)).current;
  const opponentCardFlip = useRef(new Animated.Value(0)).current;

  const dealCards = () => {
    setLoading(true);
    setGame(new LeducMCCFRGame());

    // Reset positions and rotations
    playerCardPosition.setValue(0);
    opponentCardPosition.setValue(0);
    playerCardFlip.setValue(0);
    opponentCardFlip.setValue(0);

    // Animate player card
    Animated.sequence([
      Animated.timing(playerCardPosition, {
        toValue: 265,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opponentCardPosition, {
        toValue: -265,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(playerCardFlip, {
        toValue: 180,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animation complete
      setLoading(false);
    });
  };

  const flipFrontInterpolate = (flipAnimation: Animated.Value) => {
    return flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"],
    });
  };

  const flipBackInterpolate = (flipAnimation: Animated.Value) => {
    return flipAnimation.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"],
    });
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.pokerTable}>
        <View style={styles.opponentLabel}>
          {isPlayer1 ? (
            <Ionicons name="people" size={24} color="black" />
          ) : (
            <Ionicons name="person" size={24} color="black" />
          )}
        </View>
        <View style={styles.playerLabel}>
          {isPlayer1 ? (
            <Ionicons name="person" size={24} color="black" />
          ) : (
            <Ionicons name="people" size={24} color="black" />
          )}
        </View>
        <Card type="back" />
        {game ? (
          <>
            {/* Player card. */}
            <Animated.View
              style={[
                styles.playerCard,
                isPlayer1 ? { zIndex: 2 } : { zIndex: 1 },
                {
                  transform: [{ translateY: playerCardPosition }],
                },
              ]}
            >
              {/* Back of player card. */}
              <Animated.View
                style={[
                  {
                    transform: [
                      { rotateY: flipBackInterpolate(playerCardFlip) },
                    ],
                  },
                  { backfaceVisibility: "hidden" },
                ]}
              >
                <View style={{ position: "absolute" }}>
                  <Card type="back" />
                </View>
              </Animated.View>
              {/* Front of player card. */}
              <Animated.View
                style={[
                  {
                    transform: [
                      { rotateY: flipFrontInterpolate(playerCardFlip) },
                    ],
                  },
                  { backfaceVisibility: "hidden" },
                ]}
              >
                <Card
                  type={
                    isPlayer1
                      ? game.getState().getP1Card().getRank()
                      : game.getState().getP2Card().getRank()
                  }
                />
              </Animated.View>
            </Animated.View>

            {/* Opponent card. */}
            <Animated.View
              style={[
                styles.opponentCard,
                isPlayer1 ? { zIndex: 1 } : { zIndex: 2 },
                { transform: [{ translateY: opponentCardPosition }] },
              ]}
            >
              {/* Back of opponent card. */}
              <Animated.View
                style={[
                  {
                    transform: [
                      { rotateY: flipBackInterpolate(opponentCardFlip) },
                    ],
                  },
                  { backfaceVisibility: "hidden" },
                ]}
              >
                <View style={{ position: "absolute" }}>
                  <Card type="back" />
                </View>
              </Animated.View>
              {/* Front of opponent card. */}
              <Animated.View
                style={[
                  {
                    transform: [
                      { rotateY: flipFrontInterpolate(opponentCardFlip) },
                    ],
                  },
                  {
                    backfaceVisibility: "hidden",
                  },
                ]}
              >
                <Card
                  type={
                    isPlayer1
                      ? game.getState().getP2Card().getRank()
                      : game.getState().getP1Card().getRank()
                  }
                />
              </Animated.View>
            </Animated.View>
          </>
        ) : null}
      </View>
      <CustomButton
        text="Deal Cards"
        onPress={dealCards}
        loading={loading}
        customStyles={{ marginTop: 50 }}
      />
    </View>
  );
};

export default GameModal;

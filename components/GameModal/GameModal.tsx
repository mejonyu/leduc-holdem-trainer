import React, { useEffect, useState, useRef } from "react";
import { View, Animated, Easing, Alert, Pressable, Text } from "react-native";
import styles from "./GameModal.styles";
import Card from "./Card";
import LeducMCCFRGame from "@/lib/game/LeducMCCFRGame";
import CustomButton from "../CustomButton/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import {
  player1Strategy,
  player2Strategy,
} from "@/lib/game/LeducMCCFRStrategy";
import MoveRanking from "./MoveRanking";
import ChipStack from "./ChipStack";

const GameModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [game, setGame] = useState<LeducMCCFRGame | null>(null);
  const [actions, setActions] = useState(["Deal Cards"]);
  const [communityCard, setCommunityCard] = useState<string | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [displayMoveRanking, setDisplayMoveRanking] = useState(false);

  // Animated values
  const playerCardPosition = useRef(new Animated.Value(0)).current;
  const opponentCardPosition = useRef(new Animated.Value(0)).current;
  const playerCardOpacity = useRef(new Animated.Value(1)).current;
  const opponentCardOpacity = useRef(new Animated.Value(1)).current;
  const playerCardFlip = useRef(new Animated.Value(0)).current;
  const opponentCardFlip = useRef(new Animated.Value(0)).current;
  const moveRankingAnimation = useRef(new Animated.Value(0)).current;
  const deckPosition = useRef(new Animated.Value(0)).current;
  const communityCardPosition = useRef(new Animated.Value(0)).current;
  const communityCardFlip = useRef(new Animated.Value(0)).current;
  const communitycardOpacity = useRef(new Animated.Value(1)).current;

  const dealCards = () => {
    setLoading(true);
    const oldGame = game;
    const newGame = new LeducMCCFRGame();
    // Check if we need to animate deck back to center
    if (oldGame?.getState().isPostFlop()) {
      Animated.parallel([
        Animated.timing(deckPosition, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(playerCardOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opponentCardOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(communitycardOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setGame(newGame);
        doDealCardsAnimation(newGame);
      });
    } else {
      setGame(newGame);
      doDealCardsAnimation(newGame);
    }
  };

  const doDealCardsAnimation = (newGame: LeducMCCFRGame) => {
    // Reset positions, opacities, and rotations
    playerCardPosition.setValue(0);
    opponentCardPosition.setValue(0);
    playerCardOpacity.setValue(1);
    opponentCardOpacity.setValue(1);
    playerCardFlip.setValue(0);
    opponentCardFlip.setValue(0);

    Animated.sequence([
      Animated.timing(playerCardPosition, {
        toValue: 265,
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(opponentCardPosition, {
        toValue: -265,
        duration: 450,
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
      setActions(newGame.getState().getActions() || ["Something went wrong."]);
      setIsPlayerTurn(true);
    });
  };

  const revealOpponentCard = () => {
    setLoading(true);
    Animated.timing(opponentCardFlip, {
      toValue: 180,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setLoading(false);
    });
  };

  // Display move ranking animation
  const doDisplayMoveRankingAnimation = () => {
    moveRankingAnimation.setValue(0);
    Animated.timing(moveRankingAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const doRemoveMoveRankingAnimation = () => {
    Animated.timing(moveRankingAnimation, {
      toValue: 2,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setDisplayMoveRanking(false);
      setLoading(false);
      // Check if game is finished.
      if (game?.getState().isTerminal()) {
        Alert.alert(`Player 1 makes ${game.getState().payoff()}`);
        revealOpponentCard();
        setActions(["Deal Cards"]);
      } else if (game?.getState().isEndOfFirstRound()) {
        const commCard = game.getState().getDeck().getCards()[
          Math.floor(
            Math.random() * game.getState().getDeck().getCards().length
          )
        ];
        game.getState().move(commCard);

        doDealCommunityCardAnimation();

        setActions(game.getState().getActions());
      } else {
        // Otherwise, move CPU.
        handleCPUMove();
      }
    });
  };

  const doDealCommunityCardAnimation = () => {
    setLoading(true);
    Animated.timing(deckPosition, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCommunityCard(game?.getState().getCommCard()?.getRank() || null);
      communitycardOpacity.setValue(1);
      Animated.sequence([
        Animated.timing(communityCardPosition, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(communityCardFlip, {
          toValue: 180,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
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

  const handleCPUMove = () => {
    let CPUStrategy;
    let CPUHand;
    let currentHistory;
    if (isPlayer1) {
      CPUHand = game?.getState().getP2Card().getRank() || "";
      if (game?.getState().getCommCard()) {
        const commCard = game?.getState().getCommCard();
        CPUHand += `,${commCard}`;
        // Sort them so that lookup keys are uniform.
        const [a, b] = CPUHand.split(",");
        CPUHand = a.localeCompare(b) <= 0 ? `${a},${b}` : `${b},${a}`;
      }
      currentHistory = game?.getState().getHistory() || "";
      CPUStrategy = player2Strategy[CPUHand][currentHistory];
    } else {
      CPUHand = game?.getState().getP1Card().getRank() || "";
      if (game?.getState().getCommCard()) {
        const commCard = game?.getState().getCommCard();
        CPUHand += `,${commCard}`;
        // Sort them so that lookup keys are uniform.
        const [a, b] = CPUHand.split(",");
        CPUHand = a.localeCompare(b) <= 0 ? `${a},${b}` : `${b},${a}`;
      }
      currentHistory = game?.getState().getHistory() || "";
      CPUStrategy = player1Strategy[CPUHand][currentHistory];
    }

    let randomValue = Math.random();
    const action =
      Object.entries(CPUStrategy).find(([action, probability]) => {
        randomValue -= probability;
        return randomValue < 0;
      })?.[0] || Object.keys(CPUStrategy)[0];
    game?.getState().move(action);
    Alert.alert("CPU made the move " + action);

    // Deal community card if needed.
    if (game?.getState().isTerminal()) {
      Alert.alert(`Player 1 makes ${game.getState().payoff()}`);
      revealOpponentCard();
      setActions(["Deal Cards"]);
    } else if (game?.getState().isEndOfFirstRound()) {
      const commCard = game.getState().getDeck().getCards()[
        Math.floor(Math.random() * game.getState().getDeck().getCards().length)
      ];
      game.getState().move(commCard);

      doDealCommunityCardAnimation();

      //   Alert.alert("Community card is", commCard.getRank());
      setActions(game.getState().getActions());
      // Update player turn.
      setIsPlayerTurn(true);
    } else {
      setActions(game?.getState().getActions() || ["Something went wrong."]);
      setIsPlayerTurn(true);
    }
  };

  const handleCheck = () => {
    setLoading(true);
    game?.getState().move("x");
    setIsPlayerTurn(false);
    setDisplayMoveRanking(true);
    doDisplayMoveRankingAnimation();
  };

  const handleCall = () => {
    setLoading(true);
    game?.getState().move("c");
    setIsPlayerTurn(false);
    setDisplayMoveRanking(true);
    doDisplayMoveRankingAnimation();
  };

  const handleRaise = () => {
    setLoading(true);
    game?.getState().move("r");
    setIsPlayerTurn(false);
    setDisplayMoveRanking(true);
    doDisplayMoveRankingAnimation();
  };

  const handleFold = () => {
    setLoading(true);
    game?.getState().move("f");
    setIsPlayerTurn(false);
    setDisplayMoveRanking(true);
    doDisplayMoveRankingAnimation();
  };

  const getActionButton = (action: string) => {
    let onButtonPress: () => void;
    let buttonText: string = "";

    switch (action) {
      case "Deal Cards":
        buttonText = action;
        onButtonPress = dealCards;
        break;
      case "x":
        buttonText = "Check";
        onButtonPress = handleCheck;
        break;
      case "c":
        buttonText = "Call";
        onButtonPress = handleCall;
        break;
      case "r":
        buttonText = "Raise";
        onButtonPress = handleRaise;
        break;
      case "f":
        buttonText = "Fold";
        onButtonPress = handleFold;
        break;
      default:
        onButtonPress = () => {};
    }

    return (
      <CustomButton
        text={buttonText}
        onPress={onButtonPress}
        loading={loading}
        customStyles={{ flex: 1, marginHorizontal: 3 }}
      />
    );
  };

  const handleContinue = () => {
    doRemoveMoveRankingAnimation();
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.pokerTable}>
        <ChipStack count={5} />
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
        {/* Deck */}
        <Animated.View
          style={{
            transform: [
              {
                translateX: deckPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 40],
                }),
              },
            ],
          }}
        >
          <Card type="deck" />
        </Animated.View>
        {/* Community Card */}
        {communityCard ? (
          <Animated.View
            style={{
              position: "absolute",
              opacity: communitycardOpacity,
              transform: [
                {
                  translateX: communityCardPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -40],
                  }),
                },
              ],
            }}
          >
            {/* Back of community card. */}
            <Animated.View
              style={[
                {
                  transform: [
                    { rotateY: flipBackInterpolate(communityCardFlip) },
                  ],
                },
                { backfaceVisibility: "hidden" },
              ]}
            >
              <View style={{ position: "absolute" }}>
                <Card type="back" />
              </View>
            </Animated.View>
            {/* Front of community card. */}
            <Animated.View
              style={[
                {
                  transform: [
                    { rotateY: flipFrontInterpolate(communityCardFlip) },
                  ],
                },
                { backfaceVisibility: "hidden" },
              ]}
            >
              <Card type={communityCard} />
            </Animated.View>
          </Animated.View>
        ) : null}

        {/* Move Ranking */}
        {displayMoveRanking ? (
          <Animated.View
            style={[
              {
                opacity: moveRankingAnimation.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [0, 1, 0],
                }),
                transform: [
                  {
                    translateX: moveRankingAnimation.interpolate({
                      inputRange: [0, 1, 2],
                      outputRange: [-90, -50, -10],
                    }),
                  },
                ],
              },
            ]}
          >
            <MoveRanking game={game} isPlayer1={isPlayer1} />
          </Animated.View>
        ) : null}

        {game ? (
          <>
            {/* Player card. */}
            <Animated.View
              style={[
                styles.playerCard,
                isPlayer1 ? { zIndex: 2 } : { zIndex: 1 },
                {
                  opacity: playerCardOpacity,
                  transform: [{ translateY: playerCardPosition }],
                },
                isPlayerTurn ? styles.cardGlow : null,
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
                {
                  opacity: opponentCardOpacity,
                  transform: [{ translateY: opponentCardPosition }],
                },
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
      <View style={styles.flexRow}>
        {actions.map((action) => getActionButton(action))}
      </View>
      {displayMoveRanking ? (
        <View style={styles.continueContainer}>
          <Pressable onPress={handleContinue} style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default GameModal;

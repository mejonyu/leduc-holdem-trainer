import React, { useEffect, useState, useRef } from "react";
import { View, Animated, Easing, Alert, Pressable, Text } from "react-native";
import styles, {
  scaleHeight,
  scaleIconSize,
  scaleWidth,
} from "./GameModal.styles";
import Card from "./Card";
import LeducMCCFRGame from "@/lib/game/LeducMCCFRGame";
import CustomButton from "../CustomButton/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import {
  player1Strategy,
  player2Strategy,
} from "@/lib/game/LeducMCCFRStrategy";
import MoveRanking from "./MoveRanking";
import ChipStack from "../GameModal/ChipStack";

const GameModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [continueButtonIsLoading, setContinueButtonIsLoading] = useState(false);
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [game, setGame] = useState<LeducMCCFRGame | null>(null);
  const [actions, setActions] = useState(["Deal Cards"]);
  const [communityCard, setCommunityCard] = useState<string | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [displayMoveRanking, setDisplayMoveRanking] = useState(false);
  const [playerBetChips, setPlayerBetChips] = useState(0);
  const [opponentBetChips, setOpponentBetChips] = useState(0);
  const [chipsToDisplayInMiddle, setChipsToDisplayInMiddle] = useState(0);

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
  const playerBetChipsPosition = useRef(new Animated.Value(0)).current;
  const playerBetChipsZIndex = useRef(new Animated.Value(0)).current;
  const playerBetChipsOpacity = useRef(new Animated.Value(1)).current;
  const opponentBetChipsPosition = useRef(new Animated.Value(0)).current;
  const opponentBetChipsZIndex = useRef(new Animated.Value(0)).current;
  const opponentBetChipsOpacity = useRef(new Animated.Value(1)).current;
  const middleChipsOpacity = useRef(new Animated.Value(1)).current;

  const dealCards = () => {
    setLoading(true);
    const oldGame = game;
    const newGame = new LeducMCCFRGame();
    // Check if we need to animate deck back to center
    if (oldGame?.getState().isPostFlop()) {
      Animated.parallel([
        Animated.timing(middleChipsOpacity, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
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
        toValue: scaleHeight(265),
        duration: 450,
        useNativeDriver: true,
      }),
      Animated.timing(opponentCardPosition, {
        toValue: scaleHeight(-265),
        duration: 450,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Push out antes and flip player card
      setPlayerBetChips(1);
      setOpponentBetChips(1);
      Animated.sequence([
        Animated.parallel([
          Animated.parallel([
            Animated.timing(playerBetChipsPosition, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(playerBetChipsZIndex, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(opponentBetChipsPosition, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(opponentBetChipsZIndex, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.timing(playerCardFlip, {
          toValue: 180,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Animation complete
        setActions(
          newGame.getState().getActions() || ["Something went wrong."]
        );
        setLoading(false);
        setIsPlayerTurn(true);
      });
    });
  };

  const revealOpponentCard = () => {
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
      // Check if game is finished.
      if (game?.getState().isTerminal()) {
        // Alert.alert(`Player 1 makes ${game.getState().payoff()}`);
        doMoveBetsToMiddleAnimation(true);
      } else if (game?.getState().isEndOfFirstRound()) {
        const commCard = game.getState().getDeck().getCards()[
          Math.floor(
            Math.random() * game.getState().getDeck().getCards().length
          )
        ];
        game.getState().move(commCard);
        doMoveBetsToMiddleAnimation();
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

  const doPutInPot = (isPlayer: boolean) => {
    // todo: generalize to opponent chips too
    if (isPlayer) {
      if (!playerBetChips) {
        setPlayerBetChips(
          (isPlayer1
            ? game?.getState().getP1PipOnCurrentStreet()
            : game?.getState().getP2PipOnCurrentStreet()) || 0
        );
        Animated.parallel([
          Animated.timing(playerBetChipsPosition, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(playerBetChipsZIndex, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        console.log(
          isPlayer1
            ? game?.getState().getP1PipOnCurrentStreet()
            : game?.getState().getP2PipOnCurrentStreet()
        );
        setPlayerBetChips(
          (isPlayer1
            ? game?.getState().getP1PipOnCurrentStreet()
            : game?.getState().getP2PipOnCurrentStreet()) || 0
        );
      }
    } else {
      if (!opponentBetChips) {
        setOpponentBetChips(
          (isPlayer1
            ? game?.getState().getP2PipOnCurrentStreet()
            : game?.getState().getP1PipOnCurrentStreet()) || 0
        );
        Animated.parallel([
          Animated.timing(opponentBetChipsPosition, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opponentBetChipsZIndex, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        setOpponentBetChips(
          (isPlayer1
            ? game?.getState().getP2Pip()
            : game?.getState().getP1PipOnCurrentStreet()) || 0
        );
      }
    }
  };

  const doMoveBetsToMiddleAnimation = (gameOver?: boolean) => {
    Animated.parallel([
      Animated.parallel([
        Animated.timing(playerBetChipsPosition, {
          toValue: 2,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(playerBetChipsOpacity, {
          toValue: 2,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(opponentBetChipsPosition, {
          toValue: 2,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opponentBetChipsOpacity, {
          toValue: 2,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setChipsToDisplayInMiddle(game?.getState().getMoneyInPot() || 0);
      if (!gameOver) {
        doRevealMiddleChipsAnimation();
        doDealCommunityCardAnimation();
        setActions(game?.getState().getActions() || ["Something went wrong."]);
      } else {
        doRevealMiddleChipsAnimation();
        revealOpponentCard();
        setActions(["Deal Cards"]);
      }
      // Reset bet stacks to 0
      setPlayerBetChips(0);
      setOpponentBetChips(0);
      // Reset animation values
      playerBetChipsOpacity.setValue(0);
      playerBetChipsPosition.setValue(0);
      playerBetChipsZIndex.setValue(0);
      opponentBetChipsOpacity.setValue(0);
      opponentBetChipsPosition.setValue(0);
      opponentBetChipsZIndex.setValue(0);
    });
  };

  const doRevealMiddleChipsAnimation = () => {
    Animated.timing(middleChipsOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
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

    // Handle raise/call animation
    if (action === "r" || action === "c") {
      doPutInPot(false);
    }

    // Alert.alert("CPU made the move " + action);
    console.log("CPU made the move " + action);

    // Deal community card if needed.
    if (game?.getState().isTerminal()) {
      //   Alert.alert(`Player 1 makes ${game.getState().payoff()}`);
      doMoveBetsToMiddleAnimation(true);
    } else if (game?.getState().isEndOfFirstRound()) {
      const commCard = game.getState().getDeck().getCards()[
        Math.floor(Math.random() * game.getState().getDeck().getCards().length)
      ];
      game.getState().move(commCard);
      doMoveBetsToMiddleAnimation();
      // Update player turn.
      setIsPlayerTurn(true);
    } else {
      setActions(game?.getState().getActions() || ["Something went wrong."]);
      setLoading(false);
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

    doPutInPot(true);

    setIsPlayerTurn(false);
    setDisplayMoveRanking(true);
    doDisplayMoveRankingAnimation();
  };

  const handleRaise = () => {
    setLoading(true);
    game?.getState().move("r");

    doPutInPot(true);

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
        customStyles={{ flex: 1, marginHorizontal: scaleWidth(2) }}
      />
    );
  };

  const handleContinue = () => {
    console.log("Pressed");
    setLoading(true);
    setContinueButtonIsLoading(true);
    doRemoveMoveRankingAnimation();
    setTimeout(() => {
      setContinueButtonIsLoading(false);
    }, 1000);
  };

  const renderPlayerBetChips = () => {
    if (playerBetChips) {
      return (
        <Animated.View
          style={[
            styles.playerBetChips,
            {
              zIndex: playerBetChipsZIndex.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 3],
              }),
              opacity: playerBetChipsOpacity.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [1, 1, 0],
              }),
              transform: [
                {
                  translateY: playerBetChipsPosition.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [scaleHeight(50), 0, scaleHeight(-70)],
                  }),
                },
              ],
            },
          ]}
        >
          <ChipStack count={playerBetChips} />
        </Animated.View>
      );
    }
  };

  const renderOpponentBetChips = () => {
    if (opponentBetChips) {
      return (
        <Animated.View
          style={[
            styles.opponentBetChips,
            {
              zIndex: opponentBetChipsZIndex.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 3],
              }),
              opacity: opponentBetChipsOpacity.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [1, 1, 0],
              }),
              transform: [
                {
                  translateY: opponentBetChipsPosition.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [scaleHeight(-50), 0, scaleHeight(70)],
                  }),
                },
              ],
            },
          ]}
        >
          <ChipStack count={opponentBetChips} />
        </Animated.View>
      );
    }
  };

  const renderMiddleChips = () => {
    if (chipsToDisplayInMiddle) {
      return (
        <Animated.View
          style={[styles.middleChipStack, { opacity: middleChipsOpacity }]}
        >
          <ChipStack count={chipsToDisplayInMiddle} />
        </Animated.View>
      );
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.pokerTable}>
        <View style={styles.opponentLabel}>
          {isPlayer1 ? (
            <Ionicons name="people" size={scaleIconSize(24)} color="black" />
          ) : (
            <Ionicons name="person" size={scaleIconSize(24)} color="black" />
          )}
        </View>
        <View style={styles.playerLabel}>
          {isPlayer1 ? (
            <Ionicons name="person" size={scaleIconSize(24)} color="black" />
          ) : (
            <Ionicons name="people" size={scaleIconSize(24)} color="black" />
          )}
        </View>
        {/* Deck */}
        <Animated.View
          style={{
            transform: [
              {
                translateX: deckPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, scaleWidth(40)],
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
                    outputRange: [0, scaleWidth(-40)],
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
                      outputRange: [
                        scaleWidth(-90),
                        scaleWidth(-50),
                        scaleWidth(-10),
                      ],
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
            {/* Player bet chips */}
            {renderPlayerBetChips()}
            {/* Opponent bet chips */}
            {renderOpponentBetChips()}
            {/* Chips put in pot on previous streets */}
            {renderMiddleChips()}
          </>
        ) : null}
      </View>
      <View style={styles.flexRow}>
        {actions.map((action) => getActionButton(action))}
      </View>
      {displayMoveRanking ? (
        <View style={styles.continueContainer}>
          <Pressable
            onPress={handleContinue}
            style={styles.continueButton}
            disabled={continueButtonIsLoading}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <Ionicons
              name="chevron-forward"
              size={scaleIconSize(20)}
              color="white"
            />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};

export default GameModal;

import React, { useEffect, useState, useRef, useCallback } from "react";
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
  Strategy,
  player1Strategy,
  player2Strategy,
} from "@/lib/game/LeducMCCFRStrategy";
import MoveRanking from "./MoveRanking";
import ChipStack from "../GameModal/ChipStack";
import OpponentMove from "./OpponentMove";
import PotTotal from "./PotTotal";

const GameModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [game, setGame] = useState<LeducMCCFRGame | null>(null);
  const [actions, setActions] = useState(["Deal Cards"]);
  const [communityCard, setCommunityCard] = useState<string | null>(null);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [displayMoveRanking, setDisplayMoveRanking] = useState(false);
  const [playerBetChips, setPlayerBetChips] = useState(0);
  const [opponentBetChips, setOpponentBetChips] = useState(0);
  const [chipsToDisplayInMiddle, setChipsToDisplayInMiddle] = useState(0);
  const [checkSubText, setCheckSubText] = useState("");
  const [raiseSubText, setRaiseSubText] = useState("");
  const [callSubText, setCallSubText] = useState("");
  const [foldSubText, setFoldSubText] = useState("");
  const [glowCheck, setGlowCheck] = useState(false);
  const [glowRaise, setGlowRaise] = useState(false);
  const [glowCall, setGlowCall] = useState(false);
  const [glowFold, setGlowFold] = useState(false);
  const [computedStrategy, setComputedStrategy] = useState<Strategy>({});
  const [rankingColor, setRankingColor] = useState("");
  const [opponentMove, setOpponentMove] = useState("");
  const [showOpponentMove, setShowOpponentMove] = useState(false);
  const [displayContinueButton, setDisplayContinueButton] = useState(false);
  const [potSize, setPotSize] = useState(0);

  // Callback functions for setting state in child components
  const handleComputedStrategyChange = useCallback((newStrategy: Strategy) => {
    setComputedStrategy(newStrategy);
  }, []);
  const handleRankingColorChange = useCallback((newColor: string) => {
    setRankingColor(newColor);
  }, []);

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
  const middleChipsPosition = useRef(new Animated.Value(0)).current;
  const opponentMoveSize = useRef(new Animated.Value(1)).current;
  const opponentMoveOpacity = useRef(new Animated.Value(1)).current;
  const actionButtonsOpacity = useRef(new Animated.Value(1)).current;
  const continueButtonOpacity = useRef(new Animated.Value(1)).current;
  const potTotalOpacity = useRef(new Animated.Value(0)).current;

  const dealCards = () => {
    doPotTotalFadeOut();
    doOpponentMoveTransitionOut();
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
    middleChipsPosition.setValue(0);
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
        // Initalize pot size
        setPotSize(2);
        doPotTotalFadeIn();
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
      // Case 1: P1 wins
      if (game && game?.getState().payoff() > 0) {
        if (isPlayer1) {
          Animated.timing(middleChipsPosition, {
            toValue: scaleHeight(115),
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(middleChipsPosition, {
            toValue: scaleHeight(-255),
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
        // Case 2: P2 wins
      } else if (game && game?.getState().payoff() < 0) {
        if (!isPlayer1) {
          Animated.timing(middleChipsPosition, {
            toValue: scaleHeight(115),
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(middleChipsPosition, {
            toValue: scaleHeight(-270),
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
        // Case 3: Chop
      } else {
      }

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
            ? game?.getState().getP2PipOnCurrentStreet()
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
        doActionButtonsFadeIn();
      } else {
        doRevealMiddleChipsAnimation();
        revealOpponentCard();
        setActions(["Deal Cards"]);
        doActionButtonsFadeIn();
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

  const doOpponentMoveTransitionOut = () => {
    Animated.timing(opponentMoveOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setShowOpponentMove(false);
    });
  };

  const doActionButtonsFadeOut = () => {
    Animated.timing(actionButtonsOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setCheckSubText("");
      setRaiseSubText("");
      setCallSubText("");
      setFoldSubText("");
    });
  };

  const doActionButtonsFadeIn = () => {
    Animated.timing(actionButtonsOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const doContinueButtonFadeOut = () => {
    Animated.timing(continueButtonOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setDisplayContinueButton(false);
    });
  };

  const doContinueButtonFadeIn = () => {
    Animated.timing(continueButtonOpacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const doPotTotalFadeOut = () => {
    Animated.timing(potTotalOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setDisplayContinueButton(false);
    });
  };

  const doPotTotalFadeIn = () => {
    Animated.timing(potTotalOpacity, {
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
    setPotSize(game?.getState().getMoneyInPot() || 0);

    displayCPUMove(action);
  };

  const displayCPUMove = (action: string) => {
    setOpponentMove(action);
    setShowOpponentMove(true);
    Animated.sequence([
      Animated.timing(opponentMoveOpacity, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(opponentMoveSize, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opponentMoveSize, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opponentMoveSize, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Handle raise/call animation
      if (action === "r" || action === "c") {
        doPutInPot(false);
      }

      // Deal community card if needed.
      if (game?.getState().isTerminal()) {
        doOpponentMoveTransitionOut();
        doMoveBetsToMiddleAnimation(true);
      } else if (game?.getState().isEndOfFirstRound()) {
        doOpponentMoveTransitionOut();
        const commCard = game.getState().getDeck().getCards()[
          Math.floor(
            Math.random() * game.getState().getDeck().getCards().length
          )
        ];
        game.getState().move(commCard);
        doMoveBetsToMiddleAnimation();
        // Update player turn.
        setIsPlayerTurn(true);
      } else {
        doActionButtonsFadeIn();
        setActions(game?.getState().getActions() || ["Something went wrong."]);
        setLoading(false);
        setIsPlayerTurn(true);
      }
    });
  };

  const handleCheck = () => {
    doOpponentMoveTransitionOut();
    setLoading(true);
    setGlowCheck(true);
    game?.getState().move("x");
    setIsPlayerTurn(false);
    setDisplayMoveRanking(true);
    setDisplayContinueButton(true);
    doContinueButtonFadeIn();
    doDisplayMoveRankingAnimation();
  };

  const handleCall = () => {
    doOpponentMoveTransitionOut();
    setLoading(true);
    setGlowCall(true);
    game?.getState().move("c");
    setPotSize(game?.getState().getMoneyInPot() || 0);

    doPutInPot(true);

    setIsPlayerTurn(false);
    setDisplayMoveRanking(true);
    setDisplayContinueButton(true);
    doContinueButtonFadeIn();
    doDisplayMoveRankingAnimation();
  };

  const handleRaise = () => {
    doOpponentMoveTransitionOut();
    setLoading(true);
    setGlowRaise(true);
    game?.getState().move("r");
    setPotSize(game?.getState().getMoneyInPot() || 0);

    doPutInPot(true);

    setIsPlayerTurn(false);
    setDisplayMoveRanking(true);
    setDisplayContinueButton(true);
    doContinueButtonFadeIn();
    doDisplayMoveRankingAnimation();
  };

  const handleFold = () => {
    doOpponentMoveTransitionOut();
    setLoading(true);
    setGlowFold(true);
    game?.getState().move("f");
    setIsPlayerTurn(false);
    setDisplayMoveRanking(true);
    setDisplayContinueButton(true);
    doContinueButtonFadeIn();
    doDisplayMoveRankingAnimation();
  };

  const getActionButton = (action: string) => {
    let onButtonPress: () => void;
    let buttonText: string = "";
    let buttonSubText: string = "";
    let customGlowState;

    switch (action) {
      case "Deal Cards":
        buttonText = action;
        onButtonPress = dealCards;
        break;
      case "x":
        buttonText = "Check";
        buttonSubText = checkSubText;
        onButtonPress = handleCheck;
        customGlowState = glowCheck;
        break;
      case "c":
        buttonText = "Call";
        buttonSubText = callSubText;
        onButtonPress = handleCall;
        customGlowState = glowCall;
        break;
      case "r":
        buttonText = "Raise";
        buttonSubText = raiseSubText;
        onButtonPress = handleRaise;
        customGlowState = glowRaise;
        break;
      case "f":
        buttonText = "Fold";
        buttonSubText = foldSubText;
        onButtonPress = handleFold;
        customGlowState = glowFold;
        break;
      default:
        onButtonPress = () => {};
    }

    return (
      <CustomButton
        key={buttonText}
        text={buttonText}
        onPress={onButtonPress}
        loading={loading}
        customStyles={[
          { flex: 1, marginHorizontal: scaleWidth(2) },
          customGlowState
            ? {
                borderWidth: scaleWidth(3),
                borderRadius: scaleWidth(3),
                margin: scaleWidth(-3),
                borderColor: rankingColor,
              }
            : null,
        ]}
        subText={buttonSubText}
      />
    );
  };

  useEffect(() => {
    for (const action of actions) {
      const strategyWeightText = Math.floor(
        computedStrategy[action] * 100
      ).toString();
      switch (action) {
        case "x":
          setCheckSubText(strategyWeightText + "%");
          break;
        case "r":
          setRaiseSubText(strategyWeightText + "%");
          break;
        case "c":
          setCallSubText(strategyWeightText + "%");
          break;
        case "f":
          setFoldSubText(strategyWeightText + "%");
          break;
      }
    }
  }, [computedStrategy]);

  const handleContinue = () => {
    doContinueButtonFadeOut();
    setLoading(true);
    setGlowCheck(false);
    setGlowRaise(false);
    setGlowCall(false);
    setGlowFold(false);
    doRemoveMoveRankingAnimation();
    doActionButtonsFadeOut();
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
          style={[
            styles.middleChipStack,
            {
              opacity: middleChipsOpacity,
              transform: [{ translateY: middleChipsPosition }],
            },
          ]}
        >
          <ChipStack count={chipsToDisplayInMiddle} />
        </Animated.View>
      );
    }
  };

  const renderOpponentMove = () => {
    return <OpponentMove move={opponentMove} />;
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
        {/* Opponent Move */}
        {showOpponentMove ? (
          <Animated.View
            style={[
              styles.opponentMoveContainer,
              {
                opacity: opponentMoveOpacity,
                transform: [{ scale: opponentMoveSize }],
              },
            ]}
          >
            {renderOpponentMove()}
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
            <MoveRanking
              game={game}
              isPlayer1={isPlayer1}
              setComputedStrategy={handleComputedStrategyChange}
              setRankingColor={handleRankingColorChange}
            />
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
            {/* Pot Total */}
            {potSize ? (
              <Animated.View
                style={[styles.potTotalContainer, { opacity: potTotalOpacity }]}
              >
                <PotTotal total={potSize} />
              </Animated.View>
            ) : null}
          </>
        ) : null}
      </View>
      <Animated.View style={{ opacity: actionButtonsOpacity }}>
        <View style={styles.flexRow}>
          {actions.map((action) => getActionButton(action))}
        </View>
      </Animated.View>
      {displayContinueButton ? (
        <Animated.View
          style={[styles.continueContainer, { opacity: continueButtonOpacity }]}
        >
          <Pressable
            onPress={handleContinue}
            style={[styles.continueButton, { backgroundColor: rankingColor }]}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
            <View style={styles.continueButtonIcon}>
              <Ionicons
                name="chevron-forward"
                size={scaleIconSize(20)}
                color="white"
              />
            </View>
          </Pressable>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default GameModal;

import React, { useEffect, useRef } from "react";
import { View, Animated, Dimensions, StyleSheet, Easing } from "react-native";
import styles from "./LandingPage.styles";

const { width, height } = Dimensions.get("window");

interface Chip {
  x: number;
  y: number;
  rotateValue: Animated.Value;
  translateY: Animated.Value;
  scale: Animated.Value;
}

const createChip = (): Chip => ({
  x: 20 + Math.random() * (width - 40),
  y: -80,
  rotateValue: new Animated.Value(0),
  translateY: new Animated.Value(0),
  scale: new Animated.Value(0.5),
});

const FallingChips: React.FC = () => {
  const chips = useRef<Chip[]>([...Array(18)].map(createChip)).current;

  useEffect(() => {
    const animate = (chip: Chip) => {
      const duration = 5000;

      Animated.loop(
        Animated.parallel([
          Animated.timing(chip.rotateValue, {
            toValue: 360,
            duration,
            useNativeDriver: true,
            easing: Easing.linear,
          }),
          Animated.timing(chip.translateY, {
            toValue: height + 80,
            duration,
            useNativeDriver: true,
            easing: Easing.quad,
          }),
        ])
      ).start();
    };

    // Start initial animations with a stagger
    const startAnimation = () => {
      chips.forEach((chip, index) => {
        setTimeout(() => animate(chip), index * 250);
      });
    };

    // Wait for 2 seconds before starting animations on mount
    setTimeout(startAnimation, 1000);
  }, []);

  return (
    <View>
      {chips.map((chip, index) => (
        <Animated.Image
          key={index}
          source={require("../../assets/images/chip-black.png")}
          style={[
            styles.chip,
            {
              left: chip.x - 40,
              top: chip.y - 40,
              transform: [
                { translateY: chip.translateY },
                {
                  rotate: chip.rotateValue.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "720deg"],
                  }),
                },
                { scale: chip.scale },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

export default FallingChips;

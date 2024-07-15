import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/app/game">Go to game</Link>
    </View>
  );
};

export default Home;

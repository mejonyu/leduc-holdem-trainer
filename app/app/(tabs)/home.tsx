import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomePageHeader from "@/components/HomePage/HomePageHeader";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomePageHeader />
      <Text>Home</Text>
      <Link href="/app/game">Go to game</Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Home;

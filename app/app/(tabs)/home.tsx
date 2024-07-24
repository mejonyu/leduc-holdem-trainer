import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Link, useFocusEffect } from "expo-router";
import { Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import HomePageHeader from "@/components/HomePage/HomePageHeader/HomePageHeader";
import { useAuth } from "@/hooks/useAuth";
import WeekDisplay from "@/components/HomePage/WeekDisplay/WeekDisplay";

const Home = () => {
  const [moveCount, setMoveCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const { fetchAllMovesCount } = useAuth();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const updateAllMovesCount = async () => {
        try {
          const count = await fetchAllMovesCount();
          if (count) {
            setMoveCount(count);
          }
        } catch (error) {
          console.error(error);
        }
      };

      updateAllMovesCount();

      return () => {
        isActive = false;
      };
    }, [fetchAllMovesCount])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const count = await fetchAllMovesCount();
      if (count) {
        setMoveCount(count);
      }
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  }, [fetchAllMovesCount]);

  return (
    <SafeAreaView style={styles.homePage}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
      >
        <HomePageHeader />
        <WeekDisplay />
        <Text>Number of moves played: {moveCount}</Text>
        <Link href="/app/game">Go to game</Link>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    paddingHorizontal: 20,
  },
});

export default Home;

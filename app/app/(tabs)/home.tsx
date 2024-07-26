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
import HomePageHeader from "@/components/HomePage/HomePageHeader/HomePageHeader";
import { useAuth } from "@/hooks/useAuth";
import WeekDisplay from "@/components/HomePage/WeekDisplay/WeekDisplay";
import MoveSummaryCard from "@/components/HomePage/MoveSummaryCard/MoveSummaryCard";

const Home = () => {
  const [totalMoveCount, setTotalMoveCount] = useState(0);
  const [todayMoveCount, setTodayMoveCount] = useState(0);
  const [thisWeekMoveCount, setThisWeekMoveCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [userEntries, setUserEntries] = useState<Record<string, boolean>>({});
  const [userMovesWithOnlyRankings, setUserMovesWithOnlyRankings] = useState<
    string[] | null
  >([]);

  const {
    fetchAllMoveCount,
    fetchTodayMoveCount,
    fetchThisWeekMoveCount,
    fetchUserEntries,
    fetchUserMovesWithOnlyRankings,
  } = useAuth();

  // Automatically refetch all data when home page is refocused.
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const updateAllMoveCount = async () => {
        try {
          const totalCount = await fetchAllMoveCount();
          if (totalCount) {
            setTotalMoveCount(totalCount);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const updateTodayMoveCount = async () => {
        try {
          const todayCount = await fetchTodayMoveCount();
          if (todayCount) {
            setTodayMoveCount(todayCount);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const updateUserEntries = async () => {
        try {
          const newUserEntries = await fetchUserEntries();
          if (newUserEntries) {
            setUserEntries(newUserEntries);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const updateUserMovesWithOnlyRankings = async () => {
        try {
          const moves = await fetchUserMovesWithOnlyRankings();
          setUserMovesWithOnlyRankings(moves);
        } catch (error) {
          console.error(error);
        }
      };

      const updateThisWeekMoveCount = async () => {
        try {
          const newThisWeekMoveCount = await fetchThisWeekMoveCount();
          if (newThisWeekMoveCount) {
            setThisWeekMoveCount(newThisWeekMoveCount);
          }
        } catch (error) {
          console.error(error);
        }
      };

      updateAllMoveCount();
      updateTodayMoveCount();
      updateUserEntries();
      updateUserMovesWithOnlyRankings();
      updateThisWeekMoveCount();

      return () => {
        isActive = false;
      };
    }, [
      fetchAllMoveCount,
      fetchTodayMoveCount,
      fetchUserEntries,
      fetchUserMovesWithOnlyRankings,
      fetchThisWeekMoveCount,
    ])
  );

  // Refresh all user data on pulldown.
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const totalCount = await fetchAllMoveCount();
      const todayCount = await fetchTodayMoveCount();
      const newUserEntries = await fetchUserEntries();
      const newUserMovesWithOnlyRankings =
        await fetchUserMovesWithOnlyRankings();
      const newThisWeekMoveCount = await fetchThisWeekMoveCount();

      if (totalCount) {
        setTotalMoveCount(totalCount);
      }

      if (todayCount) {
        setTodayMoveCount(todayCount);
      }

      if (newUserEntries) {
        setUserEntries(newUserEntries);
      }

      if (newUserMovesWithOnlyRankings) {
        setUserMovesWithOnlyRankings(newUserMovesWithOnlyRankings);
      }

      if (newThisWeekMoveCount) {
        setThisWeekMoveCount(newThisWeekMoveCount);
      }
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  }, [
    fetchAllMoveCount,
    fetchTodayMoveCount,
    fetchUserEntries,
    fetchUserMovesWithOnlyRankings,
    fetchThisWeekMoveCount,
  ]);

  return (
    <SafeAreaView style={styles.homePage}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
      >
        <HomePageHeader
          todayMoveCount={todayMoveCount}
          userEntries={userEntries}
        />
        <WeekDisplay userEntries={userEntries} />
        <MoveSummaryCard
          userMovesWithOnlyRankings={userMovesWithOnlyRankings}
          thisWeekMoveCount={thisWeekMoveCount}
        />
        <Text>Number of moves played: {totalMoveCount}</Text>
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

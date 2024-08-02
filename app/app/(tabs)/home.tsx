import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Animated,
  Image,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { Link, useFocusEffect } from "expo-router";
import HomePageHeader from "@/components/HomePage/HomePageHeader/HomePageHeader";
import { useAuth } from "@/hooks/useAuth";
import WeekDisplay from "@/components/HomePage/WeekDisplay/WeekDisplay";
import {
  scaleHeight,
  scaleWidth,
  SCREEN_WIDTH,
} from "@/utils/dimensionScaling";
import {
  CARD_SPACING,
  CARD_WIDTH,
} from "@/components/HomePage/SummaryCards/MoveSummaryCard/MoveSummaryCard.styles";
import MoveSummaryCard from "@/components/HomePage/SummaryCards/MoveSummaryCard/MoveSummaryCard";
import PlayGameButton from "@/components/HomePage/PlayGameButton/PlayGameButton";

const Home = () => {
  const [totalMoveCount, setTotalMoveCount] = useState(0);
  const [todayMoveCount, setTodayMoveCount] = useState(0);
  const [thisWeekMoveCount, setThisWeekMoveCount] = useState(0);
  const [player1ThisWeekMoveCount, setPlayer1ThisWeekMoveCount] = useState(0);
  const [player2ThisWeekMoveCount, setPlayer2ThisWeekMoveCount] = useState(0);
  const [preflopThisWeekMoveCount, setPreflopThisWeekMoveCount] = useState(0);
  const [postflopThisWeekMoveCount, setPostflopThisWeekMoveCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [userEntries, setUserEntries] = useState<Record<string, boolean>>({});
  const [userMovesWithOnlyRankings, setUserMovesWithOnlyRankings] = useState<
    string[] | null
  >([]);
  const [player1MovesWithOnlyRankings, setPlayer1MovesWithOnlyRankings] =
    useState<string[] | null>([]);
  const [player2MovesWithOnlyRankings, setPlayer2MovesWithOnlyRankings] =
    useState<string[] | null>([]);
  const [preflopMovesWithOnlyRankings, setPreflopMovesWithOnlyRankings] =
    useState<string[] | null>([]);
  const [postflopMovesWithOnlyRankings, setPostflopMovesWithOnlyRankings] =
    useState<string[] | null>([]);
  const [avatarPath, setAvatarPath] = useState("");

  const scrollX = useRef(new Animated.Value(0)).current;

  const {
    fetchAllMoveCount,
    fetchTodayMoveCount,
    fetchThisWeekMoveCount,
    fetchPlayer1ThisWeekMoveCount,
    fetchPlayer2ThisWeekMoveCount,
    fetchPreflopThisWeekMoveCount,
    fetchPostflopThisWeekMoveCount,
    fetchUserEntries,
    fetchUserMovesWithOnlyRankings,
    fetchPlayer1MovesWithOnlyRankings,
    fetchPlayer2MovesWithOnlyRankings,
    fetchPreflopMovesWithOnlyRankings,
    fetchPostflopMovesWithOnlyRankings,
    fetchAvatarPath,
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

      const updatePlayer1MovesWithOnlyRankings = async () => {
        try {
          const moves = await fetchPlayer1MovesWithOnlyRankings();
          setPlayer1MovesWithOnlyRankings(moves);
        } catch (error) {
          console.error(error);
        }
      };

      const updatePlayer2MovesWithOnlyRankings = async () => {
        try {
          const moves = await fetchPlayer2MovesWithOnlyRankings();
          setPlayer2MovesWithOnlyRankings(moves);
        } catch (error) {
          console.error(error);
        }
      };

      const updatePreflopMovesWithOnlyRankings = async () => {
        try {
          const moves = await fetchPreflopMovesWithOnlyRankings();
          setPreflopMovesWithOnlyRankings(moves);
        } catch (error) {
          console.error(error);
        }
      };

      const updatePostflopMovesWithOnlyRankings = async () => {
        try {
          const moves = await fetchPostflopMovesWithOnlyRankings();
          setPostflopMovesWithOnlyRankings(moves);
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

      const updatePlayer1ThisWeekMoveCount = async () => {
        try {
          const newPlayer1ThisWeekMoveCount =
            await fetchPlayer1ThisWeekMoveCount();
          if (newPlayer1ThisWeekMoveCount) {
            setPlayer1ThisWeekMoveCount(newPlayer1ThisWeekMoveCount);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const updatePlayer2ThisWeekMoveCount = async () => {
        try {
          const newPlayer2ThisWeekMoveCount =
            await fetchPlayer2ThisWeekMoveCount();
          if (newPlayer2ThisWeekMoveCount) {
            setPlayer2ThisWeekMoveCount(newPlayer2ThisWeekMoveCount);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const updatePreflopThisWeekMoveCount = async () => {
        try {
          const newPreflopThisWeekMoveCount =
            await fetchPreflopThisWeekMoveCount();
          if (newPreflopThisWeekMoveCount) {
            setPreflopThisWeekMoveCount(newPreflopThisWeekMoveCount);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const updatePostflopThisWeekMoveCount = async () => {
        try {
          const newPostflopThisWeekMoveCount =
            await fetchPostflopThisWeekMoveCount();
          if (newPostflopThisWeekMoveCount) {
            setPostflopThisWeekMoveCount(newPostflopThisWeekMoveCount);
          }
        } catch (error) {
          console.error(error);
        }
      };

      const updateAvatarPath = async () => {
        try {
          const newAvatarPath = await fetchAvatarPath();
          if (newAvatarPath) {
            setAvatarPath(newAvatarPath);
          }
        } catch (error) {
          console.error(error);
        }
      };

      updateAllMoveCount();
      updateTodayMoveCount();
      updateUserEntries();
      updateUserMovesWithOnlyRankings();
      updatePlayer1MovesWithOnlyRankings();
      updatePlayer2MovesWithOnlyRankings();
      updatePreflopMovesWithOnlyRankings();
      updatePostflopMovesWithOnlyRankings();
      updateThisWeekMoveCount();
      updatePlayer1ThisWeekMoveCount();
      updatePlayer2ThisWeekMoveCount();
      updatePreflopThisWeekMoveCount();
      updatePostflopThisWeekMoveCount();
      updateAvatarPath();

      return () => {
        isActive = false;
      };
    }, [
      fetchAllMoveCount,
      fetchTodayMoveCount,
      fetchUserEntries,
      fetchUserMovesWithOnlyRankings,
      fetchPlayer1MovesWithOnlyRankings,
      fetchPlayer2MovesWithOnlyRankings,
      fetchPreflopMovesWithOnlyRankings,
      fetchPostflopMovesWithOnlyRankings,
      fetchThisWeekMoveCount,
      fetchPlayer1ThisWeekMoveCount,
      fetchPlayer2ThisWeekMoveCount,
      fetchPreflopThisWeekMoveCount,
      fetchPostflopThisWeekMoveCount,
      fetchAvatarPath,
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
      const newPlayer1MovesWithOnlyRankings =
        await fetchPlayer1MovesWithOnlyRankings();
      const newPlayer2MovesWithOnlyRankings =
        await fetchPlayer2MovesWithOnlyRankings();
      const newPreflopMovesWithOnlyRankings =
        await fetchPreflopMovesWithOnlyRankings();
      const newPostflopMovesWithOnlyRankings =
        await fetchPostflopMovesWithOnlyRankings();
      const newThisWeekMoveCount = await fetchThisWeekMoveCount();
      const newPlayer1ThisWeekMoveCount = await fetchPlayer1ThisWeekMoveCount();
      const newPlayer2ThisWeekMoveCount = await fetchPlayer2ThisWeekMoveCount();
      const newAvatarPath = await fetchAvatarPath();

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

      if (newPlayer1MovesWithOnlyRankings) {
        setPlayer1MovesWithOnlyRankings(newPlayer1MovesWithOnlyRankings);
      }

      if (newPlayer2MovesWithOnlyRankings) {
        setPlayer2MovesWithOnlyRankings(newPlayer2MovesWithOnlyRankings);
      }

      if (newPreflopMovesWithOnlyRankings) {
        setPreflopMovesWithOnlyRankings(newPreflopMovesWithOnlyRankings);
      }

      if (newPostflopMovesWithOnlyRankings) {
        setPostflopMovesWithOnlyRankings(newPostflopMovesWithOnlyRankings);
      }

      if (newThisWeekMoveCount) {
        setThisWeekMoveCount(newThisWeekMoveCount);
      }

      if (newPlayer1ThisWeekMoveCount) {
        setPlayer1ThisWeekMoveCount(newPlayer1ThisWeekMoveCount);
      }

      if (newPlayer2ThisWeekMoveCount) {
        setPlayer2ThisWeekMoveCount(newPlayer2ThisWeekMoveCount);
      }

      if (newAvatarPath) {
        setAvatarPath(newAvatarPath);
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
    fetchPlayer1MovesWithOnlyRankings,
    fetchPlayer2MovesWithOnlyRankings,
    fetchPreflopMovesWithOnlyRankings,
    fetchPostflopMovesWithOnlyRankings,
    fetchThisWeekMoveCount,
    fetchPlayer1ThisWeekMoveCount,
    fetchPlayer2ThisWeekMoveCount,
    fetchPreflopThisWeekMoveCount,
    fetchPostflopThisWeekMoveCount,
    fetchAvatarPath,
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
          avatarPath={avatarPath}
        />
        <WeekDisplay userEntries={userEntries} />
        <Animated.ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            marginHorizontal: scaleWidth(-20),
            paddingVertical: scaleHeight(30),
          }}
          pagingEnabled
          snapToInterval={CARD_WIDTH + CARD_SPACING * 2}
          decelerationRate="fast"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={styles.scrollViewContent}
        >
          <MoveSummaryCard
            title="Overall Stats"
            userMovesWithOnlyRankings={userMovesWithOnlyRankings}
            thisWeekMoveCount={thisWeekMoveCount}
            index={0}
            scrollX={scrollX}
          />
          <MoveSummaryCard
            title="Player 1 Stats"
            userMovesWithOnlyRankings={player1MovesWithOnlyRankings}
            thisWeekMoveCount={player1ThisWeekMoveCount}
            index={1}
            scrollX={scrollX}
          />
          <MoveSummaryCard
            title="Player 2 Stats"
            userMovesWithOnlyRankings={player2MovesWithOnlyRankings}
            thisWeekMoveCount={player2ThisWeekMoveCount}
            index={2}
            scrollX={scrollX}
          />
          <MoveSummaryCard
            title="Pre-Flop Stats"
            userMovesWithOnlyRankings={preflopMovesWithOnlyRankings}
            thisWeekMoveCount={preflopThisWeekMoveCount}
            index={3}
            scrollX={scrollX}
          />
          <MoveSummaryCard
            title="Post-Flop Stats"
            userMovesWithOnlyRankings={postflopMovesWithOnlyRankings}
            thisWeekMoveCount={postflopThisWeekMoveCount}
            index={4}
            scrollX={scrollX}
          />
        </Animated.ScrollView>
        <View style={{ alignItems: "center" }}>
          <PlayGameButton />
        </View>
        <View style={styles.pointingPersonContainer}>
          <Image
            source={require("@/assets/images/pointing-person.png")}
            resizeMode="contain"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
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
    paddingHorizontal: scaleWidth(20),
  },
  scrollViewContent: {
    paddingHorizontal: (SCREEN_WIDTH - CARD_WIDTH) / 2 - CARD_SPACING,
  },
  pointingPersonContainer: {
    position: "absolute",
    width: scaleWidth(180),
    height: scaleHeight(180),
    bottom: scaleHeight(-148),
    right: 0,
  },
});

export default Home;

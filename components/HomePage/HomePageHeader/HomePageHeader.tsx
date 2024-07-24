import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./HomePageHeader.styles";
import { scaleHeight } from "@/utils/dimensionScaling";
import { useAuth } from "@/hooks/useAuth";

interface HomePageHeaderProps {
  todayMoveCount: number;
}

const HomePageHeader: React.FC<HomePageHeaderProps> = ({ todayMoveCount }) => {
  const { fetchEmail, fetchTodayMoveCount } = useAuth();

  const renderEmail = () => {
    const email = fetchEmail();
    // Return everything before the "@" symbol.
    return email?.substring(0, email.indexOf("@"));
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <MaterialCommunityIcons
          name="cards-playing-spade-multiple"
          size={scaleHeight(26)}
          color="black"
        />
        <View style={styles.userInfoText}>
          <Text style={styles.username}>{renderEmail()}</Text>
          <Text style={styles.readCount}>{todayMoveCount} solved today</Text>
        </View>
      </View>
      <View style={styles.headerIcons}>
        <Ionicons name="flame" size={scaleHeight(24)} color="orange" />
        <Text style={styles.flameCount}>3</Text>
        <Ionicons name="notifications" size={scaleHeight(24)} color="black" />
      </View>
    </View>
  );
};

export default HomePageHeader;

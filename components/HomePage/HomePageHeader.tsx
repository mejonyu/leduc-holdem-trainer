import { View, Text } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./HomePageHeader.styles";

const HomePageHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <MaterialCommunityIcons
          name="cards-playing-spade-multiple"
          size={24}
          color="black"
        />
        <View style={styles.userInfoText}>
          <Text style={styles.username}>jonyu02</Text>
          <Text style={styles.readCount}>2 solved today</Text>
        </View>
      </View>
      <View style={styles.headerIcons}>
        <Ionicons name="flame" size={24} color="orange" />
        <Text style={styles.flameCount}>3</Text>
        <Ionicons name="notifications" size={24} color="black" />
      </View>
    </View>
  );
};

export default HomePageHeader;

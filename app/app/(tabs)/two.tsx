import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Two = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            {/* <Image
              source={require("../path/to/user-avatar.png")}
              style={styles.avatar}
            /> */}
            <View>
              <Text style={styles.username}>jonyu02</Text>
              <Text style={styles.readCount}>2 read today</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <Ionicons name="flame" size={24} color="orange" />
            <Text style={styles.flameCount}>3</Text>
            <Ionicons name="notifications" size={24} color="black" />
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.calendar}>
          {/* Implement calendar component */}
        </View>

        {/* Quote Card */}
        <View style={styles.quoteCard}>
          {/* <Image
            source={require("../path/to/jim-collins.png")}
            style={styles.quoteImage}
          /> */}
          <Text style={styles.quote}>
            "If you have more than three priorities, you don't have any."
          </Text>
          <Text style={styles.author}>JIM COLLINS</Text>
        </View>

        {/* Collection Info */}
        <View style={styles.collectionInfo}>
          <Text style={styles.collectionTitle}>
            Quotes for Making Great Things Happen | Decisive Leadership
          </Text>
          <Text style={styles.collectionSubtitle}>
            34 ideas by Harsh Deshmukh
          </Text>
        </View>
      </ScrollView>

      {/* Promotion Banner */}
      <View style={styles.promotionBanner}>
        <View>
          <Text style={styles.promotionText}>60% OFF Limited Reward</Text>
          <Text style={styles.promotionTimer}>23 : 57 : 10</Text>
        </View>
        <TouchableOpacity style={styles.claimButton}>
          <Text style={styles.claimButtonText}>Claim Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  readCount: {
    fontSize: 12,
    color: "gray",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  flameCount: {
    marginRight: 10,
  },
  calendar: {
    // Style your calendar
  },
  quoteCard: {
    alignItems: "center",
    padding: 20,
    margin: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  quoteImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  quote: {
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 5,
  },
  author: {
    fontWeight: "bold",
  },
  collectionInfo: {
    padding: 15,
  },
  collectionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  collectionSubtitle: {
    color: "gray",
  },
  promotionBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#e0e0e0",
  },
  promotionText: {
    fontWeight: "bold",
  },
  promotionTimer: {
    color: "gray",
  },
  claimButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  claimButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Two;

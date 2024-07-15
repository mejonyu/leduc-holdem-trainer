import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import styles from "./GameModal.styles";
import Card from "./Card";
import { Image } from "react-native";
import Test from "./test";

const GameModal: React.FC = () => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.pokerTable}>
        <Card type="jack" />
        <Card type="queen" />
        <Card type="king" />
        <Card type="opponent" />
      </View>
    </View>
  );
};

export default GameModal;

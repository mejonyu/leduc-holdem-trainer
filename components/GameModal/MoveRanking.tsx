import { View, Text } from "react-native";
import React from "react";
import LeducMCCFRGame from "@/lib/game/LeducMCCFRGame";

interface MoveRankingProps {
  game: LeducMCCFRGame | null;
}

const MoveRanking: React.FC<MoveRankingProps> = ({ game }) => {
  return (
    <View>
      <Text>MoveRanking</Text>
    </View>
  );
};

export default MoveRanking;

import { View, Text } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./HomePageHeader.styles";
import { scaleHeight } from "@/utils/dimensionScaling";
import { useAuth } from "@/hooks/useAuth";
import { countConsecutiveDays } from "@/utils/dateFunctions";
import { imageOptions } from "@/components/ProfilePage/ProfilePhoto/ProfilePhoto";
import { Image } from "react-native";

interface HomePageHeaderProps {
  todayMoveCount: number;
  userEntries: Record<string, boolean>;
  avatarPath: string;
  name: string | null;
}

const HomePageHeader: React.FC<HomePageHeaderProps> = ({
  todayMoveCount,
  userEntries,
  avatarPath,
  name,
}) => {
  const { fetchEmail } = useAuth();

  const truncateEmail = () => {
    const email = fetchEmail();
    // Return everything before the "@" symbol.
    return email?.substring(0, email.indexOf("@"));
  };

  const renderName = () => {
    if (name) {
      return name;
    }
    return truncateEmail();
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        {avatarPath ? (
          <View style={styles.avatar}>
            <Image
              source={imageOptions[avatarPath].image}
              style={[
                { height: "100%", width: "100%" },
                imageOptions[avatarPath].imageStyles,
              ]}
            />
          </View>
        ) : (
          <View style={styles.avatar} />
        )}

        <View style={styles.userInfoText}>
          <Text style={styles.username}>{renderName()}</Text>
          <Text style={styles.readCount}>{todayMoveCount} solved today</Text>
        </View>
      </View>
      <View style={styles.headerIcons}>
        <Ionicons name="flame" size={scaleHeight(24)} color="orange" />
        <Text style={styles.flameCount}>
          {countConsecutiveDays(userEntries)}
        </Text>
      </View>
    </View>
  );
};

export default HomePageHeader;

import React from "react";
import { View, Text } from "react-native";
import styles from "./WeekDisplay.styles";
import { Entypo, Feather, FontAwesome5, Octicons } from "@expo/vector-icons";
import { scaleHeight } from "@/utils/dimensionScaling";
import { weekDates } from "@/utils/dateFunctions";
import { getLocalTodayDate } from "@/utils/dateFunctions";
import { useAuth } from "@/hooks/useAuth";

interface WeekDisplayProps {
  userEntries: Record<string, boolean>;
}

interface DayItemProps {
  date: Date;
  hasEntry: boolean;
  previousDayHasEntry: boolean;
  userCreatedAt: string | undefined;
}

const WeekDisplay: React.FC<WeekDisplayProps> = ({ userEntries }) => {
  const { session } = useAuth();
  return (
    <View style={styles.container}>
      {weekDates.map((date, index) => {
        const dateKey = date.toISOString().split("T")[0];
        const hasEntry = userEntries[dateKey] || false;
        const previousDate = new Date(date);
        previousDate.setDate(date.getDate() - 1);
        const previousDateKey = previousDate.toISOString().split("T")[0];
        const previousDayHasEntry = userEntries[previousDateKey] || false;

        return (
          <DayItem
            key={dateKey}
            date={date}
            hasEntry={hasEntry}
            previousDayHasEntry={previousDayHasEntry}
            userCreatedAt={session?.user.created_at}
          />
        );
      })}
    </View>
  );
};

const DayItem: React.FC<DayItemProps> = ({
  date,
  hasEntry,
  previousDayHasEntry,
  userCreatedAt,
}) => {
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const dayNumber = date.getDate();
  const today = getLocalTodayDate();
  today.setHours(0, 0, 0, 0);
  const isPast = date < today;
  const isToday = date.toDateString() === today.toDateString();
  const userCreatedAtDate = new Date();
  if (userCreatedAt) {
    userCreatedAtDate.setDate(new Date(userCreatedAt).getDate());
    userCreatedAtDate.setHours(0, 0, 0, 0);
  }
  const isBeforeUserCreation = userCreatedAt ? date < userCreatedAtDate : false;

  let icon = (
    <Entypo name="dot-single" size={scaleHeight(20)} color="#cbcbcb" />
  ); // Default dot
  if (!isBeforeUserCreation || !today) {
    if (isPast) {
      icon = hasEntry ? (
        <Feather name="check" size={scaleHeight(20)} color="#fba01c" />
      ) : (
        <Feather name="x" size={scaleHeight(20)} color="#6495ED" />
      );
    } else if (isToday) {
      icon = hasEntry ? (
        <Feather name="check" size={scaleHeight(20)} color="#fba01c" />
      ) : (
        <Text style={{ padding: 1 }}>
          <FontAwesome5 name="circle" size={scaleHeight(18)} color="#979da5" />
        </Text>
      );
    }
  }

  return (
    <View style={styles.dayContainer}>
      {icon}
      <Text
        style={
          hasEntry
            ? styles.hasEntryDayName
            : isPast
            ? isBeforeUserCreation
              ? styles.emptyDayName
              : styles.missingEntryDayName
            : isToday
            ? styles.emptyTodayDayName
            : styles.emptyDayName
        }
      >
        {dayName}
      </Text>
      <Text
        style={
          hasEntry
            ? styles.hasEntryDayNumber
            : isPast
            ? isBeforeUserCreation
              ? styles.emptyDayNumber
              : styles.missingEntryDayNumber
            : isToday
            ? styles.emptyTodayDayNumber
            : styles.emptyDayNumber
        }
      >
        {dayNumber}
      </Text>
      {!(dayName === "Sun") &&
        ((isPast && !isBeforeUserCreation) ||
          (isToday && today.getDate() != userCreatedAtDate.getDate())) && (
          <Octicons
            name="dash"
            size={scaleHeight(24)}
            color="black"
            style={[
              styles.connectingLine,
              previousDayHasEntry
                ? hasEntry
                  ? { color: "#faa11c" }
                  : { color: "#cacaca" }
                : { color: "#6495ED" },
            ]}
          />
        )}
    </View>
  );
};

export default WeekDisplay;

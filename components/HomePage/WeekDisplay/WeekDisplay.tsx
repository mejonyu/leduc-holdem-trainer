import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { supabase } from "@/lib/supabase"; // Adjust import path as needed
import { PostgrestResponse } from "@supabase/supabase-js";
import styles from "./WeekDisplay.styles";
import { Entypo, Feather, FontAwesome5, Octicons } from "@expo/vector-icons";
import { scaleHeight } from "@/utils/dimensionScaling";
import weekDates from "@/utils/calculateWeekDates";

interface WeekDisplayProps {
  userEntries: Record<string, boolean>;
}

interface DayItemProps {
  date: Date;
  hasEntry: boolean;
  previousDayHasEntry: boolean;
}

const WeekDisplay: React.FC<WeekDisplayProps> = ({ userEntries }) => {
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
}) => {
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const dayNumber = date.getDate();
  const todayUTC = new Date();
  const today = new Date(
    todayUTC.getTime() - todayUTC.getTimezoneOffset() * 60000
  );
  today.setHours(0, 0, 0, 0);
  const isPast = date < today;
  const isToday = date.toDateString() === today.toDateString();

  let icon = (
    <Entypo name="dot-single" size={scaleHeight(20)} color="#cbcbcb" />
  ); // Default dot
  if (isPast) {
    icon = hasEntry ? (
      <Feather name="check" size={scaleHeight(20)} color="#fba01c" />
    ) : (
      <Feather name="x" size={scaleHeight(20)} color="#45a4b9" />
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

  return (
    <View style={styles.dayContainer}>
      {icon}
      <Text
        style={
          hasEntry
            ? styles.hasEntryDayName
            : isPast
            ? styles.missingEntryDayName
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
            ? styles.missingEntryDayNumber
            : isToday
            ? styles.emptyTodayDayNumber
            : styles.emptyDayNumber
        }
      >
        {dayNumber}
      </Text>
      {!(dayName === "Sun") && (isPast || isToday) && (
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
              : { color: "#45a4b9" },
          ]}
        />
      )}
    </View>
  );
};

export default WeekDisplay;

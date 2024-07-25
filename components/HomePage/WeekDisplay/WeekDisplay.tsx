import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { supabase } from "@/lib/supabase"; // Adjust import path as needed
import { PostgrestResponse } from "@supabase/supabase-js";
import styles from "./WeekDisplay.styles";
import { Entypo, Feather, FontAwesome5, Octicons } from "@expo/vector-icons";
import { scaleHeight } from "@/utils/dimensionScaling";

interface UserEntry {
  created_at: string; // PostgreSQL timestamptz is represented as a string in JSON
}

interface DayItemProps {
  date: Date;
  hasEntry: boolean;
  previousDayHasEntry: boolean;
}

const WeekDisplay: React.FC = () => {
  const [userEntries, setUserEntries] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchUserEntries();
  }, []);

  const calculateWeekDates = (): Date[] => {
    const todayUTC = new Date();
    const today = new Date(
      todayUTC.getTime() - todayUTC.getTimezoneOffset() * 60000
    );

    const currentDay = today.getDay();
    const diff = currentDay; // No adjustment needed as Sunday is 0
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - diff);

    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      return date;
    });

    return dates;
  };

  const fetchUserEntries = async (): Promise<void> => {
    const weekDates = calculateWeekDates();
    if (weekDates.length < 2) return;

    const startOfWeek = weekDates[0].toISOString();
    const endOfWeek = new Date(weekDates[6].getTime() + 86399999).toISOString(); // End of Saturday

    const { data, error }: PostgrestResponse<UserEntry> = await supabase
      .from("leduc_moves")
      .select("created_at")
      .gte("created_at", startOfWeek)
      .lte("created_at", endOfWeek);

    if (error) {
      console.error("Error fetching user entries:", error);
      return;
    }

    const entriesMap: Record<string, boolean> = {};
    data?.forEach((entry) => {
      const dateUTC = new Date(entry.created_at);
      const date = new Date(
        dateUTC.getTime() - dateUTC.getTimezoneOffset() * 60000
      );
      const dateKey = new Date(date).toISOString().split("T")[0];
      entriesMap[dateKey] = true;
    });

    setUserEntries(entriesMap);
  };

  return (
    <View style={styles.container}>
      {calculateWeekDates().map((date, index) => {
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

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native";
import { supabase } from "@/lib/supabase"; // Adjust import path as needed
import { PostgrestResponse } from "@supabase/supabase-js";
import styles from "./WeekDisplay.styles";

interface UserEntry {
  created_at: string; // PostgreSQL timestamptz is represented as a string in JSON
}

interface DayItemProps {
  date: Date;
  hasEntry: boolean;
  isLast: boolean;
}

const WeekDisplay: React.FC = () => {
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [userEntries, setUserEntries] = useState<Record<string, boolean>>({});

  useEffect(() => {
    calculateWeekDates();
  }, []);

  useEffect(() => {
    if (weekDates.length) {
      fetchUserEntries();
    }
  }, [weekDates]);

  const calculateWeekDates = (): void => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = currentDay; // No adjustment needed as Sunday is 0
    const sunday = new Date(today.setDate(today.getDate() - diff));

    const dates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      return date;
    });

    setWeekDates(dates);
  };

  const fetchUserEntries = async (): Promise<void> => {
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
      const dateKey = new Date(entry.created_at).toISOString().split("T")[0];
      entriesMap[dateKey] = true;
    });

    setUserEntries(entriesMap);
  };

  const renderDay = ({ item, index }: ListRenderItemInfo<Date>) => (
    <DayItem
      date={item}
      hasEntry={userEntries[item.toISOString().split("T")[0]] || false}
      isLast={index === weekDates.length - 1}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={weekDates}
        renderItem={renderDay}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toISOString()}
      />
    </View>
  );
};

const DayItem: React.FC<DayItemProps> = ({ date, hasEntry, isLast }) => {
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
  const dayNumber = date.getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = date < today;
  const isToday = date.toDateString() === today.toDateString();

  let icon = "•"; // Default dot
  if (isPast || isToday) {
    icon = hasEntry ? "✓" : "★";
  }

  return (
    <View style={styles.dayContainer}>
      <Text style={styles.dayName}>{dayName}</Text>
      <Text style={styles.dayNumber}>{dayNumber}</Text>
      <Text style={styles.icon}>{icon}</Text>
      {!isLast && (isPast || isToday) && <View style={styles.connectingLine} />}
    </View>
  );
};

export default WeekDisplay;

// src/contexts/AuthContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { PostgrestResponse, Session } from "@supabase/supabase-js";
import { weekDates } from "@/utils/dateFunctions";

export interface AuthContextType {
  session: Session | null;
  signUp: (email: string, password: string) => Promise<Session | null>;
  logIn: (email: string, password: string) => Promise<Session | null>;
  signOut: () => Promise<void>;
  loading: boolean;
  insertMove: (
    moveRank: string,
    isPlayer1: boolean,
    isPreflop: boolean
  ) => Promise<void>;
  fetchAllMoveCount: () => Promise<number | null>;
  fetchEmail: () => string | undefined;
  fetchTodayMoveCount: () => Promise<number | null>;
  fetchUserEntries: () => Promise<Record<string, boolean> | void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface UserEntry {
  created_at: string; // PostgreSQL timestamptz is represented as a string in JSON
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for authentication changes (i.e. user logs in, logs out, or token refreshes)
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    setSession(session);
    return session;
  };

  const logIn = async (email: string, password: string) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({ email, password });
    if (session) setSession(session);
    return session;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null);
  };

  const insertMove = async (
    moveRank: string,
    isPlayer1: boolean,
    isPreflop: boolean
  ) => {
    const { error } = await supabase.from("leduc_moves").insert({
      user_id: session?.user.id,
      move_rank: moveRank,
      is_player_1: isPlayer1,
      is_preflop: isPreflop,
    });
    if (error) throw error;
  };

  const fetchEmail = () => {
    return session?.user.email;
  };

  const fetchAllMoveCount = async () => {
    const { count, error } = await supabase
      .from("leduc_moves")
      .select("*", { count: "exact", head: true })
      .eq("user_id", session?.user.id);
    if (error) {
      console.error(error);
    }
    return count;
  };

  const fetchTodayMoveCount = async () => {
    // Get today's date at the start of the day (midnight) in ISO format
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISOString = today.toISOString();

    // Get tomorrow's date (to use as the upper bound)
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowISOString = tomorrow.toISOString();

    const { count, error } = await supabase
      .from("leduc_moves")
      .select("*", { count: "exact", head: true })
      .gte("created_at", todayISOString)
      .lt("created_at", tomorrowISOString);

    if (error) throw error;

    return count ?? 0;
  };

  const fetchUserEntries = async (): Promise<Record<
    string,
    boolean
  > | void> => {
    if (weekDates.length < 2) return;

    const startOfWeek = weekDates[0].toISOString();
    const endOfWeek = new Date(weekDates[6].getTime() + 86399999).toISOString(); // End of Saturday

    const { data, error }: PostgrestResponse<UserEntry> = await supabase
      .from("leduc_moves")
      .select("created_at")
      .gte("created_at", startOfWeek)
      .lte("created_at", endOfWeek);

    if (error) throw error;

    const entriesMap: Record<string, boolean> = {};
    data?.forEach((entry) => {
      const dateUTC = new Date(entry.created_at);
      const date = new Date(
        dateUTC.getTime() - dateUTC.getTimezoneOffset() * 60000
      );
      const dateKey = new Date(date).toISOString().split("T")[0];
      entriesMap[dateKey] = true;
    });

    return entriesMap;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        signUp,
        logIn,
        signOut,
        loading,
        insertMove,
        fetchAllMoveCount,
        fetchEmail,
        fetchTodayMoveCount,
        fetchUserEntries,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

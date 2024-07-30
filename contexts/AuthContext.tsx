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
  fetchThisWeekMoveCount: () => Promise<number | null>;
  fetchUserEntries: () => Promise<Record<string, boolean> | void>;
  fetchUserMovesWithOnlyRankings: () => Promise<string[] | null>;
  fetchAvatarPath: () => Promise<string>;
  updateAvatarPath: (avatarPath: string) => Promise<void>;
  fetchName: () => Promise<string>;
  fetchUserCreationDate: () => string | undefined;
  // fetchAvatarUrl: () => Promise<string>;
  // uploadAvatar: (uri: string) => Promise<string | undefined>;
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

  const fetchThisWeekMoveCount = async () => {
    const startOfWeek = weekDates[0].toISOString();
    const endOfWeek = new Date(weekDates[6].getTime() + 86399999).toISOString(); // End of Saturday

    const { count, error } = await supabase
      .from("leduc_moves")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfWeek)
      .lt("created_at", endOfWeek);

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

  const fetchUserMovesWithOnlyRankings = async () => {
    const { data, error } = await supabase
      .from("leduc_moves")
      .select("move_rank")
      .eq("user_id", session?.user.id);
    if (error) throw error;
    const moveRanks = data.map((item) => item.move_rank);
    return moveRanks;
  };

  const fetchAvatarPath = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("avatar_path")
      .eq("id", session?.user.id)
      .single();
    if (error) throw error;
    return data.avatar_path;
  };

  const updateAvatarPath = async (avatarPath: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_path: avatarPath })
      .eq("id", session?.user.id);
    if (error) throw error;
  };

  const fetchName = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", session?.user.id)
      .single();

    if (error) throw error;
    return data.full_name;
  };

  const fetchUserCreationDate = () => {
    return session?.user.created_at;
  };

  // const fetchAvatarUrl = async () => {
  //   const { data, error } = await supabase
  //     .from("profiles")
  //     .select("avatar_url")
  //     .eq("email", session?.user.email)
  //     .single();

  //   if (error) throw error;
  //   return data.avatar_url;
  // };

  // const uploadAvatar = async (uri: string) => {
  //   try {
  //     // Read the file as base64
  //     const base64 = await FileSystem.readAsStringAsync(uri, {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });
  //     const fileName = `${fetchEmail()}.jpg`;

  //     // Upload the file
  //     const { data, error } = await supabase.storage
  //       .from("avatars")
  //       .upload(fileName, decode(base64), {
  //         contentType: "image/jpeg",
  //         upsert: true,
  //       });

  //     if (error) {
  //       throw error;
  //     } else if (data) {
  //       const { data: publicUrlData } = supabase.storage
  //         .from("avatars")
  //         .getPublicUrl(data.path);

  //       console.log(publicUrlData.publicUrl);

  //       if (publicUrlData) {
  //         await updateProfile(publicUrlData.publicUrl);
  //       }
  //       return publicUrlData.publicUrl;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const updateProfile = async (avatarUrl: string) => {
  //   const { error } = await supabase
  //     .from("profiles")
  //     .update({ avatar_url: avatarUrl })
  //     .eq("id", session?.user.id);

  //   if (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

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
        fetchThisWeekMoveCount,
        fetchUserEntries,
        fetchUserMovesWithOnlyRankings,
        fetchAvatarPath,
        updateAvatarPath,
        fetchName,
        fetchUserCreationDate,
        // fetchAvatarUrl,
        // uploadAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

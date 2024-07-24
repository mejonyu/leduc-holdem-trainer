// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { Alert } from "react-native";

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
  fetchAllMovesCount: () => Promise<number | null>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

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
    const { data, error } = await supabase.from("leduc_moves").insert({
      user_id: session?.user.id,
      move_rank: moveRank,
      is_player_1: isPlayer1,
      is_preflop: isPreflop,
    });
    if (error) throw error;
  };

  const fetchAllMovesCount = async () => {
    const { count, error } = await supabase
      .from("leduc_moves")
      .select("*", { count: "exact", head: true })
      .eq("user_id", session?.user.id);
    if (error) {
      console.error(error);
    }
    return count;
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
        fetchAllMovesCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

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

export interface AuthContextType {
  session: Session | null;
  signUp: (email: string, password: string) => Promise<Session | null>;
  //   signIn: (email: string, password: string) => Promise<void>;
  //   signOut: () => Promise<void>;
  loading: boolean;
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

  //   const signIn = async (email: string, password: string) => {
  //     const { user, error } = await supabase.auth.signIn({ email, password });
  //     if (error) throw error;
  //     setUser(user);
  //   };

  //   const signOut = async () => {
  //     const { error } = await supabase.auth.signOut();
  //     if (error) throw error;
  //     setUser(null);
  //   };

  return (
    <AuthContext.Provider value={{ session, signUp, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

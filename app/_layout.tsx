import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/components/AuthModal/AuthModal.styles";
import { scaleIconSize } from "@/utils/dimensionScaling";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // const [session, setSession] = useState<Session | null>(null);

  // useEffect(() => {
  //   // Check for existing session on component mount
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   // Listen for authentication changes (i.e. user logs in, logs out, or token refreshes)
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  const navBack = () => {
    router.back();
  };

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name="app/(tabs)"
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="app/(modals)/game"
            options={{
              presentation: "fullScreenModal",
              headerTitle: "GTO Training",
              headerStyle: styles.headerStyle,
              // headerShadowVisible: false,
              headerTitleStyle: styles.modalHeaderText,
              headerLeft: () => (
                <Ionicons
                  name="return-up-back"
                  size={scaleIconSize(28)}
                  color="black"
                  onPress={navBack}
                />
              ),
            }}
          />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}

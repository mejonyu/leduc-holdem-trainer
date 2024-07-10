import React, { useState } from "react";
import { View, Button, Animated } from "react-native";
import AuthModal from "../components/AuthModal/AuthModal";
import { Link } from "expo-router";

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Link href="(auth)/continue-with-email">Log In</Link>
      {/* <Button title="Open Auth Modal" onPress={() => setModalVisible(true)} />
      <AuthModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      /> */}
    </View>
  );
};

export default App;

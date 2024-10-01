import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { scaleHeight, scaleIconSize } from "@/utils/dimensionScaling";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./SettingsRow.styles";
import EditInfoModal from "@/components/ProfilePage/EditInfoModal/EditInfoModal";
import { triggerButtonHapticFeedback } from "@/utils/haptics";

interface SettingsRowProps {
  title: string;
}

const SettingsRow: React.FC<SettingsRowProps> = ({ title }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderIcon = () => {
    switch (title) {
      case "Change Email":
        return (
          <MaterialIcons name="email" size={scaleHeight(24)} color="black" />
        );
      case "Edit Name":
        return (
          <FontAwesome name="id-badge" size={scaleHeight(24)} color="black" />
        );
      case "Change Password":
        return <FontAwesome name="lock" size={scaleHeight(24)} color="black" />;
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getFieldName = () => {
    switch (title) {
      case "Change Email":
        return "Email";
      case "Edit Name":
        return "Name";
      case "Change Password":
        return "Password";
      default:
        return "Field Doesn't Exist";
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.row}
        onPress={() => {
          triggerButtonHapticFeedback();
          setModalVisible(true);
        }}
      >
        {/* Left side of row */}
        <View style={styles.left}>
          <View style={styles.icon}>{renderIcon()}</View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {/* Right side of row */}
        <View style={styles.right}>
          <Ionicons
            name="chevron-forward"
            size={scaleIconSize(18)}
            color="black"
          />
        </View>
      </TouchableOpacity>
      {/* Edit info modal */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <EditInfoModal
          title={getFieldName()}
          modalVisible={modalVisible}
          closeModal={closeModal}
          customAnimationType="none"
        />
      </TouchableWithoutFeedback>
    </>
  );
};

export default SettingsRow;

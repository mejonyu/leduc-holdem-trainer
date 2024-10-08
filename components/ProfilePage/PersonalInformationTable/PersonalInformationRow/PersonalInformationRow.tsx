import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { scaleHeight } from "@/utils/dimensionScaling";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import styles from "./PersonalInformationRow.styles";
import EditInfoModal from "../../EditInfoModal/EditInfoModal";
import { triggerButtonHapticFeedback } from "@/utils/haptics";

interface PersonalInformationRowProps {
  title: string;
  data: string | null;
  refetchData?: () => Promise<void>;
}

const PersonalInformationRow: React.FC<PersonalInformationRowProps> = ({
  title,
  data,
  refetchData,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderIcon = () => {
    switch (title) {
      case "Email":
        return (
          <MaterialIcons name="email" size={scaleHeight(24)} color="black" />
        );
      case "Name":
        return (
          <FontAwesome name="id-badge" size={scaleHeight(24)} color="black" />
        );
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.row}>
        {/* Left side of row */}
        <View style={styles.left}>
          <View style={styles.icon}>{renderIcon()}</View>
          <Text style={styles.title}>{title}</Text>
        </View>
        {/* Right side of row */}
        <View style={styles.right}>
          {data ? (
            <Text style={styles.data}>{data}</Text>
          ) : (
            <TouchableOpacity
              onPress={() => {
                triggerButtonHapticFeedback();
                setModalVisible(true);
              }}
            >
              <Ionicons name="add" size={scaleHeight(20)} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Edit info modal */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <EditInfoModal
          title={title}
          modalVisible={modalVisible}
          closeModal={closeModal}
          refetchData={refetchData}
        />
      </TouchableWithoutFeedback>
    </>
  );
};

export default PersonalInformationRow;

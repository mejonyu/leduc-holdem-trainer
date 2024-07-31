import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { scaleHeight } from "@/utils/dimensionScaling";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "./PersonalInformationRow.styles";
import EditInfoModal from "../../EditInfoModal/EditInfoModal";

interface PersonalInformationRowProps {
  title: string;
  data: string | null;
}

const PersonalInformationRow: React.FC<PersonalInformationRowProps> = ({
  title,
  data,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderIcon = () => {
    switch (title) {
      case "Email":
        return (
          <MaterialIcons name="email" size={scaleHeight(24)} color="black" />
        );
      case "Name":
        return <FontAwesome name="id-badge" size={24} color="black" />;
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
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <FontAwesome6 name="plus" size={18} color="#4169E1" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* Edit info modal */}
      <EditInfoModal
        title={title}
        modalVisible={modalVisible}
        closeModal={closeModal}
      />
    </>
  );
};

export default PersonalInformationRow;

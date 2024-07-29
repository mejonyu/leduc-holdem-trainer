// ProfilePhoto.tsx
import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Text,
  StyleProp,
  ImageStyle,
} from "react-native";
import styles from "./ProfilePhoto.styles";

interface ImageOption {
  label: string;
  value: string;
  image: any;
  customStyles?: StyleProp<ImageStyle>;
}

const imageOptions: ImageOption[] = [
  {
    label: "",
    value: "chip",
    image: (
      <Image
        source={require("@/assets/images/chip-black.png")}
        style={styles.optionImage}
      />
    ),
  },
  {
    label: "",
    value: "dice",
    image: (
      <Image
        source={require("@/assets/images/dice.png")}
        style={styles.optionImage}
      />
    ),
  },
  {
    label: "",
    value: "jack",
    image: (
      <Image
        source={require("@/assets/images/jack.png")}
        style={{ height: scaleHeight(90), width: scaleWidth(90) }}
      />
    ),
  },
];

interface ProfilePhotoProps {
  selectedImage: any;
  onImageSelect: (image: any) => void;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  selectedImage,
  onImageSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleImageSelect = (image: any) => {
    onImageSelect(image);
    setModalVisible(false);
  };

  return (
    <View style={styles.profilePhotoContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {selectedImage}
        <View style={styles.editIconContainer}>
          <Text style={styles.editIcon}>✏️</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Select Profile Photo</Text>
              <Ionicons
                name="return-up-back"
                size={scaleHeight(24)}
                color="black"
                onPress={() => setModalVisible(false)}
                style={styles.modalHeaderBackIcon}
              />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {imageOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => handleImageSelect(item.image)}
                >
                  <View style={styles.imageContainer}>{item.image}</View>
                  <Text style={styles.optionLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfilePhoto;

// ProfilePhoto.tsx
import {
  scaleHeight,
  scaleIconSize,
  scaleWidth,
} from "@/utils/dimensionScaling";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
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
  ImageSourcePropType,
} from "react-native";
import styles from "./ProfilePhoto.styles";
import { useAuth } from "@/hooks/useAuth";
import { triggerButtonHapticFeedback } from "@/utils/haptics";

interface ImageOption {
  label: string;
  value: string;
  image: ImageSourcePropType;
  imageStyles?: StyleProp<ImageStyle>;
}

export const imageOptions: Record<string, ImageOption> = {
  "@/assets/images/chip-black.png": {
    label: "",
    value: "chip",
    image: require("@/assets/images/chip-black.png"),
  },
  "@/assets/images/dice.png": {
    label: "",
    value: "dice",
    image: require("@/assets/images/dice.png"),
  },
  "@/assets/images/jack.png": {
    label: "",
    value: "jack",
    image: require("@/assets/images/jack.png"),
    imageStyles: { height: "85%", width: "85%" },
  },
};

interface ProfilePhotoProps {
  selectedImage: any;
  onImageSelect: (image: any) => void;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  selectedImage,
  onImageSelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { updateAvatarPath } = useAuth();

  const handleImageSelect = (path: string) => {
    triggerButtonHapticFeedback();
    onImageSelect(path);
    setModalVisible(false);
    try {
      updateAvatarPath(path);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.profilePhotoContainer}>
      <TouchableOpacity
        onPress={() => {
          triggerButtonHapticFeedback();
          setModalVisible(true);
        }}
      >
        <View style={styles.profilePhoto}>
          <Image
            source={imageOptions[selectedImage].image}
            style={[
              styles.optionImage,
              imageOptions[selectedImage].imageStyles,
            ]}
          />
        </View>
        <View style={styles.editIconContainer}>
          <Feather name="edit-2" size={scaleHeight(20)} color="black" />
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
                size={scaleIconSize(28)}
                color="black"
                onPress={() => setModalVisible(false)}
                style={styles.modalHeaderBackIcon}
              />
            </View>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {Object.entries(imageOptions).map(([key, value]) => (
                <TouchableOpacity
                  key={value.value}
                  onPress={() => handleImageSelect(key)}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={value.image}
                      style={[styles.optionImage, value.imageStyles]}
                    />
                  </View>
                  <Text style={styles.optionLabel}>{value.label}</Text>
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

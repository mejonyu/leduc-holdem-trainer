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
  ImageSourcePropType,
} from "react-native";
import styles from "./ProfilePhoto.styles";
import { useAuth } from "@/hooks/useAuth";

interface ImageOption {
  label: string;
  value: string;
  image: ImageSourcePropType;
  imageStyles?: StyleProp<ImageStyle>;
}

const imageOptions: Record<string, ImageOption> = {
  "@/assets/images/chip-black.png": {
    label: "",
    value: "chip",
    image: require("@/assets/images/chip-black.png"),
    imageStyles: styles.optionImage,
  },
  "@/assets/images/dice.png": {
    label: "",
    value: "dice",
    image: require("@/assets/images/dice.png"),
    imageStyles: styles.optionImage,
  },
  "@/assets/images/jack.png": {
    label: "",
    value: "jack",
    image: require("@/assets/images/jack.png"),
    imageStyles: { height: scaleHeight(90), width: scaleWidth(90) },
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
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={imageOptions[selectedImage].image}
          style={[styles.optionImage, imageOptions[selectedImage].imageStyles]}
        />
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

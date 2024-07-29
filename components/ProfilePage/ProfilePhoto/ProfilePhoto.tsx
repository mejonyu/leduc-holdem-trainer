// ProfilePhoto.tsx
import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import { FontAwesome5 } from "@expo/vector-icons";
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

interface ImageOption {
  label: string;
  value: string;
  image: any;
  customStyles?: StyleProp<ImageStyle>;
}

const imageOptions: ImageOption[] = [
  {
    label: "",
    value: "avatar-1",
    image: require("@/assets/images/chip-black.png"),
  },
  {
    label: "",
    value: "avatar-3",
    image: require("@/assets/images/dice.png"),
  },
  {
    label: "",
    value: "avatar-4",
    image: require("@/assets/images/jack.png"),
    customStyles: { height: scaleHeight(65), width: scaleWidth(65) },
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
        <Image source={selectedImage} style={styles.profilePhoto} />
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
            <Text style={styles.modalHeader}>Select Profile Photo</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {imageOptions.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  onPress={() => handleImageSelect(item.image)}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={item.image}
                      style={[styles.optionImage, item.customStyles]}
                    />
                  </View>
                  <Text style={styles.optionLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePhotoContainer: {
    alignSelf: "center",
    position: "relative",
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 4,
  },
  editIcon: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  imageContainer: {
    width: 80,
    height: 80,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  optionImage: {
    width: 80,
    height: 80,
    // borderRadius: 30,
  },
  optionLabel: {
    textAlign: "center",
  },
  closeButton: {
    marginTop: 16,
    padding: 8,
    backgroundColor: "#007BFF",
    borderRadius: 4,
  },
  closeButtonText: {
    color: "#fff",
  },
});

export default ProfilePhoto;

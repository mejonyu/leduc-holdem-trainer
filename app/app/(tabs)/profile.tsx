// app/profile.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import ProfilePhoto from "@/components/ProfilePage/ProfilePhoto/ProfilePhoto";
import { useAuth } from "@/hooks/useAuth";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { formatDate } from "@/utils/dateFunctions";
import PersonalInformationTable from "@/components/ProfilePage/PersonalInformationTable/PersonalInformationTable";
import { scaleHeight, scaleWidth } from "@/utils/dimensionScaling";
import UtilitiesTable from "@/components/ProfilePage/UtilitiesTable/UtilitiesTable";
import { Feather } from "@expo/vector-icons";
import { Modal } from "react-native";
import SettingsModal from "@/components/ProfilePage/SettingsModal/SettingsModal";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>();
  const [name, setName] = useState<string | null>();
  const { fetchEmail, fetchAvatarPath, fetchName, fetchUserCreationDate } =
    useAuth();
  const [showModal, setShowModal] = useState<boolean>(false);

  const refetchData = async () => {
    try {
      const path = await fetchAvatarPath();
      if (path) {
        setAvatar(path);
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const name = await fetchName();
      if (name) {
        setName(name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  const truncateEmail = () => {
    const email = fetchEmail();
    // Return everything before the "@" symbol.
    return email?.substring(0, email.indexOf("@"));
  };

  const renderUserCreationDate = () => {
    const creationString = fetchUserCreationDate();
    if (creationString) {
      return formatDate(creationString);
    } else {
      return null;
    }
  };

  return (
    <>
      <SafeAreaView style={styles.profilePage}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.settings}
            onPress={() => setShowModal(true)}
          >
            <Feather name="settings" size={scaleHeight(24)} color="black" />
          </TouchableOpacity>
          <View style={styles.profilePhoto}>
            {avatar ? (
              <ProfilePhoto selectedImage={avatar} onImageSelect={setAvatar} />
            ) : null}
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name}>{name ? name : truncateEmail()}</Text>
            <Text style={styles.activeSince}>
              Active Since •{" "}
              <Text style={styles.creationDate}>
                {renderUserCreationDate()}
              </Text>
            </Text>
          </View>
          <PersonalInformationTable
            email={fetchEmail()}
            name={name ? name : null}
            refetchData={refetchData}
          />
          <UtilitiesTable />
        </View>
      </SafeAreaView>

      {/* Settings Modal */}
      <SettingsModal
        modalVisible={showModal}
        closeModal={() => setShowModal(false)}
        refetchData={refetchData}
      />
    </>
  );
}

const styles = StyleSheet.create({
  profilePage: {
    backgroundColor: "white",
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: scaleWidth(20),
    paddingVertical: scaleHeight(20),
  },
  settings: {
    alignSelf: "flex-end",
  },
  headerText: {
    alignItems: "center",
    marginBottom: scaleHeight(20),
  },
  name: {
    fontSize: scaleHeight(28),
    fontWeight: "bold",
    color: "black",
    marginBottom: scaleHeight(5),
  },
  activeSince: {
    fontSize: scaleHeight(12),
    color: "black",
    marginBottom: scaleHeight(20),
  },
  creationDate: {
    fontWeight: "bold",
    fontSize: scaleHeight(14),
    color: "black",
  },
  profilePhoto: {
    width: scaleHeight(100),
    height: scaleHeight(100),
    borderRadius: scaleHeight(50),
    // justifyContent: "center",
    // alignItems: "center",
  },
});

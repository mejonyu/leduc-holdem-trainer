// app/profile.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ProfilePhoto from "@/components/ProfilePage/ProfilePhoto/ProfilePhoto";
import { useAuth } from "@/hooks/useAuth";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import { formatDate } from "@/utils/dateFunctions";
import PersonalInformationTable from "@/components/ProfilePage/PersonalInformationTable/PersonalInformationTable";

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>();
  const [name, setName] = useState<string | null>();
  const { fetchEmail, fetchAvatarPath, fetchName, fetchUserCreationDate } =
    useAuth();

  useEffect(() => {
    const getAvatarPath = async () => {
      try {
        const path = await fetchAvatarPath();
        if (path) {
          setAvatar(path);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const getName = async () => {
      try {
        const name = await fetchName();
        if (name) {
          setName(name);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAvatarPath();
    getName();
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
    <View style={styles.container}>
      {avatar ? (
        <>
          <ProfilePhoto selectedImage={avatar} onImageSelect={setAvatar} />
        </>
      ) : null}
      <Text style={styles.name}>{name ? name : truncateEmail()}</Text>
      <Text style={styles.activeSince}>
        Active Since •{" "}
        <Text style={styles.creationDate}>{renderUserCreationDate()}</Text>
      </Text>
      <PersonalInformationTable
        email={fetchEmail()}
        name={name ? name : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#464c55",
    marginBottom: 5,
  },
  activeSince: {
    fontSize: 14,
    color: "#979da5",
    marginBottom: 20,
  },
  creationDate: {
    fontWeight: "bold",
  },
});

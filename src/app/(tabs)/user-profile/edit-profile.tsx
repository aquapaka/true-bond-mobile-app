import { EditProfileForm } from "@/src/components/form/EditProfileForm";
import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Edit Profile</Text>
      <EditProfileForm/>
    </SafeAreaView>
  );
}

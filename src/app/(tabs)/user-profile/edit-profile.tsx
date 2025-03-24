import { EditProfileForm } from "@/src/components/form/EditProfileForm";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

export default function EditProfileScreen() {
  return (
    <ScrollView>
      <EditProfileForm />
    </ScrollView>
  );
}

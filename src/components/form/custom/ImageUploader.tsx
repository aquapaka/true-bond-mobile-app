import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { showNotification } from "../../../utils/notificationUtils";
import { Button, Text } from "react-native-paper";
import { storage } from "@/src/lib/firebase";

export default function ImageUploader({
  value,
  onChange,
  onBlur,
}: {
  value: string; // The image URL
  onChange: (url: string) => void;
  onBlur: () => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function pickImage() {
    // Request gallery permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showNotification(
        "info",
        "Permission Required",
        "Please allow access to your gallery."
      );
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      uploadImage(uri);
    }
  }

  async function uploadImage(uri: string) {
    try {
      setUploading(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = `uploads/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.jpg`;
      const storageRef = ref(storage, filename);

      // Upload to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          setUploading(false);
          showNotification("error", "Upload Failed", error.message);
        },
        async () => {
          const downloadUrl = await getDownloadURL(storageRef);
          onChange(downloadUrl); // Set form value
          onBlur(); // Mark as interacted
          setUploading(false);
          showNotification(
            "success",
            "Upload Complete",
            "Your image has been uploaded."
          );
        }
      );
    } catch (error) {
      setUploading(false);
      showNotification("error", "Upload Error", "Failed to upload image.");
    }
  }

  return (
    <View style={{ alignItems: "center", marginVertical: 10, gap: 8 }}>
      {value ? (
        <Image
          source={{ uri: value }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
      ) : (
        <Text variant="labelSmall">{uploading ? "Uploading..." : "No Image Selected"}</Text>
      )}

      {uploading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Button mode="contained" onPress={pickImage}>
          Upload image
        </Button>
      )}

      {value && (
        <Button mode="outlined" onPress={() => onChange("")}>
          Remove image
        </Button>
      )}
    </View>
  );
}

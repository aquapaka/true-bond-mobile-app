import * as ImageManipulator from "expo-image-manipulator";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { deleteObject } from "firebase/storage";

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 * @param uri Local image URI.
 * @param path Storage folder path (e.g., "profile_pictures").
 * @returns The download URL of the uploaded image.
 */
export const uploadImage = async (
  uri: string,
  path: string,
): Promise<string> => {
  try {
    const storage = getStorage();

    // Generate a unique filename using timestamp
    const filename = `${Date.now()}.jpg`;
    const storageRef = ref(storage, `${path}/${filename}`);

    // Ensure the image is a valid file
    const isLocalFile = uri.startsWith("file://");

    let fileUri = uri;
    if (isLocalFile) {
      // Compress image (optional, improves performance)
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800 } }], // Resize to 800px width
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
      );
      fileUri = manipulatedImage.uri;
    }

    // Convert to Blob
    const response = await fetch(fileUri);
    const blob = await response.blob();

    // Upload to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, blob);
    await uploadTask;

    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("Failed to upload image");
  }
};

/**
 * Deletes an image from Firebase Storage.
 * @param imagePath The full path of the image in storage (e.g., "profile_pictures/12345.jpg").
 * @returns A promise that resolves when the image is deleted.
 */
export const deleteImage = async (imagePath: string): Promise<void> => {
  try {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    console.log(`Deleted image: ${imagePath}`);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Failed to delete image");
  }
};

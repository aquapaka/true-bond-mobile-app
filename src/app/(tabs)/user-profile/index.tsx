import React from "react";
import { SafeAreaView, View, Image, StyleSheet } from "react-native";
import { Button, Text, List, Avatar } from "react-native-paper";
import { Link } from "expo-router";
import { useAuth } from "@/src/context/AuthProvider";

export default function ProfileScreen() {
  const { signOut, user } = useAuth(); 

  async function onLogoutPress() {
    await signOut();
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Picture and Name */}
      <View style={styles.profileHeader}>
        <Avatar.Image
          size={120}
          source={{ uri: user?.profileImage || "" }}
        />
        <Text variant="titleLarge" style={styles.userName}>
          {user?.name || "User Name"}
        </Text>
        <Text variant="bodyMedium" style={styles.userHandle}>
          {user?.email ? user.email: "username"}
        </Text>
        <Link href={"/(tabs)/user-profile/edit-profile"} asChild>
          <Button mode="contained" onPress={() => null}>
            Edit profile
          </Button>
        </Link>
      </View>

      {/* Menu List */}
      <View style={styles.menuList}>
        <List.Item
          title="Settings"
          left={() => <List.Icon icon="cog" />}
          right={() => <List.Icon icon="chevron-right" />}
        />
        <List.Item
          title="Billing Details"
          left={() => <List.Icon icon="credit-card" />}
          right={() => <List.Icon icon="chevron-right" />}
        />
        <List.Item
          title="User Management"
          left={() => <List.Icon icon="account-group" />}
          right={() => <List.Icon icon="chevron-right" />}
        />
        <List.Item
          title="Information"
          left={() => <List.Icon icon="information" />}
          right={() => <List.Icon icon="chevron-right" />}
        />
        <List.Item
          title="Log out"
          left={() => <List.Icon icon="logout" />}
          onPress={onLogoutPress}
        />
        <Text>Profile Screen</Text>
      </View>
      <Link href={"/(tabs)/user-profile/become-counselor"} asChild>
        <Button mode="contained" onPress={() => null}>
          Apply to be counselor
        </Button>
      </Link>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  userName: {
    marginTop: 10,
    fontWeight: "bold",
  },
  userHandle: {
    color: "#888",
  },
  editProfileButton: {
    marginTop: 15,
  },
  menuList: {
    width: "100%",
  },
});

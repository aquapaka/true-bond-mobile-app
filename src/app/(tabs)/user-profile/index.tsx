import { useAuth } from "@/src/context/AuthProvider";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  Avatar,
  Button,
  Card,
  Divider,
  List,
  Text,
  useTheme,
} from "react-native-paper";

export default function ProfileScreen() {
  const { signOut, userData } = useAuth();
  const theme = useTheme();

  async function onLogoutPress() {
    await signOut();
  }

  return (
    <ScrollView>
      <View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background, padding: 12 },
        ]}
      >
        <StatusBar style="auto" />
        <View
          style={{
            marginBottom: 100,
          }}
        >
          {/* Profile Card */}
          <Card style={styles.profileCard} elevation={2}>
            <Card.Content style={styles.profileInfo}>
              <View style={styles.avatarContainer}>
                {userData?.profileImage ? (
                  <Avatar.Image
                    size={100}
                    source={{ uri: userData.profileImage }}
                    style={styles.avatar}
                  />
                ) : (
                  <Avatar.Icon
                    size={100}
                    icon="account"
                    style={[
                      styles.avatar,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  />
                )}
              </View>

              <Text variant="headlineSmall" style={styles.userName}>
                {userData?.name || "User Name"}
              </Text>
              <Text
                variant="bodyMedium"
                style={[styles.userHandle, { color: theme.colors.outline }]}
              >
                {userData?.email || "email@example.com"}
              </Text>

              <Link href={"/(tabs)/user-profile/edit-profile"} asChild>
                <Button
                  mode="contained"
                  style={[
                    styles.editProfileButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  icon="account-edit"
                >
                  Edit Profile
                </Button>
              </Link>
            </Card.Content>
          </Card>

          {/* Menu List */}
          <Card style={styles.menuCard} elevation={2}>
            <Card.Title
              title="Account Settings"
              titleStyle={{ color: theme.colors.primary }}
            />
            <Card.Content style={styles.menuList}>
              <List.Item
                title="Settings"
                description="App preferences and notifications"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="cog"
                    color={theme.colors.primary}
                  />
                )}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                style={styles.listItem}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
              />
              <Divider />
              <List.Item
                title="Billing Details"
                description="Manage your payment methods"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="credit-card"
                    color={theme.colors.primary}
                  />
                )}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                style={styles.listItem}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
              />
              <Divider />
              <List.Item
                title="User Management"
                description="Manage your account settings"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="account-group"
                    color={theme.colors.primary}
                  />
                )}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                style={styles.listItem}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
              />
              <Divider />
              <List.Item
                title="Information"
                description="About the app and help"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="information"
                    color={theme.colors.primary}
                  />
                )}
                right={(props) => <List.Icon {...props} icon="chevron-right" />}
                style={styles.listItem}
                titleStyle={styles.listItemTitle}
                descriptionStyle={styles.listItemDescription}
              />
              <Divider />
              <List.Item
                title="Log out"
                description="Sign out from your account"
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="logout"
                    color={theme.colors.error}
                  />
                )}
                onPress={onLogoutPress}
                style={styles.listItem}
                titleStyle={[
                  styles.listItemTitle,
                  { color: theme.colors.error },
                ]}
                descriptionStyle={styles.listItemDescription}
              />
            </Card.Content>
          </Card>

          {/* Counselor Application */}
          {userData?.role === "client" && !userData?.counselorProfileId && (
            <Card style={styles.counselorCard} elevation={2}>
              <Card.Title
                title="Become a Counselor"
                titleStyle={{ color: theme.colors.primary }}
                subtitle="Help others with your expertise"
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="heart"
                    size={40}
                    style={{ backgroundColor: theme.colors.primaryContainer }}
                  />
                )}
              />
              <Card.Content>
                <Text variant="bodyMedium" style={styles.counselorText}>
                  Share your knowledge and experience by becoming a counselor on
                  our platform.
                </Text>
                <Link href={"/(tabs)/user-profile/become-counselor"} asChild>
                  <Button
                    mode="contained-tonal"
                    style={[
                      styles.counselorButton,
                      { backgroundColor: theme.colors.primaryContainer },
                    ]}
                    labelStyle={{ color: theme.colors.primary }}
                    icon="account-tie"
                  >
                    Apply to be a Counselor
                  </Button>
                </Link>
              </Card.Content>
            </Card>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    marginBottom: 16,
    overflow: "hidden",
  },
  avatarContainer: {
    alignItems: "center",
    position: "relative",
    marginTop: 16,
    marginBottom: 8,
  },
  avatar: {
    borderWidth: 2,
    borderColor: "white",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: "35%",
  },
  profileInfo: {
    alignItems: "center",
    paddingVertical: 16,
  },
  userName: {
    fontWeight: "bold",
    marginTop: 16,
  },
  userHandle: {
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    height: "100%",
    width: 1,
  },
  editProfileButton: {
    marginTop: 16,
    paddingVertical: 6,
    width: "80%",
  },
  menuCard: {
    marginBottom: 16,
  },
  menuList: {
    padding: 0,
  },
  listItem: {
    paddingVertical: 12,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  listItemDescription: {
    fontSize: 12,
  },
  counselorCard: {},
  counselorText: {
    marginBottom: 16,
    lineHeight: 20,
  },
  counselorButton: {
    marginTop: 8,
    paddingVertical: 6,
  },
});

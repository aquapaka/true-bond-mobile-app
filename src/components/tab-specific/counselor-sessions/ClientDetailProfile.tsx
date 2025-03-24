import { UserData } from "@/src/types/User";
import { formatShortDate } from "@/src/utils/formatUtils";
import { Image, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export function ClientDetailProfile({ client }: { client: UserData }) {
  const theme = useTheme();

  return (
    <Surface style={{ padding: 12, borderRadius: 12, gap: 16 }}>
      {/*  */}
      <View style={{ flexDirection: "row", gap: 6 }}>
        <Icon name="account-circle" size={20} />
        <Text variant="titleMedium">Client profile</Text>
      </View>
      {/*  */}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 3 }}>
          <Image
            source={{ uri: client?.profileImage }}
            style={{ backgroundColor: theme.colors.primary }}
          />
        </View>
        <View style={{ flex: 5, gap: 2 }}>
          <Text variant="titleLarge">{client.name}</Text>
          <Text variant="labelSmall">
            Date Of Birth:{" "}
            {client.dateOfBirth
              ? formatShortDate(client.dateOfBirth)
              : "no info"}
          </Text>
          <Text variant="labelSmall">Gender: {client.gender}</Text>
          <Text variant="labelSmall">Email: {client.email}</Text>
          <Text variant="labelSmall">Phone: {client.phone}</Text>
          <Text variant="labelSmall">
            Relationship Status: {client.relationshipStatus}
          </Text>
        </View>
      </View>
    </Surface>
  );
}

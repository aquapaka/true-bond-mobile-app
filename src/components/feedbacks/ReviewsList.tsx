import { Review } from "@/src/types/Review";
import { timeAgo } from "@/src/utils/generalUtils";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Rating from "../Rating";

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  return (
    <View
      style={{
        alignItems: "stretch",
        gap: 32,
        paddingVertical: 16,
      }}
    >
      {reviews.map((review) => (
        <View style={{ gap: 8 }} key={review.clientName + review.createdAt}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Avatar.Image
              size={32}
              source={{ uri: review.clientProfileImage }}
            />
            <Avatar.Text size={32} label={review.clientName.substring(0, 2)} />
            <Text variant="labelLarge" style={{ fontWeight: "bold" }}>
              {review.clientName}
            </Text>
            <Text variant="labelSmall" style={{ fontWeight: "light" }}>
              {timeAgo(new Date(review.createdAt))}
            </Text>
            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
              <Rating rating={review.rating} />
            </View>
          </View>
          <Text variant="bodySmall">{review.comment}</Text>
        </View>
      ))}
    </View>
  );
}

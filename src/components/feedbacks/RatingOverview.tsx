import { Review } from "@/src/types/Review";
import { View } from "react-native";
import { ProgressBar, Text } from "react-native-paper";
import Rating from "../Rating";
import { calculateAvgRating } from "@/src/utils/generalUtils";

export default function RatingOverview({ reviews }: { reviews: Review[] }) {
  const rating1Count = reviews.filter((review) => review.rating === 1).length;
  const rating2Count = reviews.filter((review) => review.rating === 2).length;
  const rating3Count = reviews.filter((review) => review.rating === 3).length;
  const rating4Count = reviews.filter((review) => review.rating === 4).length;
  const rating5Count = reviews.filter((review) => review.rating === 5).length;

  return (
    <View style={{ flex: 1, flexDirection: "row", gap: 16 }}>
      <View style={{ flex: 3, justifyContent: "center", alignItems: "center" }}>
        <Text variant="headlineLarge" style={{ fontWeight: "bold" }}>
          {reviews.length
            ? calculateAvgRating(reviews.map((review) => review.rating))
            : "None"}
        </Text>
        <Rating
          rating={
            reviews.length
              ? calculateAvgRating(reviews.map((review) => review.rating))
              : 0
          }
        />
        <Text variant="labelSmall">{reviews.length} ratings</Text>
      </View>
      <View style={{ flex: 7 }}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              progress={
                reviews.length > 0
                  ? rating5Count / reviews.length
                  : 0
              }
            />
          </View>
          <Text variant="labelSmall" style={{ fontWeight: "bold" }}>
            5.0
          </Text>
          <Text variant="labelSmall">{rating5Count} ratings</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              progress={
                reviews.length > 0
                  ? rating4Count / reviews.length
                  : 0
              }
            />
          </View>
          <Text variant="labelSmall" style={{ fontWeight: "bold" }}>
            4.0
          </Text>
          <Text variant="labelSmall">{rating4Count} ratings</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              progress={
                reviews.length > 0
                  ? rating3Count / reviews.length
                  : 0
              }
            />
          </View>
          <Text variant="labelSmall" style={{ fontWeight: "bold" }}>
            3.0
          </Text>
          <Text variant="labelSmall">{rating3Count} ratings</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              progress={
                reviews.length > 0
                  ? rating2Count / reviews.length
                  : 0
              }
            />
          </View>
          <Text variant="labelSmall" style={{ fontWeight: "bold" }}>
            2.0
          </Text>
          <Text variant="labelSmall">{rating2Count} ratings</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <ProgressBar
              progress={
                reviews.length > 0
                  ? rating1Count / reviews.length
                  : 0
              }
            />
          </View>
          <Text variant="labelSmall" style={{ fontWeight: "bold" }}>
            1.0
          </Text>
          <Text variant="labelSmall">{rating1Count} ratings</Text>
        </View>
      </View>
    </View>
  );
}

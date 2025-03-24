import { Review } from "@/src/types/Review";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { Chip, Text } from "react-native-paper";
import ReviewsList from "./ReviewsList";

export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const [selectedRating, setSelectedRating] = useState<number | null>();
  const ratings = [5, 4, 3, 2, 1];
  const filteredReviews = useMemo(
    () => reviews.filter((review) => selectedRating === review.rating),
    [reviews, selectedRating],
  );

  return (
    <View style={{ paddingTop: 12 }}>
      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
        {ratings.map((rating) => (
          <Chip
            key={rating}
            selected={selectedRating === rating}
            style={{ flex: 1, borderWidth: 0 }}
            icon="star"
            mode={selectedRating === rating ? "flat" : "outlined"}
            onPress={() => {
              if (selectedRating === rating) {
                setSelectedRating(null);
                return;
              }
              setSelectedRating(rating);
            }}
          >
            {rating}
          </Chip>
        ))}
      </View>
      {reviews.length ? (
        <ReviewsList reviews={selectedRating ? filteredReviews : reviews} />
      ) : (
        <Text
          variant={"labelMedium"}
          style={{ textAlign: "center", marginVertical: 32 }}
        >
          This counselor haven't received any review
        </Text>
      )}
    </View>
  );
}

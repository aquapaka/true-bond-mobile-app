import { TruebondLightTheme } from "@/src/theme/theme";
import { Image, View } from "react-native";
import {
  Surface,
  Divider,
  Text,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import RatingOverview from "../../feedbacks/RatingOverview";
import ReviewsSection from "../../feedbacks/ReviewsSection";
import { Counselor } from "@/src/types/Counselor";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { reviewApi } from "@/src/api/reviewApi";
import { Review } from "@/src/types/Review";
import { showNotification } from "@/src/utils/notificationUtils";

export function CounselorDetailProfile({
  counselor,
}: {
  counselor: Counselor;
}) {
  const theme = useTheme();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!counselor.id) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const fetchedReviews = await reviewApi.getReviewsByCounselorId(
          counselor.id,
        );
        setReviews(fetchedReviews);
      } catch (error) {
        showNotification("error", "Failed to fetch reviews.", String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [counselor.id]);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );

  return (
    <Surface style={{ padding: 12, borderRadius: 12, gap: 16 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 3 }}>
          <Image
            source={{ uri: counselor?.profileImage }}
            style={{ backgroundColor: theme.colors.primary }}
          />
        </View>
        <View style={{ flex: 5, gap: 2 }}>
          <Text variant="titleLarge">Dr. {counselor.name}</Text>
          <Icon
            name="check-decagram-outline"
            size={20}
            color={TruebondLightTheme.colors.success}
          />
          <Text
            variant="labelSmall"
            style={{ color: theme.colors.primary, marginTop: 4 }}
          >
            {counselor.experienceYears} years of experience
          </Text>
          <Text variant="labelSmall">{counselor.expertise}</Text>
        </View>
      </View>

      <Divider />

      <View style={{ gap: 8 }}>
        {/*  */}
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Icon name="cash-check" size={20} />
          <Text variant="titleMedium">Price</Text>
        </View>
        <Text variant="bodyMedium">${counselor.sessionPrice} / Session</Text>

        <Divider />

        {/*  */}
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Icon name="account-circle" size={20} />
          <Text variant="titleMedium">Bio</Text>
        </View>
        <Text variant="bodyMedium">{counselor.bio}</Text>

        <Divider />

        {/*  */}
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Icon name="star-box" size={20} />
          <Text variant="titleMedium">Expertise</Text>
        </View>
        <Text variant="bodyMedium">
          {counselor.experienceYears} years in {counselor.expertise}
        </Text>
        <Text variant="bodyMedium">
          {counselor.experienceDetails
            ? counselor.experienceDetails
            : "No information"}
        </Text>

        <Divider />

        {/*  */}
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Icon name="school" size={20} />
          <Text variant="titleMedium">Education</Text>
        </View>
        <Text variant="bodyMedium">
          {counselor.educationDetails
            ? counselor.educationDetails
            : "No information"}
        </Text>

        <Divider />

        {/*  */}
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Icon name="certificate" size={20} />
          <Text variant="titleMedium">Certificate</Text>
        </View>
        <Image
          source={{ uri: counselor.certificateImageUrl }}
          style={{
            width: "100%",
            minHeight: 240,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />

        <Divider />

        {/*  */}
        <View style={{ flexDirection: "row", gap: 6 }}>
          <Icon name="star" size={20} />
          <Text variant="titleMedium">Reviews</Text>
        </View>
        <RatingOverview reviews={reviews} />
        <ReviewsSection reviews={reviews} />
      </View>
    </Surface>
  );
}

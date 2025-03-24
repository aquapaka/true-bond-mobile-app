import { View } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { TruebondLightTheme } from "../theme/theme";

export default function Rating({ rating }: { rating: number }) {
  const fullCount = Math.floor(rating);
  const hasHalf = fullCount < rating;

  if (rating > 5 || rating < 0) throw Error("Rating must be from 1 to 5");

  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      {[...Array(fullCount)].map((val, index) => (
        <Icon key={index} name="star" color={"yellow"} size={16} />
      ))}
      {hasHalf && <Icon name="star-half" color={"yellow"} size={16} />}
      {[...Array(hasHalf ? 5 - fullCount - 1 : 5 - fullCount)].map(
        (val, index) => (
          <Icon
            key={index}
            name="star-outline"
            color={TruebondLightTheme.colors.warning}
            size={16}
          />
        ),
      )}
    </View>
  );
}

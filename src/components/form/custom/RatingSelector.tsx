import { StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export const RatingSelector = ({
  value = 0,
  onChange,
}: {
  value?: number;
  onChange: (rating: number) => void;
}) => {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Icon
          key={star}
          name="star"
          size={32}
          onPress={() => onChange(star)}
          color
          ={star <= value ? "#FFD700" : "#C0C0C0"}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

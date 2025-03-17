import { Notifier } from "react-native-notifier";

type notificationType = "success" | "error" | "info";

export function showNotification(
  type: notificationType,
  title: string,
  description: string,
  onHidden?: () => void,
  onPress?: () => void
) {
  Notifier.showNotification({
    title: title,
    description: description,
    duration: 3000,
    showAnimationDuration: 500,
    onHidden: () => onHidden,
    onPress: () => onPress,
    componentProps: {
      titleStyle: {
        color: 'black'
      },
      containerStyle: {
        backgroundColor:
          type === "success"
            ? "#a7c957"
            : type === "error"
              ? "#fb6f92"
              : "#edddd4",
      },
    },
  });
}

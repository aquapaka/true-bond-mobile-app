import * as Clipboard from "expo-clipboard";
import { ReactNode } from "react";
import { TouchableOpacity } from "react-native";

export default function CopyWrapper({
  children,
  copyString,
}: {
  children: ReactNode;
  copyString: string;
}) {
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(copyString);
  };

  return (
    <TouchableOpacity onPress={() => copyToClipboard()}>
      {children}
    </TouchableOpacity>
  );
}

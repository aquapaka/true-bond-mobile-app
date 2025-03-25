import ClientHome from "@/src/components/tab-specific/home/client-home";
import CounselorHome from "@/src/components/tab-specific/home/counselor-home";
import { useAuth } from "@/src/context/AuthProvider";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen() {
  const { userData } = useAuth();

  return (
    <ScrollView>
      {userData?.role === "client" ? <ClientHome /> : <CounselorHome />}
    </ScrollView>
  );
}

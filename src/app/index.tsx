import { Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { images } from "../assets/images/images";
import HomeButton from "@/components/HomeButton";

export default function App() {
  const submit = () => {
    // TODO
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#3AC9D8]">
      <Image source={images.qr_icon} />
      <Text>Drone!</Text>
      <StatusBar style="auto" />
      <Link href="/qr_scan" style={{ color: "blue" }}>
        Login by QR-code
      </Link>
      <HomeButton title="Авторизоваться" handlePress={submit} />
    </View>
  );
}

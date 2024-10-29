import { Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { images } from "../assets/images/images";

export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image source={images.drone} />
      <Text>Drone!</Text>
      <StatusBar style="auto" />
      <Link href="/qr_scan" style={{ color: "blue" }}>
        Login by QR-code
      </Link>
    </View>
  );
}

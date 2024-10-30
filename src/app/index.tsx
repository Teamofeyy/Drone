import { Text, View, Image, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { images } from "../assets/images/images";
import HomeButton from "@/components/HomeButton";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  const handleNavigateToQrScan = async () => {
    if (!permission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) {
        Alert.alert(
          "Разрешение отклонено",
          "Для работы сканера нужно разрешить доступ к камере.",
          [{ text: "OK" }]
        );
        return;
      }
    }
    router.push("/qr_scan");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#3AC9D8]">
      <Image source={images.qr_icon} />
      <StatusBar style="auto" />
      <Link href="/qr_scan">Перейти к сканеру</Link>
      <HomeButton title="Авторизоваться" handlePress={handleNavigateToQrScan} />
    </View>
  );
}

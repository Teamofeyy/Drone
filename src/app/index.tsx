import { Text, View, Image, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useCameraPermissions } from "expo-camera";

import HomeButton from "../components/HomeButton";
import QrIcon from "../assets/svg/QrIcon";

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
    <View className="flex-1 justify-center items-center bg-accent px-6">
      <View className="flex-1 justify-center items-center">
        <QrIcon />
      </View>
      <Text className="text-center font-pmedium  text-white mb-8">
        Чтобы войти в приложение, отсканируйте qr-код на дроне.
      </Text>
      <StatusBar style="auto" />
      <HomeButton
        title="Авторизоваться"
        handlePress={handleNavigateToQrScan}
        containerStyles="w-[319px]  py-4 rounded-[8px] bg-white mb-[100px]"
        textStyles="font-psemibold text-xl"
      />
    </View>
  );
}

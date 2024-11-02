import { CameraView, CameraType } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

export default function QrScan() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const borderColor = useRef(new Animated.Value(0)).current;

  function toggleCameraFacing() {
    setFacing(facing === "back" ? "front" : "back");
  }

  function handleBarCodeScanned({ type, data }) {
    Animated.sequence([
      Animated.timing(borderColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(borderColor, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      router.push("/home");
      setScanned(false);
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scanned) {
        Toast.show({
          type: "error",
          text1: "QR-код не найден",
          text2: "Попробуйте снова.",
        });
      }
    }, 5000);

    return () => clearInterval(interval); // Очищаем таймер при размонтировании
  }, [scanned]);

  const interpolateBorderColor = borderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#3AC9D8", "#ffffff80"],
  });

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.border, { borderColor: interpolateBorderColor }]}
          />
        </View>
      </CameraView>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    width: 200,
    height: 200,
    borderWidth: 4,
    borderRadius: 10,
  },
});

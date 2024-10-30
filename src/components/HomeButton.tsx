import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import React from "react";

interface HomeButtonProps {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-white rounded-xl min-h-[58px] justify-center items-center ${containerStyles}`}
    >
      <Text className={`text-black ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HomeButton;

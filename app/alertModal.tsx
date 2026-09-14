import { CommonIcon, CommonText, TextButton } from "@kukkim/react-native-ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type AlertModalParams = {
  title: string;
  content: string;
  confirm?: string;
  enableCancel?: string;
};

export default function AlertModal() {
  const router = useRouter();
  const { title, content, confirm, enableCancel } =
    useLocalSearchParams<AlertModalParams>();

  return (
    <View className="flex-1 justify-center">
      <View className="bg-white rounded-lg border p-4 gap-2 min-w-[200px]">
        <View className="flex-row">
          <CommonText style={styles.titleText}>{title}</CommonText>
          <TouchableOpacity onPress={() => router.dismiss()}>
            <CommonIcon iconType="close" />
          </TouchableOpacity>
        </View>
        <View>
          <CommonText style={styles.contentText}>{content}</CommonText>
        </View>
        <View className="flex-1 justify-center">
          {confirm && <TextButton title={confirm} />}
          {enableCancel && (
            <TextButton title="취소" onPress={() => router.dismiss()} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: 20,
  },
  contentText: {
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: 12,
  },
});

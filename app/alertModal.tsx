import { CommonButton, CommonIcon } from "@/components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <View style={styles.flexDirectionRow}>
          <Text style={styles.titleText}>{title}</Text>
          <TouchableOpacity onPress={() => router.dismiss()}>
            <CommonIcon iconType="close" size={24} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.contentText}>{content}</Text>
        </View>
        <View style={styles.flexDirectionRow}>
          {confirm && <CommonButton title={confirm} />}
          {enableCancel && (
            <CommonButton title="취소" onPress={() => router.dismiss()} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    padding: 10,
    gap: 5,
    minWidth: 200,
  },
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

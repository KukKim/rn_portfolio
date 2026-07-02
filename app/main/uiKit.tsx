import {
  CommonCard,
  CommonHeader,
  ScrollViewContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function UIKit() {
  const router = useRouter();
  return (
    <ScrollViewContainer>
      <CommonHeader
        left={{
          title: "UI Kit",
        }}
      />
      <CommonCard title={"Components"}>
        <TextButton
          title={"Button"}
          onPress={() => router.navigate("/ui/button")}
        />
        <TextButton
          title={"Badge"}
          onPress={() => router.navigate("/ui/badge")}
        />
        <TextButton
          title={"Input"}
          onPress={() => router.navigate("/ui/input")}
        />
        <TextButton
          title={"Card"}
          onPress={() => router.navigate("/ui/card")}
        />
        <TextButton
          title={"ProgressBar"}
          onPress={() => router.navigate("/ui/progressBar")}
        />
        <TextButton
          title={"Checkbox"}
          onPress={() => router.navigate("/ui/checkbox")}
        />
        <TextButton
          title={"Spinner"}
          onPress={() => router.navigate("/ui/spinner")}
        />
        <TextButton
          title={"Switch"}
          onPress={() => router.navigate("/ui/switch")}
        />
        <TextButton
          title={"Rating"}
          onPress={() => router.navigate("/ui/rating")}
        />
        <TextButton
          title={"Select"}
          onPress={() => router.navigate("/ui/select")}
        />
        <TextButton
          title={"Slider"}
          onPress={() => router.navigate("/ui/slider")}
        />
      </CommonCard>
    </ScrollViewContainer>
  );
}

const styles = StyleSheet.create({});

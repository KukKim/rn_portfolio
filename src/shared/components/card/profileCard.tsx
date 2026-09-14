import { CommonAvatar, CommonText, useTheme } from "@kukkim/react-native-ui";
import { StyleSheet, View } from "react-native";
import { ProfileCardProps } from "./types";

const ProfileCard = ({
  children,
  type = "primary",
  email = "-",
  name = "-",
  profileUri,
  ...props
}: ProfileCardProps) => {
  const { theme } = useTheme();
  return (
    <View className="border m-2 p-3 rounded-lg">
      <View className="flex-row items-center gap-[5px]">
        <CommonAvatar size="l" source={{ uri: profileUri }} />
        <View>
          <CommonText style={styles.nameText} size="l">
            {name}
          </CommonText>
          <CommonText style={styles.emailText} size="s">
            {email}
          </CommonText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameText: {
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: 20,
  },
  emailText: {
    fontFamily: "Roboto",
    fontWeight: 600,
    fontSize: 12,
  },
});

export default ProfileCard;

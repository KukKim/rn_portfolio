import { CommonText, ProfileImage } from "@/components";
import { StyleSheet, View } from "react-native";
import { ProfileCardProps } from "./types";

const ProfileCard = ({
  children,
  type = "primary",
  email = "-",
  name = "-",
  photoUri,
  ...props
}: ProfileCardProps) => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.innerProfileContainer}>
        <ProfileImage />
        <View>
          <CommonText style={styles.nameText}>{name}</CommonText>
          <CommonText style={styles.emailText}>{email}</CommonText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    margin: 5,
    borderWidth: 1,
    padding: 5,
  },
  innerProfileContainer: {
    flexDirection: "row",
    gap: 5,
  },
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

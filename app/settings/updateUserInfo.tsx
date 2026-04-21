import {
  CommonButton,
  CommonHeader,
  CommonInput,
  ProfileImage,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { updateUserInfo } from "@/src/store/userInfoSlice";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UpdateUserInfoScreen() {
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [profileUri, setProfileUri] = useState(userInfo.profileUri);

  const onUpdateUserInfo = () => {
    dispatch(
      updateUserInfo({
        email: email,
        name: name,
        profileUri: profileUri,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="UpdateUserInfo" backable />
      <ProfileImage
        size="l"
        source={{
          uri: userInfo.profileUri,
        }}
      />
      <CommonInput
        title="profileUri"
        value={profileUri}
        onChangeText={setProfileUri}
      />
      <CommonInput title="name" value={name} onChangeText={setName} />
      <CommonInput title="email" value={email} onChangeText={setEmail} />
      <CommonButton title="update" onPress={onUpdateUserInfo} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { requestUpdateUserInfo } from "@/src/features/auth";
import { useNavigation } from "@/src/shared/hooks/navigation";
import { useAppDispatch, useAppSelector } from "@/src/shared/hooks/redux";
import { useTranslation } from "@/src/shared/hooks/translation";
import { updateUserInfo } from "@/src/store/userInfoSlice";
import {
  CommonAvatar,
  CommonHeader,
  CommonInput,
  SafeAreaContainer,
  TextButton,
} from "@kukkim/react-native-ui";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function UpdateUserInfoScreen() {
  const { t } = useTranslation();
  const { back } = useNavigation();
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [imgUri, setImgUri] = useState(userInfo.imgUri);

  const onUpdateUserInfo = () => {
    requestUpdateUserInfo(userInfo.id, imgUri, name, email).then(() => {
      dispatch(
        updateUserInfo({
          ...userInfo,
          email: email,
          name: name,
          imgUri: imgUri,
        }),
      );
    });
  };

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "UpdateUserInfo",
          icon: "back",
          onPress: back,
        }}
      />
      <CommonAvatar
        size="l"
        source={{
          uri: userInfo.imgUri,
        }}
      />
      <CommonInput
        title={t("common.profileImage")}
        value={imgUri}
        onChangeText={setImgUri}
      />
      <CommonInput
        title={t("common.name")}
        value={name}
        onChangeText={setName}
      />
      <CommonInput
        title={t("common.email")}
        value={email}
        onChangeText={setEmail}
      />
      <TextButton title={t("common.save")} onPress={onUpdateUserInfo} />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});

import { useNavigation } from "@/src/hooks/navigation";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
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
  const { back } = useNavigation();
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [imgUri, setImgUri] = useState(userInfo.imgUri);

  const onUpdateUserInfo = () => {
    dispatch(
      updateUserInfo({
        email: email,
        name: name,
        imgUri: imgUri,
      }),
    );
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
      <CommonInput title="imgUri" value={imgUri} onChangeText={setImgUri} />
      <CommonInput title="name" value={name} onChangeText={setName} />
      <CommonInput title="email" value={email} onChangeText={setEmail} />
      <TextButton title="update" onPress={onUpdateUserInfo} />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});

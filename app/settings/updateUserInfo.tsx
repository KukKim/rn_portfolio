import { requestUpdateUserInfo } from "@/src/features/auth";
import { requestUploadUrl } from "@/src/features/file";
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
import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, StyleSheet } from "react-native";

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.

    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Permission to access the media library is required.",
        );
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const asset = result.assets[0];
        const file = new File(asset.uri);
        requestUploadUrl(asset.fileName, asset.type).then((response) => {
          fetch(response.data.signedUrl, {
            method: "PUT",
            headers: {
              "Content-Type": asset.type,
            },
            body: file,
          }).then((result) => {
            // Handle successful upload
            setImgUri(result.url);
          });
        });
      }
    } catch (e) {
      console.log(e);
    }
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
          uri: imgUri,
        }}
      />
      <CommonInput
        title={t("common.profileImage")}
        value={imgUri}
        onChangeText={setImgUri}
      />
      <TextButton
        title={t("settings.profile.getImageFromLibrary")}
        onPress={pickImage}
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

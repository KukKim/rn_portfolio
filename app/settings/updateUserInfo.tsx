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
import { Alert, StyleSheet, View } from "react-native";

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
        await uploadImage(asset);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const takePhoto = async () => {
    // Camera access always requires the user's permission.
    // Taking a photo also requires a device with a camera. The iOS Simulator
    // does not have one, so use a physical device to test this button.
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the camera is required.",
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      await uploadImage(asset);
    }
  };

  const uploadImage = async (asset) => {
    const { uri, fileName, type } = asset;
    const file = new File(uri);
    const singnedUrlResponse = await requestUploadUrl(fileName, type);
    fetch(singnedUrlResponse.data.uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": type,
      },
      body: file,
    }).then(() => {
      // Handle successful upload
      setImgUri(singnedUrlResponse.data.imageUrl); // Update the image URI after successful upload
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CommonAvatar
          size="l"
          source={{
            uri: imgUri,
          }}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <CommonInput
            title={t("common.profileImage")}
            value={imgUri}
            onChangeText={setImgUri}
          />
          <TextButton
            title={t("settings.profile.takePhoto")}
            onPress={takePhoto}
          />
          <TextButton
            title={t("settings.profile.getImageFromLibrary")}
            onPress={pickImage}
          />
        </View>
      </View>
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

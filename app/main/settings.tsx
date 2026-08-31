import { ProfileCard } from "@/src/shared/components";
import { useAppDispatch, useAppSelector } from "@/src/shared/hooks/redux";
import { useTranslation } from "@/src/shared/hooks/translation";
import { deleteUserInfo } from "@/src/store/userInfoSlice";
import {
  CommonHeader,
  CommonText,
  SafeAreaContainer,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { useCallback, useMemo } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";

type SettingRoute =
  | "/settings/language"
  | "/settings/notification"
  | "/settings/theme";

interface SettingItem {
  label: string;
  route?: SettingRoute;
  onPress?: () => void;
}

export default function Settings() {
  const { t } = useTranslation();
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignOut = useCallback(() => {
    dispatch(deleteUserInfo());

    router.replace("/");
  }, [dispatch, router]);

  const settingItems = useMemo<SettingItem[]>(
    () => [
      {
        label: t("settings.language"),
        route: "/settings/language",
      },

      {
        label: t("settings.notification"),
        route: "/settings/notification",
      },

      {
        label: t("settings.theme.title"),
        route: "/settings/theme",
      },

      {
        label: t("auth.signOut"),
        onPress: handleSignOut,
      },
    ],

    [handleSignOut, t],
  );

  const handlePressItem = useCallback(
    (item: SettingItem) => {
      if (item.onPress) {
        item.onPress();

        return;
      }

      if (item.route) {
        router.navigate(item.route);
      }
    },

    [router],
  );

  const renderItem = useCallback(
    ({ item }: { item: SettingItem }) => (
      <Pressable
        onPress={() => handlePressItem(item)}
        style={styles.settingItem}
      >
        <CommonText style={styles.menuText}>{item.label}</CommonText>
      </Pressable>
    ),

    [handlePressItem],
  );

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: t("settings.title"),
        }}
      />
      <Pressable onPress={() => router.navigate("/settings/updateUserInfo")}>
        <ProfileCard
          email={userInfo.email}
          name={userInfo.name}
          photoUri={userInfo?.photoUri}
        />
      </Pressable>
      <FlatList
        keyExtractor={(item) => item.label}
        style={styles.settingList}
        data={settingItems}
        renderItem={renderItem}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  settingList: {
    flex: 1,
  },
  settingItem: {
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 10,
  },
  menuText: {
    fontFamily: "Roboto",
    fontWeight: 700,
    fontSize: 20,
  },
});

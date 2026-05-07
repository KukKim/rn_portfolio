import { CommonHeader } from "@/components";
import ProfileCard from "@/components/card/profileCard";
import { useAppDispatch, useAppSelector } from "@/src/hooks/redux";
import { deleteUserInfo } from "@/src/store/userInfoSlice";
import { useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const userInfo = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const settingItems = [
    {
      label: "language",
      route: "/settings/language",
    },
    {
      label: "notification",
      route: "/settings/notification",
    },
    {
      label: "Sign Out",
      function: () => {
        dispatch(deleteUserInfo());
        router.replace("/");
      },
    },
  ];
  const settingItem = ({ item }) => {
    return (
      <Pressable
        onPress={() =>
          item.function ? item.function() : router.navigate(item.route)
        }
        style={styles.settingItem}
      >
        <Text style={styles.menuText}>{item.label}</Text>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Settings" />
      <TouchableOpacity
        onPress={() => router.navigate("/settings/updateUserInfo")}
      >
        <ProfileCard
          email={userInfo.email}
          name={userInfo.name}
          photoUri={userInfo.photoUri}
        />
      </TouchableOpacity>
      <FlatList
        style={styles.settingList}
        data={settingItems}
        renderItem={settingItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    borderWidth: 1,
    padding: 5,
  },
  innerProfileContainer: {
    flexDirection: "row",
    gap: 5,
  },
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

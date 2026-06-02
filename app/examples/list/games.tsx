import {
  CommonHeader,
  CommonImage,
  CommonInput,
  CommonListView,
  CommonSpinner,
  CommonText,
  IconButton,
} from "@/components";
import { FoldableListItem } from "@/components/listItem";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GamesListScreen() {
  const router = useRouter();
  const [gameItems, setGameitems] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [listLoading, setListLoading] = useState<boolean>(false);

  useEffect(() => {
    setListLoading(true);
    fetchGames().then((items) => {
      setGameitems(items);
      setListLoading(false);
    });
  }, []);

  const fetchGames = async () => {
    return fetch(`http://127.0.0.1:3000/getgames`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        return json?.data;
      })
      .catch((error) => {
        throw error;
      });
  };

  const renderItem = ({ item }: any) => {
    const { name, cover } = item;
    return (
      <FoldableListItem title={name}>
        <CommonImage
          source={{
            uri: `https:${cover?.url}`,
          }}
          size="m"
        />
        <CommonText size={"s"} isInner={true}>
          {"description"}
        </CommonText>
      </FoldableListItem>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="Games" backable />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CommonInput value={searchText} onChangeText={setSearchText} />
        <IconButton
          iconType={"tune"}
          onPress={() => {
            router.push({
              pathname: "/examples/list/listControlModal",
              params: { title: "Test title", content: "Test content" },
            });
          }}
        />
      </View>
      <CommonListView
        refreshing={listLoading}
        data={gameItems}
        renderItem={renderItem}
        ListEmptyComponent={
          listLoading ? (
            <CommonSpinner />
          ) : (
            <CommonText>데이터가 없습니다.</CommonText>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

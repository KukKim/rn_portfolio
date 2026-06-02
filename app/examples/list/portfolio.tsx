import {
  CommonHeader,
  CommonInput,
  CommonListView,
  CommonSpinner,
  CommonText,
  IconButton,
} from "@/components";
import { FoldableListItem } from "@/components/listItem";
import { getCommonDateText } from "@/src/features/date";
import { fetchFirestoreData } from "@/src/features/firebase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PortfolioListScreen() {
  const router = useRouter();
  const [projectItems, setProjectItems] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [listLoading, setListLoading] = useState<boolean>(false);

  useEffect(() => {
    setListLoading(true);
    fetchFirestoreData().then((items) => {
      setProjectItems(items);
      setListLoading(false);
    });
  }, []);

  const renderItem = ({ item }: any) => {
    const { description, name, startDt, endDt } = item;
    return (
      <FoldableListItem title={name}>
        <CommonText size={"s"} isInner={true}>
          {description}
        </CommonText>
        <CommonText size={"s"} isInner={true}>
          {getCommonDateText(startDt) + " ~ " + getCommonDateText(endDt)}
        </CommonText>
      </FoldableListItem>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="List" backable />
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
        data={projectItems}
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

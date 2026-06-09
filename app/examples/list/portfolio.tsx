import {
  CommonHeader,
  CommonInput,
  CommonListView,
  CommonSpinner,
  CommonText,
  IconButton,
  SafeAreaContainer,
} from "@/components";
import { FoldableListItem } from "@/components/listItem";
import { getCommonDateText } from "@/src/features/date";
import { fetchFirestoreData } from "@/src/features/firebase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

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

  const fetchMore = () => {
    if (listLoading) return;
    setListLoading(true);
    setTimeout(() => {
      setListLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaContainer>
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
        ListFooterComponent={
          listLoading ? (
            <CommonSpinner />
          ) : projectItems.length === 0 ? (
            <CommonText>데이터가 없습니다.</CommonText>
          ) : null
        }
        onEndReached={fetchMore}
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({});

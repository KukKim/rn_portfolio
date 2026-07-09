import { getCommonDateText } from "@/src/features/date";
import { fetchFirestoreData } from "@/src/features/firebase";
import { useNavigation } from "@/src/shared/hooks/navigation";
import { Project } from "@/src/shared/types/project";
import {
  CommonButton,
  CommonHeader,
  CommonIcon,
  CommonInput,
  CommonList,
  CommonSpinner,
  CommonText,
  FoldableCard,
  SafeAreaContainer,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function PortfolioListScreen() {
  const { back } = useNavigation();
  const router = useRouter();
  const [projectItems, setProjectItems] = useState<Project[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [openedListItem, setOpenedListItem] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setListLoading(true);
        const items = await fetchFirestoreData();
        setProjectItems(items);
      } catch (error) {
        console.error(error);
      } finally {
        setListLoading(false);
      }
    };
    loadData();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Project }) => {
      const { description, name, startDt, endDt, id } = item;
      const isOpen = openedListItem.includes(id);

      return (
        <FoldableCard
          title={name}
          value={isOpen}
          onValueChange={(nextValue) => {
            setOpenedListItem((prev) =>
              nextValue
                ? [...prev, id]
                : prev.filter((openedId) => openedId !== id),
            );
          }}
        >
          <CommonText size="s" isInner>
            {description}
          </CommonText>
          <CommonText size="s" isInner>
            {`${getCommonDateText({ date: startDt })} ~ ${getCommonDateText({ date: endDt })}`}
          </CommonText>
        </FoldableCard>
      );
    },
    [openedListItem],
  );

  const fetchMore = () => {
    if (listLoading) return;
    setListLoading(true);
    setTimeout(() => {
      setListLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "List",
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
        <CommonInput value={searchText} onChangeText={setSearchText} />

        <CommonButton
          onPress={() => {
            router.push({
              pathname: "/examples/list/listControlModal",
              params: { title: "Test title", content: "Test content" },
            });
          }}
        >
          <CommonIcon iconType={"tune"} />
        </CommonButton>
      </View>
      <CommonList
        keyExtractor={(item) => item.id}
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

import { getCommonDateText } from "@/src/features/date";
import { useGames } from "@/src/hooks/fetch";
import { useNavigation } from "@/src/hooks/navigation";
import { Game } from "@/src/types/game";
import {
  CommonBadge,
  CommonButton,
  CommonHeader,
  CommonIcon,
  CommonImage,
  CommonInput,
  CommonList,
  CommonSpinner,
  CommonText,
  FoldableCard,
  SafeAreaContainer,
} from "@kukkim/react-native-ui";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function GamesListScreen() {
  const { back } = useNavigation();
  const router = useRouter();
  const { data: games, isLoading, isError, refetch } = useGames();
  const [searchText, setSearchText] = useState<string>("");
  const [openedListItem, setOpenedListItem] = useState<number[]>([]);

  const renderItem = ({ item }: { item: Game }) => {
    const {
      id,
      name,
      cover,
      // url,
      summary,
      created_at,
      updated_at,
      platforms,
      // age_rating,
      genres,
      // involved_companies,
      // release_dates,
      screenshots,
      // tags,
    } = item;
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
        <CommonImage
          source={{
            uri: `https:${cover?.url}`,
          }}
          size="l"
        />
        <View
          style={{
            marginVertical: 4,
            gap: 4,
            flexDirection: "row",
          }}
        >
          {genres?.map(({ name, id }) => {
            return <CommonBadge key={id} typeText={name} type="secondary" />;
          })}
        </View>
        <View
          style={{
            marginVertical: 4,
            gap: 2,
            flexDirection: "row",
          }}
        >
          {platforms?.map(({ name, id }) => {
            return <CommonBadge key={id} typeText={name} type="secondary" />;
          })}
        </View>
        <CommonText size={"s"} isInner={true}>
          {summary}
        </CommonText>
        <View style={styles.dateComponent}>
          {created_at && (
            <CommonText size={"s"} isInner={true}>
              {getCommonDateText(new Date(created_at * 1000))}
            </CommonText>
          )}
          {updated_at && (
            <CommonText size={"s"} isInner={true}>
              {getCommonDateText(new Date(updated_at * 1000))}
            </CommonText>
          )}
        </View>
      </FoldableCard>
    );
  };

  return (
    <SafeAreaContainer>
      <CommonHeader
        left={{
          title: "Games",
          icon: "back",
          onPress: back,
        }}
      />
      <View style={styles.flexDirectionRow}>
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
        refreshing={isLoading}
        data={games}
        renderItem={renderItem}
        ListEmptyComponent={
          isLoading ? (
            <CommonSpinner />
          ) : (
            <CommonText>데이터가 없습니다.</CommonText>
          )
        }
      />
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateComponent: {
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

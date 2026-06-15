import {
  CommonBadge,
  CommonHeader,
  CommonImage,
  CommonInput,
  CommonListView,
  CommonSpinner,
  CommonText,
  IconButton,
  SafeAreaContainer,
} from "@/components";
import { FoldableListItem } from "@/components/listItem";
import { getCommonDateText } from "@/src/features/date";
import { useGames } from "@/src/hooks/fetch";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function GamesListScreen() {
  const router = useRouter();
  const { data: games, isLoading, isError, refetch } = useGames();
  const [searchText, setSearchText] = useState<string>("");

  const renderItem = ({ item }: any) => {
    const {
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

    return (
      <FoldableListItem title={name}>
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
        <View
          style={{
            marginVertical: 4,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <CommonText size={"s"} isInner={true}>
            {getCommonDateText(new Date(created_at * 1000))}
          </CommonText>
          <CommonText size={"s"} isInner={true}>
            {getCommonDateText(new Date(updated_at * 1000))}
          </CommonText>
        </View>
      </FoldableListItem>
    );
  };

  return (
    <SafeAreaContainer>
      <CommonHeader leftTitle="Games" backable />
      <View style={styles.flexDirectionRow}>
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
});

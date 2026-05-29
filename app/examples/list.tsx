import { CommonHeader, CommonListView, CommonText } from "@/components";
import { FoldableListItem } from "@/components/listItem";
import { getCommonDateText } from "@/src/features/date";
import { fetchFirestoreData } from "@/src/features/firebase";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListScreen() {
  const [projectItems, setProjectItems] = useState<any[]>([]);

  useEffect(() => {
    fetchFirestoreData().then((items) => {
      setProjectItems(items);
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
          {getCommonDateText(startDt) + "~" + getCommonDateText(endDt)}
        </CommonText>
      </FoldableListItem>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader leftTitle="List" backable />
      <CommonListView data={projectItems} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

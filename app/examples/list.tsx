import { CommonHeader, CommonListView } from "@/components";
import { fetchFirestoreData } from "@/src/features/firebase";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListScreen() {
  const [projectItems, setProjectItems] = useState<any[]>([]);

  useEffect(() => {
    fetchFirestoreData().then((items) => {
      setProjectItems(items);
    });
  }, []);

  const renderItem = (item) => {
    return <View></View>;
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

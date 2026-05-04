import { FlatList, FlatListProps, StyleSheet } from "react-native";

const CommonListView = <ItemT,>(props: FlatListProps<ItemT>) => {
  return <FlatList style={styles.container} {...props} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CommonListView;

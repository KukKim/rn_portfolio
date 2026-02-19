import { FlatList, FlatListProps, StyleSheet } from "react-native";

const CommonListView = <ItemT,>(props: FlatListProps<ItemT>) => {
  return <FlatList style={styles.container} {...props} />;
};

const styles = StyleSheet.create({
  container: {
    width: "auto",
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
  },
});

export default CommonListView;

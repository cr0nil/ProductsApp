import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Product } from "../redux/product/Product.types";

const ProductItem = ({
  item,
  onPress,
}: {
  item: Product;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress} style={styles.row}>
    <Text style={styles.cell}>{item.name} </Text>
    <Text style={styles.cell}> {item.price} </Text>
    <Text style={styles.cell}>{item.category} </Text>
    <Text style={styles.cell}>
      {new Date(item.dateAdded).toLocaleDateString()}
    </Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  cell: { width: "25%" },
});
export default ProductItem;

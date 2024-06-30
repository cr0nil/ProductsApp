import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Category } from "../redux/product/Product.types";
import ProductItem from "../components/ProductItem";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useProducts } from "../hooks/useProducts";
import FilterItem from "../components/FilterItem";
import { ProductStackParamList, Route } from "../typs";
import { StackScreenProps } from "@react-navigation/stack";
const filterValues = [
  { label: "Name", value: "name" },
  { label: "Price", value: "price" },
  { label: "Category", value: "category" },
  { label: "Date Added", value: "dateAdded" },
];
const ProductScreen = (
  props: StackScreenProps<ProductStackParamList, Route.Product>
) => {
  const [value, setValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);

  const { products, filter, setFilterHandler } = useProducts(value);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <FilterItem
          label={Category.Clothing}
          onPress={setFilterHandler}
          isActive={filter.includes(Category.Clothing)}
        />
        <FilterItem
          label={Category.Electronics}
          onPress={setFilterHandler}
          isActive={filter.includes(Category.Electronics)}
        />
        <FilterItem
          label={Category.Food}
          onPress={setFilterHandler}
          isActive={filter.includes(Category.Food)}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text>Products</Text>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          containerStyle={{ width: 200 }}
          mode="modal"
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={filterValues}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Sort items" : "..."}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <MaterialIcons
              style={styles.icon}
              color={isFocus ? "blue" : "black"}
              name="sort"
              size={20}
            />
          )}
        />
      </View>
      <FlatList
        // ListHeaderComponent={} --- header with name, price, category, date added
        data={products}
        renderItem={({ item }) => (
          <ProductItem
            item={item}
            onPress={() =>
              props.navigation.navigate(Route.EditProduct, {
                idProduct: item.id!,
              })
            }
          />
        )}
        keyExtractor={(item) => item.id!.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 50,
    paddingHorizontal: 8,
    width: "15%",
    alignSelf: "flex-end",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  filterItem: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
  },
  filterItemSelected: {
    backgroundColor: "green",
  },
});

export default ProductScreen;

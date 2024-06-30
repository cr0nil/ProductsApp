import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Product } from "../redux/product/Product.types";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../redux/product";
import ProductForm from "../components/ProductForm";
import { productAddedSelector } from "../redux/product/Product.selector";
import { useNavigation } from "@react-navigation/native";
import { Route } from "../typs";

const AddProductScreen: React.FC = () => {
  // *todo export to cutsom hook etc similar useProducts
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const productAdded = useSelector(productAddedSelector);

  useEffect(() => {
    productAdded && navigation.navigate(Route.ProductStack);
  }, [productAdded]);

  const handleSubmit = (values: Product) => {
    dispatch(productActions.addProductRequest(values));
  };

  return (
    <View style={styles.container}>
      <ProductForm handleSubmitHandler={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default AddProductScreen;

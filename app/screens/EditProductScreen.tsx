import React, { useCallback, useEffect } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { Product } from "../redux/product/Product.types";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../redux/product";
import ProductForm from "../components/ProductForm";
import {
  productDetailsSelector,
  productRemovedSelector,
  productUpdatedSelector,
} from "../redux/product/Product.selector";
import { useNavigation } from "@react-navigation/native";
import { ProductStackParamList, Route } from "../typs";
import { StackScreenProps } from "@react-navigation/stack";

const EditProductScreen = (
  props: StackScreenProps<ProductStackParamList, Route.EditProduct>
) => {
  // *todo export to cutsom hook remove, update, read product etc similar useProducts
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const productDeatils = useSelector(productDetailsSelector);
  const productUpdated = useSelector(productUpdatedSelector);
  const productRemoved = useSelector(productRemovedSelector);

  useEffect(() => {
    dispatch(
      productActions.fetchProductDetailsRequest(props.route.params.idProduct)
    );
  }, []);

  useEffect(() => {
    productUpdated && navigation.goBack();
  }, [productUpdated]);

  useEffect(() => {
    productRemoved && navigation.goBack();
  }, [productRemoved]);

  const handleSubmit = (values: Product) => {
    dispatch(productActions.updateProductRequest(values));
  };
  const handleDelete = useCallback(() => {
    Alert.alert("Remove Product", "Are you sure to remove the product?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () =>
          dispatch(
            productActions.deleteProductRequest(props.route.params.idProduct)
          ),
      },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      {!!productDeatils && (
        <ProductForm
          handleSubmitHandler={handleSubmit}
          productValues={productDeatils}
        />
      )}
      <Button title="Delete" color={"red"} onPress={handleDelete} />
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

export default EditProductScreen;

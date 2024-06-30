import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import TextInputForm from "./TextInputForm";
import { Category, Product } from "../redux/product/Product.types";
import { Dropdown } from "react-native-element-dropdown";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface ProductFormProps {
  handleSubmitHandler: (values: Product) => void;
  productValues?: Product;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  price: Yup.number().required("Price is required"),
  category: Yup.string()
    .required("Category is required")
    .oneOf(Object.values(Category), "Invalid category"),
  dateAdded: Yup.date().required("Date added is required"),
});
const defaultValues: Product = {
  name: "",
  price: 0,
  category: Category.Electronics,
  dateAdded: new Date(),
};

const ProductForm = ({
  handleSubmitHandler,
  productValues,
}: ProductFormProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={productValues ?? defaultValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmitHandler}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          <TextInputForm
            placeholder="Product Name"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            touched={touched.name}
            error={errors.name}
          />

          <TextInputForm
            placeholder="Price"
            onChangeText={handleChange("price")}
            onBlur={handleBlur("price")}
            value={values.price?.toString()}
            keyboardType="numeric"
            touched={touched.price}
            error={errors.price}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            containerStyle={{ width: 200 }}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={[
              { label: Category.Clothing, value: Category.Clothing },
              { label: Category.Electronics, value: Category.Electronics },
              { label: Category.Food, value: Category.Food },
            ]}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Category" : "..."}
            value={values.category}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              handleChange("category")(item.value);
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <MaterialIcons
                style={styles.icon}
                color={isFocus ? "blue" : "black"}
                name="arrow-drop-down"
                size={20}
              />
            )}
          />

          <DateTimePicker
            value={new Date(values.dateAdded)}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || values.dateAdded;
              handleChange("dateAdded")(new Date(currentDate).toString());
            }}
            style={styles.dataPicker}
          />

          <Button title="Submit" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dataPicker: { alignSelf: "flex-start", marginBottom: 8 },
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
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 8,

    // width: "100%",
  },
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
export default ProductForm;

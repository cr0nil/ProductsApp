import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/auth";
import * as Yup from "yup";
import TextInputForm from "../components/TextInputForm";

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Name must be at least 4 characters"),
  password: Yup.string()
    .required("Username is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});
const defaultValues = {
  username: "",
  password: "",
};

const RegisterScreen = () => {
  // *todo types similart to edit and add product screen
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleFormSubmit = (values: { username: string; password: string }) => {
    dispatch(authActions.signUpRequest(values));
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={defaultValues}
        onSubmit={handleFormSubmit}
        validationSchema={validationSchema}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View>
            <TextInputForm
              placeholder="Email"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              touched={touched.username}
              error={errors.username}
            />
            <TextInputForm
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              touched={touched.password}
              error={errors.password}
              secureTextEntry={!showPassword}
              setShowPassword={setShowPassword}
              showPassword={showPassword}
            />

            <Button onPress={handleSubmit} title="Register" />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default RegisterScreen;

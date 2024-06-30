import Ionicons from "@expo/vector-icons/Ionicons";
import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface TextInputFormProps {
  error?: string | FormikErrors<any> | FormikErrors<any>[] | string[];
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[];
  showPassword?: boolean;
  setShowPassword?: (showPassword: boolean) => void;
}

const TextInputForm: React.FC<TextInputFormProps & TextInputProps> = ({
  error,
  touched,
  value,
  showPassword,
  setShowPassword,
  ...props
}) => {
  return (
    <View>
      <View style={styles.inputFrame}>
        <TextInput
          placeholder="Enter text"
          style={styles.input}
          value={value}
          {...props}
        />
        {setShowPassword !== undefined && (
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye"}
            size={20}
            onPress={() => setShowPassword(!showPassword)}
          />
        )}
      </View>

      {error && touched && <Text style={styles.error}>{error.toString()}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  inputFrame: {
    borderColor: "gray",
    borderWidth: 1,
    height: 40,
    marginBottom: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  input: {
    paddingHorizontal: 8,
    width: "90%",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});
export default TextInputForm;

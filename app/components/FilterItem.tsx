import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface FilterItemProps {
  label: string;
  onPress: (val: Category) => void;
  isActive: boolean;
}

const FilterItem: React.FC<FilterItemProps> = ({
  label,
  onPress,
  isActive,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(label)}
      style={[styles.container, isActive && styles.activeContainer]}>
      <Text style={[styles.label, isActive && styles.activeLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#EDEDED",
    marginRight: 8,
  },
  activeContainer: {
    backgroundColor: "#007AFF",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  activeLabel: {
    color: "#FFFFFF",
  },
});

export default FilterItem;

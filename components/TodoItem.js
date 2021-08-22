import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const TodoItem = ({ item, deleteTodo, completeTodo }) => {
  const [isCompleted, setIsCompleted] = useState(item.isCompleted);
  return (
    <View style={styles.item}>
      <Text
        style={[
          styles.itemText,
          isCompleted
            ? { textDecorationLine: "line-through" }
            : { textDecorationLine: "none" },
        ]}
      >
        {item.text}
      </Text>
      <View style={styles.iconContainer}>
        <BouncyCheckbox
          size={22}
          fillColor="dodgerblue"
          unfillColor="#fff"
          iconStyle={{ borderColor: "dodgerblue" }}
          isChecked={item.isCompleted}
          onPress={() => {
            setIsCompleted(!isCompleted);
            completeTodo(item.id);
          }}
        />
        <TouchableOpacity onPress={() => deleteTodo(item.id)}>
          <MaterialIcons name="delete" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    marginVertical: 10,
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
  },
  itemText: {
    flex: 3,
    fontSize: 16,
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default TodoItem;

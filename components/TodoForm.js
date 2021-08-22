import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity,TextInput, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TodoForm = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.length > 3) {
      addTodo(text);
      setText("");
    } else {
      Alert.alert("Oops!", "Todo must be atleast 3 letters", [
        { text: "Ok", onPress: () => console.log("Ok pressed") },
      ]);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add a todo..."
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
        <MaterialIcons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 40,
    marginHorizontal: 15,
  },
  input: {
    backgroundColor: "#fff",
    flex: 3,
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    height: 50,
  },
  btn: {
    backgroundColor: "dodgerblue",
    borderRadius: 50,
    width: 50,
    height: 50,
    padding: 10,
  },
});

export default TodoForm;

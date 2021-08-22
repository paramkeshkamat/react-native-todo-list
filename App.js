import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

export default function App() {
  const [todos, setTodos] = useState([
    { id: "1", text: "todo1", isCompleted: true },
    { id: "2", text: "todo2", isCompleted: false },
    { id: "3", text: "todo3", isCompleted: true },
    { id: "4", text: "todo4", isCompleted: false },
  ]);

  const addTodo = (text) => {
    setTodos([
      ...todos,
      { id: Date.now().toString(), text, isCompleted: false },
    ]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      } else {
        return todo;
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo List</Text>
      </View>
      <View style={styles.itemsContainer}>
        {todos.length === 0 ? (
          <Text style={styles.text}>No todos to display...</Text>
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            )}
          />
        )}
      </View>
      <View>
        <TodoForm addTodo={addTodo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    height: 100,
  },
  header: {
    backgroundColor: "dodgerblue",
    paddingVertical: 20,
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  headerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
  },
  itemsContainer: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 20,
  },
  text: {
    textAlign: "center",
    color: "gray",
    marginTop: 30,
    fontSize: 16,
  },
});

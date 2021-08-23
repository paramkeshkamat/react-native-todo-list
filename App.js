import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [todos, setTodos] = useState([]);

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

  useEffect(() => {
    const getTodosFromAsyncStorage = async () => {
      try {
        const data = await AsyncStorage.getItem("todos");
        if (!data) {
          setTodos([]);
        } else {
          setTodos(JSON.parse(data));
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getTodosFromAsyncStorage();
  }, []);

  useEffect(() => {
    const addTodosToAsyncStorage = async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
      } catch (err) {
        console.log(err.message);
      }
    };
    addTodoToAsyncStorage();
  }, [todos]);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Todo List</Text>
          </View>
          <View style={styles.itemsContainer}>
            {todos?.length > 0 ? (
              <FlatList
                data={todos}
                keyExtractor={(item) => item.id}
                style={styles.list}
                refreshControl={<RefreshControl}
                renderItem={({ item }) => (
                  <TodoItem
                    item={item}
                    deleteTodo={deleteTodo}
                    completeTodo={completeTodo}
                  />
                )}
              />
            ) : (
              <Text style={styles.text}>No todos to display...</Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.formContainer}>
        <TodoForm addTodo={addTodo} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    height: 100,
    position: "relative",
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
  },
  list: {
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  text: {
    textAlign: "center",
    color: "gray",
    marginTop: 30,
    fontSize: 16,
  },
  formContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#eee",
  },
});

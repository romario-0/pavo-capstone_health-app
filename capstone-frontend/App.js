import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "./components/header";
import TodoItem from "./components/todoItem";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "buy coffee", key: "1" },
    { text: "create an app", key: "2" },
    { text: "play on the switch", key: "3" },
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/*to form*/}
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    //justifyContent: "center",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});

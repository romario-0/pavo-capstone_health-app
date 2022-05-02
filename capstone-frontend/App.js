import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";

export default function App() {
  const [name, setName] = useState("Pooja");
  const [age, setAge] = useState("30");

  return (
    <View style={styles.container}>
      <Text>Enter Name:</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder="e.g.Mrie"
        onChangeText={(val) => setName(val)}
      />
      <Text>Enter Age:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="e.g.99"
        onChangeText={(val) => setAge(val)}
      />

      <Text>
        name: {name},age: {age}{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "Green",
    padding: 8,
    margin: 10,
    width: 200,
  },
});

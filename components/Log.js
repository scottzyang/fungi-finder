import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Log({ route }) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Log Details Page</Text>
      <Text style={styles.text}>Forage Name: {data.value.forageName}</Text>
      <Text style={styles.text}>Description: {data.value.journalEntry}</Text>
      <Text style={styles.text}>Total Found: {data.value.total}</Text>
      <Text style={styles.text}>Weather: {data.value.weatherConditions}</Text>
      <Text style={styles.text}>Date: {data.value.date}</Text>
      <Text style={styles.text}>Time: {data.value.time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5E3B5",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#006400", // Dark green color
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: "#000", // Black color
  },
});

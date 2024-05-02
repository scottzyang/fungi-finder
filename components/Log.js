import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function Log({ route }) {
  const { data } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Log Details</Text>
      </View>
      <View style={styles.logDetails}>
        <Text style={styles.detailLabel}>Forage Name:</Text>
        <Text style={styles.detailText}>{data.value.forageName}</Text>

        <Text style={styles.detailLabel}>Description:</Text>
        <Text style={styles.detailText}>{data.value.journalEntry}</Text>

        <Text style={styles.detailLabel}>Total Found:</Text>
        <Text style={styles.detailText}>{data.value.total}</Text>

        <Text style={styles.detailLabel}>Weather:</Text>
        <Text style={styles.detailText}>{data.value.weatherConditions}</Text>

        <Text style={styles.detailLabel}>Date:</Text>
        <Text style={styles.detailText}>{data.value.date}</Text>

        <Text style={styles.detailLabel}>Time:</Text>
        <Text style={styles.detailText}>{data.value.time}</Text>

        <View style={styles.coordinateSection}>
          <Text style={styles.coordinateLabel}>Coordinates</Text>
          <Text style={styles.coordinateText}>
            Latitude: {data.value.location.coords.latitude}
          </Text>
          <Text style={styles.coordinateText}>
            Longitude: {data.value.location.coords.longitude}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5E3B5",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#006400",
  },
  logDetails: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#000",
  },
  coordinateSection: {
    marginTop: 15,
    borderTopWidth: 1,
    paddingTop: 15,
    borderTopColor: "#ccc",
  },
  coordinateLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  coordinateText: {
    fontSize: 16,
    color: "#000",
  },
});

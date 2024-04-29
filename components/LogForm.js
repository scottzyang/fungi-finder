import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import uuid from "react-native-uuid";

export default function LogForm({ savingData, setSavingData }) {
  const [forageName, setForageName] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [total, setTotal] = useState("");
  const [weatherConditions, setWeatherConditions] = useState("");

  const saveFormData = async () => {
    // Verify that fields are filled
    if (
      forageName.trim() === "" ||
      journalEntry.trim() === "" ||
      total === "" ||
      weatherConditions.trim() === ""
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // get geolocation
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    console.log(location);

    // Generate uuid
    const entryId = uuid.v4();

    // Get current dates
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    // Input new data
    const newData = {
      id: entryId,
      forageName: forageName,
      journalEntry: journalEntry,
      total: total,
      weatherConditions: weatherConditions,
      date: formattedDate,
      time: formattedTime,
      location: location,
    };

    // Save to local storage
    try {
      await AsyncStorage.setItem(entryId, JSON.stringify(newData));
      setForageName("");
      setJournalEntry("");
      setTotal("");
      setWeatherConditions("");
      alert("Data saved successfully!");
      setSavingData(!savingData);
    } catch (error) {
      alert("Failed to save data. Please try again.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Forage Logging</Text>
      <Text style={styles.label}>What did you find?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter name of forage"
        value={forageName}
        onChangeText={(e) => setForageName(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Journal Entry"
        value={journalEntry}
        onChangeText={(e) => setJournalEntry(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Total Found"
        keyboardType="numeric"
        value={total}
        onChangeText={(e) => {
          // Allow only numeric input
          const numericValue = e.replace(/[^0-9]/g, "");
          // Set the state with the filtered numeric value
          setTotal(numericValue);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Weather Conditions"
        value={weatherConditions}
        onChangeText={(e) => setWeatherConditions(e)}
      />
      <TouchableOpacity style={styles.button} onPress={saveFormData}>
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: "#F5E3B5",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#A37F59",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

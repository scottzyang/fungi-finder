import { View } from "react-native";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export default function LogForm({ savingData, setSavingData }) {
  const [forageName, setForageName] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const [total, setTotal] = useState("");
  const [weatherConditions, setWeatherConditions] = useState("");

  const saveFormData = async () => {
    // verify that fields are filled
    if (
      forageName.trim() === "" ||
      journalEntry.trim() === "" ||
      total === "" ||
      weatherConditions.trim() === ""
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // generate uuid
    const entryId = uuid.v4();

    // get current dates
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    // input new data
    const newData = {
      id: entryId,
      forageName: forageName,
      journalEntry: journalEntry,
      total: total,
      weatherConditions: weatherConditions,
      date: formattedDate,
      time: formattedTime,
    };

    // save to local storage
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
    <SafeAreaView>
      <Text>Forage Logging</Text>
      <Text>What did you find?</Text>
      <TextInput
        placeholder="Enter name of forage"
        value={forageName}
        onChangeText={(e) => setForageName(e)}
      />
      <TextInput
        placeholder="Journal Entry"
        value={journalEntry}
        onChangeText={(e) => setJournalEntry(e)}
      />
      <TextInput
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
        placeholder="Weather Conditions"
        value={weatherConditions}
        onChangeText={(e) => setWeatherConditions(e)}
      />
      <TouchableOpacity onPress={saveFormData}>
        <Text>SAVE THIS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import uuid from "react-native-uuid";
import {
  selectForageName,
  selectJournalEntry,
  selectTotal,
  selectWeatherConditions,
  toggleSavingData,
  updateForageName,
  updateJournalEntry,
  updateTotal,
  updateWeatherConditions,
} from "../features/fungiSlice";

export default function LogForm() {
  const dispatch = useDispatch();
  const forageName = useSelector(selectForageName);
  const journalEntry = useSelector(selectJournalEntry);
  const total = useSelector(selectTotal);
  const weatherConditions = useSelector(selectWeatherConditions);

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
      dispatch(updateForageName(""));
      dispatch(updateJournalEntry(""));
      dispatch(updateTotal(""));
      dispatch(updateWeatherConditions(""));
      alert("Data saved successfully!");
      dispatch(toggleSavingData());
    } catch (error) {
      alert("Failed to save data. Please try again.");
      console.error(error);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>FungiFound</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>Forage Name</Text>
            <TextInput
              style={[styles.input, styles.inputBeige]}
              placeholder="Enter name of forage"
              value={forageName}
              onChangeText={(e) => dispatch(updateForageName(e))}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>Journal Entry</Text>
            <TextInput
              style={[
                styles.input,
                styles.inputBeige,
                styles.journalEntryInput,
              ]}
              placeholder="Journal Entry"
              multiline={true}
              numberOfLines={4} // Adjust as needed
              value={journalEntry}
              onChangeText={(e) => dispatch(updateJournalEntry(e))}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>Total Found</Text>
            <TextInput
              style={[styles.input, styles.inputBeige]}
              placeholder="Total Found"
              keyboardType="numeric"
              value={total}
              onChangeText={(e) => {
                // Allow only numeric input
                const numericValue = e.replace(/[^0-9]/g, "");
                // Set the state with the filtered numeric value
                console.log("This is the number:", numericValue);
                dispatch(updateTotal(numericValue));
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>Weather Conditions</Text>
            <TextInput
              style={[styles.input, styles.inputBeige]}
              placeholder="Weather Conditions"
              value={weatherConditions}
              onChangeText={(e) => dispatch(updateWeatherConditions(e))}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={saveFormData}>
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5E3B5", // Tan color
  },
  innerContainer: {
    width: "80%", // Adjust as needed
    backgroundColor: "#FFFFFF", // White color for the form background
    padding: 20,
    borderRadius: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputHeader: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    padding: 10,
  },
  inputBeige: {
    backgroundColor: "#F5F5DC", // Beige tint
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
  journalEntryInput: {
    height: 100, // Adjust as needed
    textAlignVertical: "top", // Align text to the top
  },
});

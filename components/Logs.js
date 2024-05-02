import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  selectParsedData,
  selectSavingData,
  updateParsedData,
} from "../features/fungiSlice";

export default function Logs({ navigation }) {
  const dispatch = useDispatch();
  const savingData = useSelector(selectSavingData);
  const parsedData = useSelector(selectParsedData);

  // Get all data from local storage
  useEffect(() => {
    const fetchDataKeys = async () => {
      try {
        // Retrieve all data
        const dataKeys = await AsyncStorage.getAllKeys();
        const data = await AsyncStorage.multiGet(dataKeys);

        // Process each key-value pair
        const parsedDataValues = data.map(([key, value]) => {
          // Parse the stringified value into an object
          const parsedValue = JSON.parse(value);
          return { key, value: parsedValue };
        });

        dispatch(updateParsedData(parsedDataValues));
      } catch (error) {
        // Handle error
        console.error("Error retrieving data:", error);
      }
    };

    fetchDataKeys();
  }, [savingData]); // Run once data is inputted

  // Clear all logs from AsyncStorage
  const clearAsyncStorage = async () => {
    const dataKeys = await AsyncStorage.getAllKeys();
    if (dataKeys.length === 0) {
      // Show alert if no logs found
      Alert.alert("No logs to be found.");
    } else {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to remove all logs?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              try {
                await AsyncStorage.clear();
                // Update parsedData to an empty array to trigger re-render
                dispatch(updateParsedData([]));
                // Show success alert
                Alert.alert("Logs cleared!");
              } catch (error) {
                console.error("Error clearing AsyncStorage.", error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to your Logs!!!</Text>
      <TouchableOpacity
        onPress={() => clearAsyncStorage()}
        style={styles.clearButton}
      >
        <Text style={styles.clearButtonText}>Clear Logs</Text>
      </TouchableOpacity>
      {parsedData.length > 0 ? (
        <FlatList
          data={parsedData}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Log", {
                  data: item,
                  index: index,
                })
              }
              style={styles.touchableItem}
            >
              <Text style={styles.logItem}>
                {index + 1}. {item.value.date}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key} // Use item as key
        />
      ) : (
        <Text style={styles.noDataText}>No data available</Text>
      )}
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
  },
  clearButton: {
    backgroundColor: "#A37F59",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  clearButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  touchableItem: {
    backgroundColor: "#E6CBAF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  logItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 16,
    marginTop: 20,
  },
});

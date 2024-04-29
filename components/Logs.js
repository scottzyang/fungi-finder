import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logs({ savingData, route, navigation }) {
  const [parsedData, setParsedData] = useState([]);

  // get all data from local storage
  useEffect(() => {
    const fetchDataKeys = async () => {
      try {
        // retrieve all data
        const dataKeys = await AsyncStorage.getAllKeys();
        const data = await AsyncStorage.multiGet(dataKeys);
        console.log("this is the data", data);

        // Process each key-value pair
        const parsedDataValues = data.map(([key, value]) => {
          // parse the stringified value into an object
          const parsedValue = JSON.parse(value);
          return { key, value: parsedValue };
        });

        console.log(parsedDataValues);
        setParsedData(parsedDataValues);
      } catch (error) {
        alert("Error retriving data. Please refresh the application.");
        console.error("Error retrieving data:", error);
      }
    };

    fetchDataKeys();
  }, [savingData]); // Run once data is inputted

  const clearAsyncStorage = async () => {
    const dataKeys = await AsyncStorage.getAllKeys();
    if (dataKeys.length === 0) {
      alert("No logs to be found.");
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
                console.log("AsyncStorage successfully cleared.");
                alert("Logs cleared!");
                // Update parsedData to an empty array to trigger re-render
                setParsedData([]);
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
    <View>
      <Text>Welcome to your Logs!!!</Text>
      <TouchableOpacity onPress={() => clearAsyncStorage()}>
        <Text>Clear Logs</Text>
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
            >
              <Text>
                {index + 1}. {item.value.date}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key} // Use item as key
        />
      ) : (
        <Text>No data available</Text>
      )}
    </View>
  );
}

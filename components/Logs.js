import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Logs() {
  const [dataKeys, setDataKeys] = useState([]);

  // get all data from local storage
  useEffect(() => {
    const fetchDataKeys = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        setDataKeys(keys);
      } catch (error) {
        alert("Error retriving data. Please refresh the application.");
        console.error("Error retrieving data:", error);
      }
    };

    fetchDataKeys();
  }, []); // Run once on component mount

  return (
    <View>
      <Text>Welcome to your Logs!!!</Text>
      <FlatList
        data={dataKeys}
        renderItem={({ item, index }) => (
          <Text>
            {index + 1}. {item}
          </Text>
        )}
        keyExtractor={(item) => item} // Use item as key
      />
    </View>
  );
}

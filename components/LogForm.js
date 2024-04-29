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

export default function LogForm() {
  const [text, setText] = useState("");
  const [getValue, setGetValue] = useState("");

  const saveValue = () => {
    if (text) {
      AsyncStorage.setItem("cat", text);
      setText("");
      alert("Data saved BRUH");
    } else {
      alert("Please input data. BRUH");
    }
  };
  const showValue = () => {
    AsyncStorage.getItem("cat").then((value) => setGetValue(value));
  };

  return (
    <SafeAreaView>
      <Text>Log Form for Mushrooms</Text>
      <TextInput
        placeholder="What did you find?"
        value={text}
        onChangeText={(e) => setText(e)}
      />
      <TouchableOpacity onPress={saveValue}>
        <Text>SAVE BRUH</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showValue}>
        <Text>SEE BRUH</Text>
      </TouchableOpacity>
      <Text>{getValue}</Text>
    </SafeAreaView>
  );
}

import { View, Text } from "react-native";

export default function Log() {
  const showValue = () => {
    AsyncStorage.getItem("cat").then((value) => setGetValue(value));
  };
  return (
    <View>
      <Text> Log Details Page</Text>
    </View>
  );
}

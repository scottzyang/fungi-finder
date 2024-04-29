import { View, Text } from "react-native";

export default function Log({ route }) {
  const { data } = route.params;

  const showValue = () => {
    AsyncStorage.getItem("cat").then((value) => setGetValue(value));
  };
  return (
    <View>
      <Text> Log Details Page</Text>
      <Text>Forage Name: {data.value.forageName}</Text>
      <Text>Description: {data.value.journalEntry}</Text>
      <Text>Total Found: {data.value.total}</Text>
      <Text>Weather: {data.value.weatherConditions}</Text>
      <Text>Date: {data.value.date}</Text>
      <Text>Time: {data.value.time}</Text>
    </View>
  );
}

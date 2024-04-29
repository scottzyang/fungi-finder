import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import Logs from "./components/Logs";
import LogForm from "./components/LogForm";
import Log from "./components/Log";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [savingData, setSavingData] = useState(false);

  const LogsStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Current Logs">
        {(props) => <Logs {...props} savingData={savingData} />}
      </Stack.Screen>
      <Stack.Screen name="Log" component={Log} />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="LogForm">
          {(props) => (
            <LogForm
              {...props}
              savingData={savingData}
              setSavingData={setSavingData}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Logs" component={LogsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

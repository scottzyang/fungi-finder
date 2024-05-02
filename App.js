import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./app/store";
import HomeScreen from "./components/HomeScreen";
import Logs from "./components/Logs";
import LogForm from "./components/LogForm";
import Log from "./components/Log";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const LogsStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Current Logs" component={Logs} />
      <Stack.Screen name="Log" component={Log} />
    </Stack.Navigator>
  );

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="FungiFound" component={LogForm} />
          <Tab.Screen name="Logs" component={LogsStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
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

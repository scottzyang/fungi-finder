import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "react-native-vector-icons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
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
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: "black" },
        tabBarStyle: { backgroundColor: "black" },
        headerTitleStyle: { color: "tan" },
      })}
    >
      <Stack.Screen name="Current Logs" component={Logs} />
      <Stack.Screen name="Log" component={Log} />
    </Stack.Navigator>
  );

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: "black" },
            tabBarStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "tan" },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused
                  ? "home" // Set focused icon
                  : "home-outline"; // Set the not focused icon
                return <Ionicons name={iconName} size={size} color={color} />;
              } else if (route.name === "FungiFound") {
                iconName = focused ? "gps-fixed" : "gps-not-fixed";
                return (
                  <MaterialIcons name={iconName} size={size} color={color} />
                );
              } else if (route.name === "Logs") {
                iconName = focused ? "clipboard-text" : "clipboard-outline";
                return (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={size}
                    color={color}
                  />
                );
              }
            },
            tabBarActiveTintColor: "olive", // Active/focussed color
            tabBarInactiveTintColor: "tan", // Inactive color
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="FungiFound" component={LogForm} />
          <Tab.Screen
            name="Logs"
            component={LogsStack}
            options={{ headerShown: false }}
          />
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

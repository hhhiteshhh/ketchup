import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import HomeScreen from "./Screens/HomeScreen";
import AddChatScreen from "./Screens/AddChatScreen";
import ChatScreen from "./Screens/ChatScreen";
const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {
    backgroundColor: "#c20000",
  },
  headerTitleStyle: { color: "#fff" },
  headerTintColor: "#fff",
};
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={globalScreenOptions} >
        <Stack.Screen name="SignIn to Ketchup" component={LoginScreen} />
        <Stack.Screen name="SignUp to Ketchup" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});

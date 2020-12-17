import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./src/screens/LandingScreen";

const Stack = createStackNavigator();
const MainAppScreens = () => {
  //changing default theme color
  const MyTheme = {
    dark: false,
    colors: {
      primary: "#9F9F9F",
      background: "#F6F7FA",
      card: "#F6F7FA",
      text: "rgb(28, 28, 30)",
      border: "#f8f8f8",
    },
  };
  //creating stack of screen and putting in navigation
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LocateME">
        <Stack.Screen name="LocateME" component={LandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainAppScreens;

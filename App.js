import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar"; // <-- Обязательный импорт!

import CurrentLocationScreen from "./src/screens/CurrentLocationScreen";
import CitySearchScreen from "./src/screens/CitySearchScreen";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Bold": require("./src/assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    /* БРОНЕБОЙНАЯ ОБЕРТКА: flex: 1 гарантирует, что экран не схлопнется в 0 пикселей */
    <View style={{ flex: 1 }}>
      {/* StatusBar вынесли наружу, он управляет системными иконками */}
      <StatusBar style="light" />

      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 14,
              fontFamily: "Montserrat-Bold",
              textTransform: "none",
            },
            tabBarActiveTintColor: "#ffffff",
            tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
            tabBarIndicatorStyle: {
              backgroundColor: "#ffffff",
              height: 3,
              borderRadius: 3,
            },

            tabBarStyle: {
              paddingTop: 50,
              backgroundColor: "transparent",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
          }}
        >
          <Tab.Screen
            name="Current"
            component={CurrentLocationScreen}
            options={{ tabBarLabel: "Моя локация" }}
          />
          <Tab.Screen
            name="Search"
            component={CitySearchScreen}
            options={{ tabBarLabel: "Поиск" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

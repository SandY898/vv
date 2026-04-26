import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Импортируем наши экраны
import CurrentLocationScreen from "./src/screens/CurrentLocationScreen";
import CitySearchScreen from "./src/screens/CitySearchScreen";

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarIndicatorStyle: { backgroundColor: "#4a90e2" },
          tabBarStyle: { paddingTop: 40, backgroundColor: "#f8f9fa" }, // paddingTop нужен для отступа от "челки" экрана
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
          options={{ tabBarLabel: "Поиск города" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

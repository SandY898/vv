import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getThemeByWeather } from "../utils/weatherHelpers";

export default function DynamicBackground({ condition, children }) {
  // Получаем настройки темы для текущей погоды
  const theme = getThemeByWeather(condition);

  return (
    <LinearGradient colors={theme.colors} style={styles.container}>
      {/* Если это солнечно, рисуем блик в углу экрана */}
      {theme.showGlare && <View style={styles.sunGlare} />}

      {/* Сюда будет подставляться остальной контент (наша погода) */}
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 110, // <-- ДОБАВИЛИ ЭТО! Отодвигаем контент вниз, чтобы он не залезал под прозрачное меню
  },
  sunGlare: {
    // ... тут оставляем как было
    position: "absolute",
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(255, 235, 59, 0.4)",
    shadowColor: "#FFF59D",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 60,
    elevation: 20,
  },
});

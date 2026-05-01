import React, { useRef, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";
import {
  getWeatherAnimation,
  getThemeByWeather,
} from "../utils/weatherHelpers";

export default function WeatherDisplay({ weather, loading, error }) {
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, [weather]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  if (error || !weather)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error || "Нет данных"}</Text>
      </View>
    );

  // Получаем цвет текста в зависимости от погоды
  const condition = weather.weather[0].main;
  const theme = getThemeByWeather(condition);
  const textColor = { color: theme.textColor };

  return (
    <View style={styles.weatherContainer}>
      <Text style={[styles.cityName, textColor]}>{weather.name}</Text>
      <Text style={[styles.description, textColor]}>
        {weather.weather[0].description}
      </Text>

      <View style={styles.lottieContainer}>
        <LottieView
          ref={animationRef}
          source={getWeatherAnimation(condition)}
          autoPlay={true}
          loop={true}
          style={{ width: 200, height: 200 }}
        />
      </View>

      <Text style={[styles.temp, textColor]}>
        {Math.round(weather.main.temp)}°C
      </Text>
      <Text style={[styles.details, textColor]}>
        Влажность: {weather.main.humidity}% | Ветер: {weather.wind.speed} м/с
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  weatherContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cityName: { fontSize: 32, fontFamily: "Montserrat-Bold" },
  description: {
    fontSize: 18,
    textTransform: "capitalize",
    marginTop: 5,
    fontFamily: "Montserrat-Regular",
  },
  lottieContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  temp: { fontSize: 64, fontFamily: "Montserrat-Bold" },
  details: { fontSize: 16, marginTop: 10, fontFamily: "Montserrat-Regular" },
  errorText: {
    fontSize: 18,
    color: "#ff4d4d",
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
  },
});

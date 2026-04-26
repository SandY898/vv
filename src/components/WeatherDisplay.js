import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import LottieView from "lottie-react-native";
import { getWeatherAnimation } from "../utils/weatherHelpers";

export default function WeatherDisplay({ weather, loading, error }) {
  // Обработка состояний загрузки и ошибки
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#4a90e2" style={styles.center} />
    );
  }
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }
  if (!weather) {
    return <Text style={styles.infoText}>Нет данных о погоде</Text>;
  }

  // Отрисовка данных, если они успешно получены
  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.cityName}>{weather.name}</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>

      <View style={styles.lottieContainer}>
        <LottieView
          source={getWeatherAnimation(weather.weather[0].main)}
          autoPlay = {true}
          loop = {true}
          style={styles.lottie}
        />
      </View>

      <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
      <Text style={styles.details}>
        Влажность: {weather.main.humidity}% | Ветер: {weather.wind.speed} м/с
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" },
  weatherContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cityName: { 
    fontSize: 32, 
    fontWeight: "bold", 
    color: "#333" 
  },
  description: {
    fontSize: 18,
    color: "#666",
    textTransform: "capitalize",
    marginTop: 5,
  },
  lottieContainer: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  lottie: { 
    width: "100%", 
    height: "100%" 
  },
  temp: { 
    fontSize: 64, 
    fontWeight: "bold", 
    color: "#4a90e2" 
  },
  details: { 
    fontSize: 16, 
    color: "#888", 
    marginTop: 10 },
  errorText: { 
    fontSize: 18, 
    color: "red", 
    textAlign: "center", 
    marginTop: 50 },
  infoText: { 
    fontSize: 18, 
    color: "#666", 
    textAlign: "center", 
    marginTop: 50 },
});

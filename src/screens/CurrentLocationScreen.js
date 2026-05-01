import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Location from "expo-location";
import WeatherDisplay from "../components/WeatherDisplay";
import { API_KEY } from "../utils/weatherHelpers";
import DynamicBackground from "../components/DynamicBackground";

export default function CurrentLocationScreen() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Запрашиваем разрешение на геолокацию
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Доступ к геолокации запрещен");
          setLoading(false);
          return;
        }

        // Получаем координаты
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Делаем запрос к API по координатам
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ru&appid=${API_KEY}`,
        );
        const data = await response.json();

        if (response.ok) {
          setWeather(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Ошибка при получении данных");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const condition = weather?.weather[0]?.main || "Clear";

  return (
    // 3. Оборачиваем весь экран в фон
    <DynamicBackground condition={condition}>
      <View style={styles.container}>
        <WeatherDisplay weather={weather} loading={loading} error={error} />
      </View>
    </DynamicBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1},
});

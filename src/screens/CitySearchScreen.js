import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
} from "react-native";
import WeatherDisplay from "../components/WeatherDisplay";
import { API_KEY } from "../utils/weatherHelpers";
import DynamicBackground from "../components/DynamicBackground";

export default function CitySearchScreen() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherByCity = async () => {
    if (!city.trim()) return; // Защита от пустого запроса
    setLoading(true);
    setError(null);
    Keyboard.dismiss(); // Прячем клавиатуру

    try {
      // Запрос к API по названию города
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${API_KEY}`,
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError("Город не найден");
        setWeather(null);
      }
    } catch (err) {
      setError("Ошибка сети");
    } finally {
      setLoading(false);
    }
  };

  const condition = weather?.weather[0]?.main || "Clear";

  return (
    // 3. Оборачиваем ВЕСЬ экран, включая поиск, в наш градиент
    <DynamicBackground condition={condition}>
      <View style={styles.container}>
        {/* Этот блок автоматически сдвинется вниз благодаря paddingTop: 110 в DynamicBackground */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Введите город..."
            value={city}
            onChangeText={setCity}
            onSubmitEditing={fetchWeatherByCity}
            placeholderTextColor="#888" // Делаем плейсхолдер читаемым
          />
          <TouchableOpacity style={styles.button} onPress={fetchWeatherByCity}>
            <Text style={styles.buttonText}>Поиск</Text>
          </TouchableOpacity>
        </View>

        <WeatherDisplay weather={weather} loading={loading} error={error} />
      </View>
    </DynamicBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20, // Немного улучшили отступы
    paddingBottom: 15, // чтобы гармонировало с фоном
    backgroundColor: "transparent", // Убрали лишние рамки
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    elevation: 5, // Тень для Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, // Тень для iOS
  },
  button: {
    marginLeft: 10,
    backgroundColor: "#4a90e2",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

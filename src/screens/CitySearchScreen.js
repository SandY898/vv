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

  return (
    <View style={styles.container}>
      {/* Блок поиска */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Введите название города..."
          value={city}
          onChangeText={setCity}
          onSubmitEditing={fetchWeatherByCity}
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeatherByCity}>
          <Text style={styles.buttonText}>Поиск</Text>
        </TouchableOpacity>
      </View>

      {/* Тот самый переиспользуемый компонент! */}
      <WeatherDisplay weather={weather} loading={loading} error={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#f1f1f1",
  },
  input: {
    flex: 1,
    height: 45,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
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

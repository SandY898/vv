// ВАЖНО: Напомните студентам вставить сюда их собственный ключ от OpenWeatherMap
export const API_KEY = "78f1151b6150a1628d5445f95232b722";

// Функция возвращает ссылку на Lottie-анимацию в зависимости от погоды
export const getWeatherAnimation = (mainCondition) => {
  switch (mainCondition) {
    case "Clear":
      return require("../assets/sun.json");
    case "Clouds":
      return require("../assets/clouds.json");
    case "Rain":
    case "Drizzle":
      return require("../assets/rain.json");
    case "Thunderstorm":
      return require("../assets/thunder.json");
    case "Snow":
      return require("../assets/snow.json");
    default:
      return require("../assets/sun.json");
  }
};
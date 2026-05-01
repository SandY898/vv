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

export const getThemeByWeather = (mainCondition) => {
  switch (mainCondition) {
    case "Clear":
      return {
        colors: ["#2980B9", "#6DD5FA"], // Яркое синее небо
        showGlare: true, // Включаем блик
        textColor: "#FFFFFF", // Белый текст
      };
    case "Clouds":
      return {
        colors: ["#757F9A", "#D7DDE8"], // Серое облачное небо
        showGlare: false,
        textColor: "#333333", // Темный текст
      };
    case "Rain":
    case "Drizzle":
      return {
        colors: ["#2b5876", "#4e4376"], // Темно-синий/фиолетовый (дождь)
        showGlare: false,
        textColor: "#FFFFFF",
      };
    case "Thunderstorm":
      return {
        colors: ["#141E30", "#243B55"], // Почти черное небо с грозой
        showGlare: false,
        textColor: "#FFFFFF",
      };
    case "Snow":
      return {
        colors: ["#E0EAFC", "#CFDEF3"], // Морозное бело-голубое небо
        showGlare: false,
        textColor: "#333333",
      };
    default:
      return {
        colors: ["#2980B9", "#6DD5FA"],
        showGlare: true,
        textColor: "#FFFFFF",
      };
  }
};
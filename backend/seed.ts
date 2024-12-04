import mongoose from "mongoose";
import Page from "./src/models/Page"; // Подключаем модель страниц
import dotenv from "dotenv";

dotenv.config(); // Загружаем переменные окружения из .env

// Подключаемся к базе данных
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

// Добавить новую страницу
const addPage = async () => {
  const newPage = new Page({
    title: "Welcome Page",
    content: "This is the content of the welcome page.",
  });
  await newPage.save(); // Сохраняем страницу
  console.log("Page added!");
};

// Получить список страниц
const getPages = async () => {
  const pages = await Page.find(); // Получаем все страницы
  console.log("Pages:", pages);    // Выводим их в консоль
};

// Основная функция
const run = async () => {
  await connectDB(); // Подключение к базе
  await addPage();   // Добавляем страницу
  await getPages();  // Получаем страницы
  mongoose.disconnect(); // Закрываем соединение с базой
};

run();
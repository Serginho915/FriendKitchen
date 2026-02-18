import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import menuRoutes from './routes/menu.routes.js';
import { initDatabase } from './config/database.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); // Разрешаем запросы с фронтенда
app.use(express.json()); // Парсинг JSON в теле запроса
app.use(express.urlencoded({ extended: true })); // Парсинг URL-encoded данных

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Маршруты
app.use('/api/menu', menuRoutes);

// Главная страница API
app.get('/', (req, res) => {
  res.json({
    message: 'FriendKitchen API',
    version: '1.0.0',
    endpoints: {
      menu: '/api/menu'
    }
  });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Инициализация базы данных и запуск сервера
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log(`API доступен на http://localhost:${PORT}/api/menu`);
  });
}).catch(err => {
  console.error('❌ Ошибка инициализации базы данных:', err);
  process.exit(1);
});


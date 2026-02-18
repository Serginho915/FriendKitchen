import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../database.db');

let db;

// Инициализация базы данных
const initDatabase = async () => {
  const SQL = await initSqlJs();
  
  // Проверяем, существует ли файл базы данных
  if (fs.existsSync(dbPath)) {
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  
  
  db.run(`
    CREATE TABLE IF NOT EXISTS menu (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      weight INTEGER NOT NULL,
      price REAL NOT NULL,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Check if category column exists, add it if not (simple migration)
  try {
    const result = db.exec("SELECT category FROM menu LIMIT 1");
  } catch (e) {
    console.log('Migrating database: adding category column');
    db.run("ALTER TABLE menu ADD COLUMN category TEXT");
  }
  
  saveDatabase();
  console.log('✅ База данных инициализирована');
};

// Сохранение базы данных в файл
const saveDatabase = () => {
  if (db) {
    try {
      const data = db.export();
      const buffer = Buffer.from(data);
      fs.writeFileSync(dbPath, buffer);
      console.log('Database saved to', dbPath);
    } catch (err) {
      console.error('Failed to save database:', err);
    }
  }
};

// Получить объект базы данных
const getDatabase = () => {
  if (!db) {
    throw new Error('База данных не инициализирована');
  }
  return db;
};

export { initDatabase, getDatabase, saveDatabase };

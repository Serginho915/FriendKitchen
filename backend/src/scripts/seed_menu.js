import { initDatabase } from '../config/database.js';
import MenuModel from '../models/menu.model.js';

const menuItems = [
  // САЛАТИ
  { name: 'Зелева салата', price: 1.50, category: 'САЛАТИ' },
  { name: 'Салата от кисело зеле', price: 1.50, category: 'САЛАТИ' },
  { name: 'Моркови по корейски', price: 1.50, category: 'САЛАТИ' },
  
  // СТУДЕНИ ЯСТИЯ / РАЗЯДКИ
  { name: 'Пастет от домашно пиле', price: 1.50, category: 'СТУДЕНИ ЯСТИЯ / РАЗЯДКИ' },
  { name: 'Люти чушки', price: 0.50, category: 'СТУДЕНИ ЯСТИЯ / РАЗЯДКИ' },

  // СУПИ
  { name: 'Боб чорба', price: 2.00, category: 'СУПИ' },
  { name: 'Борш', price: 2.50, category: 'СУПИ' },
  { name: 'Гъбена супа', price: 2.00, category: 'СУПИ' },
  { name: 'Зеленчукова супа', price: 2.00, category: 'СУПИ' },
  { name: 'Пилешка супа', price: 2.50, category: 'СУПИ' },
  { name: 'Рибена чорба', price: 2.50, category: 'СУПИ' },
  { name: 'Супа с топчета', price: 2.50, category: 'СУПИ' },

  // ОСНОВНИ ЯСТИЯ
  { name: 'Лазаня', price: 4.50, category: 'ОСНОВНИ ЯСТИЯ' },
  { name: 'Мусака', price: 4.50, category: 'ОСНОВНИ ЯСТИЯ' },
  { name: 'Ориз с гъби', price: 3.00, category: 'ОСНОВНИ ЯСТИЯ' },
  { name: 'Ориз със зеленчуци', price: 3.00, category: 'ОСНОВНИ ЯСТИЯ' },
  { name: 'Паста с сметана и пиле', price: 4.50, category: 'ОСНОВНИ ЯСТИЯ' },
  { name: 'Пелмени', price: 3.00, category: 'ОСНОВНИ ЯСТИЯ' },
  { name: 'Печен патладжан с моцарела', price: 3.00, category: 'ОСНОВНИ ЯСТИЯ' },
  { name: 'Печен патладжан с моцарела и месо', price: 4.50, category: 'ОСНОВНИ ЯСТИЯ' },
  { name: 'Пълнени чушки', price: 2.50, category: 'ОСНОВНИ ЯСТИЯ' }, // Note: One item had range, picking lower
  { name: 'Сарми с месо и ориз', price: 3.00, category: 'ОСНОВНИ ЯСТИЯ' },
  { name: 'Шакшука', price: 2.50, category: 'ОСНОВНИ ЯСТИЯ' },

  // МЕСО И РИБА
  { name: 'Бяла риба', price: 3.00, category: 'МЕСО И РИБА' },
  { name: 'Кавърма', price: 3.00, category: 'МЕСО И РИБА' },
  { name: 'Кебапче', price: 0.80, category: 'МЕСО И РИБА' },
  { name: 'Кюфтета с сос', price: 3.00, category: 'МЕСО И РИБА' },
  { name: 'Месо по френски', price: 3.00, category: 'МЕСО И РИБА' },
  { name: 'Пилешки бут', price: 3.00, category: 'МЕСО И РИБА' },
  { name: 'Пилешки крилца', price: 3.00, category: 'МЕСО И РИБА' },
  { name: 'Пилешки сърца', price: 3.00, category: 'МЕСО И РИБА' },
  { name: 'Пилешко кюфте', price: 3.00, category: 'МЕСО И РИБА' },
  { name: 'Пилешка пържола', price: 3.00, category: 'МЕСО И РИБА' },
  { name: 'Руло от бекон и пиле', price: 3.00, category: 'МЕСО И РИБА' },
  { name: 'Царско пилешко кюфте', price: 3.00, category: 'МЕСО И РИБА' },

  // ГАРНИТУРИ
  { name: 'Задушени зеленчуци', price: 2.50, category: 'ГАРНИТУРИ' },
  { name: 'Картофено пюре', price: 2.50, category: 'ГАРНИТУРИ' },
  { name: 'Картофи по селски', price: 2.50, category: 'ГАРНИТУРИ' },
  { name: 'Картофи с розмарин', price: 2.50, category: 'ГАРНИТУРИ' },

  // ДЕСЕРТИ
  { name: 'Вафлена торта', price: 1.50, category: 'ДЕСЕРТИ' },
  { name: 'Реване', price: 1.50, category: 'ДЕСЕРТИ' },
  { name: 'Френска селска торта', price: 2.00, category: 'ДЕСЕРТИ' },
  { name: 'Шоколадова торта', price: 3.00, category: 'ДЕСЕРТИ' }
];

const seed = async () => {
  console.log(' Начинаем заполнение базы данных...');
  
  try {
    await initDatabase();
    
    // Очищаем существующие записи (опционально, если нужно начать с чистого листа)
    // const db = getDatabase();
    // db.run('DELETE FROM menu');
    
    let count = 0;
    for (const item of menuItems) {
      // Вес пока ставим 0, как указано в задании
      MenuModel.create(item.name, 0, item.price, item.category);
      count++;
    }
    
    console.log(`✅ Успешно добавлено ${count} позиций в меню`);
  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
  }
};

seed();

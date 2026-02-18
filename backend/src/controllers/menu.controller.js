import MenuModel from '../models/menu.model.js';

class MenuController {
  // Получить все блюда
  static getAllItems(req, res) {
    try {
      const items = MenuModel.getAll();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Получить блюдо по ID
  static getItemById(req, res) {
    try {
      const { id } = req.params;
      const item = MenuModel.getById(id);
      
      if (!item) {
        return res.status(404).json({ error: 'Блюдо не найдено' });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Создать новое блюдо
  static createItem(req, res) {
    try {
      const { name, weight = 0, price, category } = req.body;
      
      if (!name || weight === undefined || !price) {
        return res.status(400).json({ error: 'Все поля обязательны' });
      }
      
      const id = MenuModel.create(name, weight, price, category);
      const newItem = MenuModel.getById(id);
      
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Обновить блюдо
  static updateItem(req, res) {
    try {
      const { id } = req.params;
      const { name, weight, price, category } = req.body;
      
      if (!name || weight === undefined || weight === null || !price) {
        return res.status(400).json({ error: 'Все поля обязательны' });
      }
      
      MenuModel.update(id, name, weight, price, category);
      
      const updatedItem = MenuModel.getById(id);
      
      if (!updatedItem) {
        return res.status(404).json({ error: 'Блюдо не найдено' });
      }
      
      res.json(updatedItem);
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Удалить блюдо
  static deleteItem(req, res) {
    try {
      const { id } = req.params;
      const changes = MenuModel.delete(id);
      
      if (changes === 0) {
        return res.status(404).json({ error: 'Блюдо не найдено' });
      }
      
      res.json({ message: 'Блюдо удалено' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default MenuController;

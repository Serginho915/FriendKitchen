import { getDatabase, saveDatabase } from '../config/database.js';

class MenuModel {
  // Получить все блюда
  static getAll() {
    const db = getDatabase();
    const result = db.exec('SELECT * FROM menu ORDER BY created_at DESC');
    
    if (result.length === 0) return [];
    
    const columns = result[0].columns;
    const values = result[0].values;
    
    return values.map(row => {
      const obj = {};
      columns.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });
  }

  // Получить блюдо по ID
  static getById(id) {
    const db = getDatabase();
    const result = db.exec('SELECT * FROM menu WHERE id = ?', [id]);
    
    if (result.length === 0) return null;
    
    const columns = result[0].columns;
    const values = result[0].values[0];
    
    if (!values) return null;
    
    const obj = {};
    columns.forEach((col, index) => {
      obj[col] = values[index];
    });
    return obj;
  }

  // Создать новое блюдо
  static create(name, weight, price, category) {
    const db = getDatabase();
    db.run('INSERT INTO menu (name, weight, price, category) VALUES (?, ?, ?, ?)', [name, weight, price, category]);
    
    // Получаем ID последней вставленной записи
    const result = db.exec('SELECT last_insert_rowid() as id');
    const id = result[0].values[0][0];
    
    saveDatabase();
    
    return id;
  }

  // Обновить блюдо
  static update(id, name, weight, price, category) {
    const db = getDatabase();
    db.run('UPDATE menu SET name = ?, weight = ?, price = ?, category = ? WHERE id = ?', [name, weight, price, category, Number(id)]);
    
    const changes = db.getRowsModified();
    saveDatabase();
    
    return changes;
  }

  // Удалить блюдо
  static delete(id) {
    const db = getDatabase();
    console.log('Deleting item with ID:', id);
    db.run('DELETE FROM menu WHERE id = ?', [id]);
    
    const changes = db.getRowsModified();
    console.log('Rows modified:', changes);
    
    saveDatabase();
    
    return changes;
  }
}

export default MenuModel;

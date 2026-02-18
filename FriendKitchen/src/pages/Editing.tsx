import { useState, useEffect } from 'react'
import DishForm from '../components/DishForm/DishForm';
import MenuList from '../components/MenuList/MenuList';

type Product = {
  id: number | string;
  name: string;
  weight: number;
  price: number;
  category?: string;
};

export const Editing = () => {
  const AVAILABLE_CATEGORIES = [
    'САЛАТИ',
    'СТУДЕНИ ЯСТИЯ / РАЗЯДКИ',
    'СУПИ',
    'ОСНОВНИ ЯСТИЯ',
    'МЕСО И РИБА',
    'ГАРНИТУРИ',
    'ДЕСЕРТИ'
  ];

  const [menuItems, setMenuItems] = useState<Product[]>([])

  // Состояние для редактирования
  const [editingId, setEditingId] = useState<number | string | null>(null)
  const [editFormData, setEditFormData] = useState<Product | null>(null)

  const fetchMenu = () => {
    return fetch('http://localhost:3000/api/menu')
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .catch(err => console.error('Error fetching menu:', err));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Начало редактирования (inline)
  const handleEditClick = (item: Product) => {
    setEditingId(item.id);
    setEditFormData({ ...item });
  };

  // Изменение полей при редактировании
  const handleEditChange = (field: keyof Product, value: string | number) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value });
    }
  };

  // Сохранение изменений (inline) via PUT
  const handleSaveEdit = async () => {
    if (!editFormData) return;

    try {
      const { id, name, weight, price, category } = editFormData;

      const response = await fetch(`http://localhost:3000/api/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, weight: Number(weight), price: Number(price), category }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      await fetchMenu(); // Перезагружаем список

      setEditingId(null);
      setEditFormData(null);
    } catch (error) {
      console.error('Error updating dish:', error);
      alert('Не удалось обновить блюдо. Проверьте консоль.');
    }
  };

  // Отмена редактирования
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  // Удаление блюда
  const handleDeleteItem = async (id: number | string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/menu/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      await fetchMenu();

      if (editingId === id) {
        handleCancelEdit();
      }
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  }

  return (
    <div className="contentContainer">
      <DishForm
        onDishAdded={fetchMenu}
        availableCategories={AVAILABLE_CATEGORIES}
      />

      <MenuList
        items={menuItems}
        editingId={editingId}
        editFormData={editFormData}
        availableCategories={AVAILABLE_CATEGORIES}
        onEditClick={handleEditClick}
        onEditChange={handleEditChange}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
        onDelete={handleDeleteItem}
      />
    </div>
  );
};

export default Editing;

import express from 'express';
import MenuController from '../controllers/menu.controller.js';

const router = express.Router();

// GET /api/menu - Получить все блюда
router.get('/', MenuController.getAllItems);

// GET /api/menu/:id - Получить блюдо по ID
router.get('/:id', MenuController.getItemById);

// POST /api/menu - Создать новое блюдо
router.post('/', MenuController.createItem);

// PUT /api/menu/:id - Обновить блюдо
router.put('/:id', MenuController.updateItem);

// DELETE /api/menu/:id - Удалить блюдо
router.delete('/:id', MenuController.deleteItem);

export default router;

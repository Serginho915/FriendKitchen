import { initDatabase } from '../config/database.js';
import MenuModel from '../models/menu.model.js';

const test = async () => {
    await initDatabase();
    const lastId = 44; // From previous curl
    console.log(`Testing getById(${lastId})`);
    const item = MenuModel.getById(lastId);
    console.log('Result:', item);
};

test();

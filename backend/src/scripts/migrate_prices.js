import { initDatabase, getDatabase, saveDatabase } from '../config/database.js';

const migrate = async () => {
    console.log('🔄 Migrating prices to numbers...');
    await initDatabase();
    const db = getDatabase();

    const items = db.exec("SELECT id, price FROM menu");
    
    if (items.length === 0 || !items[0].values) {
        console.log('No items to migrate.');
        return;
    }

    const rows = items[0].values;
    let count = 0;

    for (const row of rows) {
        const id = row[0];
        const price = row[1];

        if (typeof price === 'string' && price.includes('€')) {
            const newPrice = parseFloat(price.replace('€', '').replace(',', '.').trim());
            
            // Handle split prices like "2.50€ / 3.50€" - take the first one or just keep it simple
            // For "2.50€ / 3.50€", newPrice via parseFloat will be 2.5
            
            if (!isNaN(newPrice)) {
                 db.run('UPDATE menu SET price = ? WHERE id = ?', [newPrice, id]);
                 count++;
            }
        }
    }
    
    saveDatabase();
    console.log(`✅ Migrated ${count} items.`);
};

migrate();

const fs = require('fs');

try {
  const data = fs.readFileSync('menu_debug.json', 'utf8');
  const items = JSON.parse(data);
  
  console.log('Total items:', items.length);
  
  items.forEach(item => {
    const p = Number(item.price);
    if (isNaN(p)) {
      console.log(`❌ NaN price found for item id ${item.id} (${item.name}):`, item.price, 'Type:', typeof item.price);
    } else {
      // consoles.log(`✅ OK: ${item.price} -> ${p}`);
    }
  });
  console.log('Check complete.');
} catch (err) {
  console.error('Error:', err);
}

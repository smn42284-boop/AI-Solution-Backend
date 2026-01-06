const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

console.log('🔧 Fixing SQLite setup...');

const dbPath = path.join(__dirname, 'database.db');

// Check if database file exists
if (fs.existsSync(dbPath)) {
  console.log('✅ Database file exists:', dbPath);
  
  // Test connection
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Cannot open database:', err.message);
      console.log('💡 Trying to create new database...');
      createNewDatabase();
    } else {
      console.log('✅ Database connection successful');
      db.close();
    }
  });
} else {
  console.log('📁 Creating new database file...');
  createNewDatabase();
}

function createNewDatabase() {
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Cannot create database:', err.message);
    } else {
      console.log('✅ New database created:', dbPath);
      db.close();
    }
  });
}

console.log('\n🎯 Next steps:');
console.log('1. Start server: npm run dev');
console.log('2. Test admin login: http://localhost:5001');
console.log('3. Use credentials: admin / admin123');
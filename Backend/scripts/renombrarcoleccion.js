// backend/scripts/renameCollection.js
const mongoose = require('mongoose');
require('dotenv').config();

async function renameCollection() {
  try {
    await mongoose.connect("mongodb+srv://softwaremuregro_db_user:Museo130387@cluster0.dsqawqk.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0");
    const db = mongoose.connection.db;

    const oldName = 'piezas';
    const newName = 'controlinternos';

    const collections = await db.listCollections().toArray();
    const exists = collections.some(col => col.name === oldName);

    if (!exists) {
      console.log(`❌ La colección "${oldName}" no existe.`);
      return;
    }

    await db.renameCollection(oldName, newName);
    console.log(`✅ Colección renombrada de "${oldName}" a "${newName}".`);
  } catch (error) {
    console.error('Error al renombrar la colección:', error);
  } finally {
    mongoose.disconnect();
  }
}

renameCollection();

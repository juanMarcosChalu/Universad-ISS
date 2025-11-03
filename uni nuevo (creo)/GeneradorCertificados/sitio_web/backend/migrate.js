// migrate.js
const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
  const sql = fs.readFileSync('./uni.sql', 'utf8');

  // Conexión sin DB seleccionada (porque uni.sql contiene CREATE DATABASE; y necesita multipleStatements)
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  try {
    console.log('Ejecutando migraciones...');
    await connection.query(sql);
    console.log('Migraciones aplicadas correctamente.');
  } catch (err) {
    console.error('Error durante migración:', err);
  } finally {
    await connection.end();
  }
}

migrate();

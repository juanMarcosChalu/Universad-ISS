import express from 'express';
import pool from '../db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// GET /api/certificado?busqueda=algo
router.get('/', async (req, res) => {
  const { busqueda } = req.query;

  if (!busqueda) {
    return res.status(400).json({ error: 'Falta el parámetro de búsqueda.' });
  }

  try {
    // Buscar por DNI exacto o nombre parcial
    const [rows] = await pool.query(`
      SELECT 
        a.ID AS alumnoID,
        a.Nombre,
        a.Apellido,
        a.DNI,
        a.Email,
        c.Nombre AS Carrera
      FROM Alumno a
      JOIN Carrera c ON a.CarreraID = c.ID
      WHERE a.DNI = ? OR CONCAT(a.Nombre, ' ', a.Apellido) LIKE ?
    `, [busqueda, `%${busqueda}%`]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado.' });
    }

    // Devolvemos la lista completa si hay varios
    res.json(rows);
  } catch (error) {
    console.error('Error buscando alumnos:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// POST /api/certificado
router.post('/', async (req, res) => {
  const { alumnoID } = req.body;

  if (!alumnoID) {
    return res.status(400).json({ error: 'Falta el ID del alumno.' });
  }

  try {
    // Obtener datos del alumno
    const [rows] = await pool.query(`
      SELECT 
        a.ID AS alumnoID,
        a.Nombre,
        a.Apellido,
        a.DNI,
        a.Email,
        c.Nombre AS Carrera
      FROM Alumno a
      JOIN Carrera c ON a.CarreraID = c.ID
      WHERE a.ID = ?
      LIMIT 1
    `, [alumnoID]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Alumno no encontrado.' });
    }

    const alumno = rows[0];

    // Generar certificado
    const fechaEmision = new Date();
    const codigoVerificacion = uuidv4();
    const generadoPor = 'Sistema';

    await pool.query(`
      INSERT INTO CertificadoAlumnoRegular (AlumnoID, FechaEmision, CodigoVerificacion, GeneradoPor)
      VALUES (?, ?, ?, ?)
    `, [alumno.alumnoID, fechaEmision, codigoVerificacion, generadoPor]);

res.json({
  alumnoID: alumno.alumnoID, // agregar esto
  nombre: `${alumno.Nombre} ${alumno.Apellido}`,
  dni: alumno.DNI,
  email: alumno.Email,
  carrera: alumno.Carrera,
  codigoVerificacion,
  fechaEmision
});

  } catch (error) {
    console.error('Error generando certificado:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;

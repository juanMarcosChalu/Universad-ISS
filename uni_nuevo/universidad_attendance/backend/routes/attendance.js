const express = require('express');
const router = express.Router();
const db = require('../db'); // ahora es mysql2/promise pool

// POST /api/asistencia/tomar
router.post('/asistencia/tomar', async (req, res) => {
  const { materiaId, fecha, registradoPor, metodo='manual', items } = req.body;
  if (!items || !Array.isArray(items)) return res.status(400).json({ error: 'items required' });

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const [insClase] = await conn.execute(
      'INSERT INTO clase (MateriaID, ProfesorID, Fecha, Tema) VALUES (?, NULL, ?, NULL)',
      [materiaId, fecha]
    );
    const claseId = insClase.insertId;

    for (const it of items) {
      // normalizar estado a 1/0 según esquema (Presente tinyint)
      const presente = (it.estado === 'P' || it.estado === 'PRESENTE' || it.presente === true || it.presente === 1) ? 1 : 0;
      await conn.execute(
        'INSERT INTO asistencia (AlumnoID, ClaseID, Presente) VALUES (?, ?, ?)',
        [it.alumnoId, claseId, presente]
      );
    }

    await conn.commit();
    res.json({ ok: true, claseId, insertedCount: items.length });
  } catch (e) {
    await conn.rollback();
    console.error(e);
    res.status(500).json({ error: e.message });
  } finally {
    conn.release();
  }
});

// GET /api/asistencia/historial
router.get('/asistencia/historial', async (req, res) => {
  const { materiaId, alumnoId, from, to } = req.query;
  let sql = `SELECT asis.ID as asistenciaId, al.Nombre as alumnoNombre, al.Apellido as alumnoApellido,
    m.Nombre as materiaNombre, c.Fecha as fechaClase, asis.Presente
    FROM asistencia asis
    JOIN alumno al ON al.ID = asis.AlumnoID
    JOIN clase c ON c.ID = asis.ClaseID
    JOIN materia m ON m.ID = c.MateriaID
    WHERE 1=1`;
  const params = [];
  if (materiaId) { sql += ' AND m.ID = ?'; params.push(materiaId); }
  if (alumnoId) { sql += ' AND al.ID = ?'; params.push(alumnoId); }
  if (from) { sql += ' AND c.Fecha >= ?'; params.push(from); }
  if (to) { sql += ' AND c.Fecha <= ?'; params.push(to); }
  sql += ' ORDER BY c.Fecha DESC LIMIT 1000';

  try {
    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// GET report: /api/reportes/alumno/:id
router.get('/reportes/alumno/:id', async (req, res) => {
  const alumnoId = req.params.id;
  try {
    const [totalRows] = await db.execute('SELECT COUNT(*) as c FROM asistencia WHERE AlumnoID = ?', [alumnoId]);
    const total = totalRows[0].c || 0;
    const [presRows] = await db.execute("SELECT COUNT(*) as c FROM asistencia WHERE AlumnoID = ? AND Presente = 1", [alumnoId]);
    const presentes = presRows[0].c || 0;
    const pct = total ? Math.round((presentes / total) * 10000) / 100 : 0;
    res.json({ alumnoId, total, presentes, porcentaje: pct });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

// GET /api/profesor/:id/materias
router.get('/profesor/:id/materias', async (req, res) => {
  const profesorId = req.params.id;

  try {
    const [rows] = await db.execute(
      `SELECT m.ID, m.Nombre, m.Anio
       FROM materia m
       JOIN clase c ON c.MateriaID = m.ID
       WHERE c.ProfesorID = ? 
       GROUP BY m.ID, m.Nombre, m.Anio`,
      [profesorId]
    );
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});


module.exports = router;

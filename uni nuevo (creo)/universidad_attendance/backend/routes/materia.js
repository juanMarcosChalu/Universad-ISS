const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/materias  -- devuelve todas las materias
router.get('/materias', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM Materia');
        res.json(rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// GET /api/materia/:id/alumnos
router.get('/materia/:id/alumnos', async (req, res) => {
    try {
        const materiaId = req.params.id;
        const [matRows] = await db.execute('SELECT * FROM Materia WHERE ID = ?', [materiaId]);
        if (!matRows || matRows.length === 0) return res.status(404).json({ error: 'Materia no encontrada' });
        const materia = matRows[0];
        const [alumnos] = await db.execute('SELECT * FROM Alumno WHERE CarreraID = ?', [materia.CarreraID]);
        res.json({ materia, alumnos });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

// GET /api/materia/:id/horarios
router.get('/materia/:id/horarios', async (req, res) => {
    try {
        const materiaId = req.params.id;
        const [rows] = await db.execute('SELECT * FROM Horario WHERE MateriaID = ?', [materiaId]);
        res.json(rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;

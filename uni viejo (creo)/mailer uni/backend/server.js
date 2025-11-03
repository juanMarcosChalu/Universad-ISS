// server.js
const express = require('express');
const pool = require('./db'); // tu pool de MySQL
const PDFDocument = require('pdfkit'); // si lo vas a usar después
const qrcode = require('qrcode'); // si lo vas a usar después
const crypto = require('crypto'); // si lo vas a usar después
require('dotenv').config();

// 🔹 Nuevas dependencias para el envío de PDF
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fs = require('fs');

// Configuración inicial
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const upload = multer({ dest: 'uploads/' });

// --- Configurar transporte de Gmail ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ NUEVO ENDPOINT: recibir PDF y enviarlo al mail del alumno
app.post('/enviar-pdf', upload.single('pdf'), async (req, res) => {
  try {
    const { alumnoId } = req.body;
    const pdfPath = req.file.path;

    // Buscar el email del alumno
    const [rows] = await pool.query('SELECT Email FROM Alumno WHERE ID = ?', [alumnoId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Alumno no encontrado' });
    }

    const emailAlumno = rows[0].Email;

    // Enviar correo con PDF adjunto
    await transporter.sendMail({
      from: `"Instituto Superior" <${process.env.EMAIL_USER}>`,
      to: emailAlumno,
      subject: 'Constancia de alumno regular',
      text: 'Adjuntamos tu certificado en formato PDF.',
      attachments: [
        {
          filename: 'certificado.pdf',
          path: pdfPath,
        },
      ],
    });

    fs.unlinkSync(pdfPath); // elimina el archivo temporal

    res.json({ message: `Correo enviado correctamente a ${emailAlumno}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el correo', error });
  }
});

// 🔹 Endpoint: Listar todos los alumnos
app.get('/alumnos', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, c.Nombre AS Carrera 
       FROM Alumno a 
       LEFT JOIN Carrera c ON a.CarreraID = c.ID`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener alumnos' });
  }
});

// 🔹 Endpoint: Crear alumno con validación básica
app.post('/alumnos', async (req, res) => {
  try {
    const {
      Nombre, Apellido, DNI, FechaNacimiento,
      Email, Telefono, Direccion, Ciudad,
      FechaIngreso, CarreraID
    } = req.body;

    if (!Nombre || !Apellido || !DNI || !FechaNacimiento || !Email || !CarreraID) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const [result] = await pool.query(
      `INSERT INTO Alumno 
       (Nombre, Apellido, DNI, FechaNacimiento, Email, Telefono, Direccion, Ciudad, FechaIngreso, CarreraID)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [Nombre, Apellido, DNI, FechaNacimiento, Email, Telefono, Direccion, Ciudad, FechaIngreso, CarreraID]
    );

    res.status(201).json({ 
      message: 'Alumno creado correctamente',
      insertId: result.insertId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear alumno' });
  }
});

// 🔹 Endpoint: Identificar tipo de input
app.post('/identificar', async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Falta el parámetro input' });
  }

  function identificarTipo(input) {
    const valor = input.trim();
    if (valor.includes('@') && valor.includes('.')) return 'email';
    if (/^\d+$/.test(valor)) return 'dni';
    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) return 'nombre';
    return 'desconocido';
  }

  const tipo = identificarTipo(input);
  const columna = tipo === 'email' ? 'Email' : tipo === 'dni' ? 'DNI' : 'Nombre';

  try {
    const [rows] = await pool.query(`SELECT * FROM Alumno WHERE ${columna} = ?`, [input]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No se encontró ningún alumno' });
    }

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al buscar alumno' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API escuchando en http://localhost:${PORT}`);
});


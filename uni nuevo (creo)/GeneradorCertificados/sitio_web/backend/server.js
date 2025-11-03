// server.js
import express from 'express';
import pool from './db.js';
import certificadoRoutes from './routes/certificados.js';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import nodemailer from 'nodemailer';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*', // o 'http://localhost:5173' si querés restringir al frontend
  methods: ['GET', 'POST'],
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas existentes...
app.get('/alumnos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, c.Nombre AS Carrera 
      FROM Alumno a 
      LEFT JOIN Carrera c ON a.CarreraID = c.ID
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener alumnos' });
  }
});

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

    res.status(201).json({ message: 'Alumno creado correctamente', insertId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear alumno' });
  }
});


// Configuración de multer (para archivos temporales)
const upload = multer({ dest: 'uploads/' });

// Configuración de transporte de Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // tu mail
    pass: process.env.EMAIL_PASS, // contraseña de app o token
  },
});

// Endpoint para enviar PDF
app.post('/enviar-pdf', upload.single('pdf'), async (req, res) => {
  const { alumnoID } = req.body; // ojo, que sea mismo nombre que envías desde frontend
  const pdfPath = req.file.path;

  // Buscar email del alumno
  const [rows] = await pool.query('SELECT Email FROM Alumno WHERE ID = ?', [alumnoID]);
  if (rows.length === 0) {
    fs.unlinkSync(pdfPath);
    return res.status(404).json({ error: 'Alumno no encontrado' });
  }

  const emailAlumno = rows[0].Email;

  await transporter.sendMail({
    from: `"Instituto Superior" <${process.env.EMAIL_USER}>`,
    to: emailAlumno,
    subject: 'Constancia de alumno regular Instituto Superior Del Sudeste',
    text: 'Hola! Desde el Instituto Superior Del Sudeste: Adjuntamos tu certificado de alumno regular solicitado. Se encuentra en formato PDF. Ante cualquier duda, contacta a la institución.',
    attachments: [{ filename: 'certificado.pdf', path: pdfPath }],
  });

  fs.unlinkSync(pdfPath);
  res.json({ message: `Correo enviado correctamente a ${emailAlumno}` });
});



// 🔹 Usar ruta nueva de certificados
app.use('/api/certificado', certificadoRoutes);

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});

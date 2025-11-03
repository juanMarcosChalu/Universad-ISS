# Universidad Attendance - Minimal Fullstack Project

Este proyecto es una implementación mínima del sistema de asistencia universitario solicitado.

**Estructura**
- backend/  - API en Node.js + Express usando SQLite (fácil de correr localmente)
- frontend/ - App React (create-react-app minimal-like) que consume la API
- db/init.sql - Esquema SQL (adaptado de tu script)

**Requisitos**
- Node.js >= 14
- npm

**Instalación y ejecución (local)**

1. Backend
```bash
cd backend
npm install
npm run init-db      # crea la base SQLite y la popula con datos de ejemplo
npm start
```
API correrá en `http://localhost:3001`

2. Frontend
```bash
cd frontend
npm install
npm start
```
La app abrirá en `http://localhost:3000` y consumirá la API en `http://localhost:3001`.

**Notas**
- El backend usa SQLite para facilitar pruebas locales; la carpeta `backend/data` contendrá `universidad.db`.
- He incluido tu esquema SQL en `db/init.sql`. Para producción / MySQL, reemplaza la conexión y las migraciones.
- Este repo es una base: endpoints principales implementados: `/api/materias`, `/api/materia/:id/alumnos`, `/api/asistencia/tomar`, `/api/asistencia/historial`, `/api/reportes/alumno/:id`.


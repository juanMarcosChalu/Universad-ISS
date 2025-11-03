import React from 'react';
import Dashboard from './pages/Dashboard';
import TakeAttendance from './pages/TakeAttendance';
import './App.css';

export default function App() {
  const [page, setPage] = React.useState('dashboard');
  const [materia, setMateria] = React.useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Universidad - Asistencia</h1>
        <nav>
          <button onClick={() => {setPage('dashboard')}}>Dashboard</button>
          <button onClick={() => {setPage('reports')}}>Reportes</button>
        </nav>
      </header>
      <main>
        {page === 'dashboard' && <Dashboard onTake={(m)=>{ setMateria(m); setPage('take'); }} />}
        {page === 'take' && materia && <TakeAttendance materia={materia} onBack={() => setPage('dashboard')} />}
        {page === 'reports' && <div><h2>Reportes (simple)</h2><p>Ir a historial/API para más.</p></div>}
      </main>
    </div>
  );
}

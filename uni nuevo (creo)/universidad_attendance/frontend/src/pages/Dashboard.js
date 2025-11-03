import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard({ onTake }) {
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cambia el puerto 5000 por el de tu backend si es distinto
    axios
      .get('http://localhost:5000/api/profesor/1/materias')
      .then((res) => {
        setMaterias(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar las materias');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando materias...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Materias</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {materias.map((m) => (
          <div
            key={m.ID}
            style={{
              border: '1px solid #ddd',
              padding: 12,
              width: 260,
              borderRadius: 8,
            }}
          >
            <h3>{m.Nombre}</h3>
            <p>Año: {m.Anio}</p>
            <button onClick={() => onTake(m)}>Tomar asistencia</button>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AttendanceRow from '../components/AttendanceRow';

export default function TakeAttendance({materia, onBack}) {
  const [alumnos, setAlumnos] = useState([]);
  const [items, setItems] = useState({});
  useEffect(()=> {
    axios.get(`http://localhost:3000/api/materia/${materia.ID}/alumnos`).then(r=>{
      setAlumnos(r.data.alumnos);
      const map = {};
      r.data.alumnos.forEach(a => { map[a.ID] = {estado:'A', alumnoId: a.ID}; });
      setItems(map);
    }).catch(e=>console.error(e));
  },[materia]);

  const setEstado = (alumnoId, estado) => {
    setItems(prev => ({...prev, [alumnoId]: {...prev[alumnoId], estado}}));
  };

  const submit = async () => {
    const payload = {
      materiaId: materia.ID,
      fecha: new Date().toISOString(),
      registradoPor: 'profesor@uni.edu',
      metodo: 'manual',
      items: Object.values(items)
    };
    try {
      const r = await axios.post('http://localhost:3001/api/asistencia/tomar', payload);
      alert('Asistencia guardada: ' + JSON.stringify(r.data));
      onBack();
    } catch (e) {
      console.error(e);
      alert('Error guardando');
    }
  };

  return (
    <div>
      <button onClick={onBack}>← Volver</button>
      <h2>Tomar asistencia — {materia.Nombre}</h2>
      <div>
        {alumnos.map(a => (
          <AttendanceRow key={a.ID} alumno={a} value={items[a.ID] && items[a.ID].estado} onChange={setEstado} />
        ))}
      </div>
      <div style={{marginTop:12}}>
        <button onClick={submit}>Guardar asistencia</button>
      </div>
    </div>
  );
}

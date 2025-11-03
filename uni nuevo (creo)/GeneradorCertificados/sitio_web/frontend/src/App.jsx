import React, { useState } from "react";
import BarraBusqueda from "./components/BarraBusqueda";
import VistaPreviaCertificado from "./components/VistaPreviaCertificado";
import BotonesAccion from "./components/BotonesAccion";
import imagenInstituto from "./assets/media/imagenInstituto.jpeg";
import "./App.css";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [error, setError] = useState("");

  const buscarAlumno = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/certificado?busqueda=${encodeURIComponent(busqueda)}`);

      if (!res.ok) {
        const errorData = await res.json();
        setAlumnos([]);
        setAlumnoSeleccionado(null);
        setError(errorData.error || "Alumno no encontrado");
        return;
      }

      const resultados = await res.json();
      setAlumnos(resultados);
      setAlumnoSeleccionado(null);
      setError("");
    } catch (error) {
      console.error("Error al buscar alumno:", error);
      setAlumnos([]);
      setAlumnoSeleccionado(null);
      setError("Error al buscar alumno");
    }
  };

  const generarCertificado = async (alumnoID) => {
    try {
      const res = await fetch("http://localhost:3000/api/certificado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alumnoID })
      });

      if (!res.ok) {
        const errorData = await res.json();
        setAlumnoSeleccionado(null);
        setError(errorData.error || "No se pudo generar el certificado");
        return;
      }

      const alumno = await res.json();
      setAlumnoSeleccionado(alumno);
      setAlumnos([]);
      setError("");
    } catch (error) {
      console.error("Error generando certificado:", error);
      setAlumnoSeleccionado(null);
      setError("Error generando certificado");
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${imagenInstituto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "140vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "50px"
      }}
    >
      <header className="titulo">
        <h1>Instituto Superior Del Sudeste</h1>
        <h3>Certificado de Alumno Regular</h3>
      </header>

      <main className="contenido-principal">
        <BarraBusqueda
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          buscarAlumno={buscarAlumno}
        />

        {error && <p className="error">{error}</p>}

        {alumnos.length > 0 && (
          <div className="lista-alumnos">
            <p>Se encontraron los siguientes alumnos, selecciona uno:</p>
            <ul>
              {alumnos.map(a => (
                <li key={a.alumnoID}>
                  <button onClick={() => generarCertificado(a.alumnoID)}>
                    {a.Nombre} {a.Apellido} - {a.DNI} ({a.Carrera})
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {alumnoSeleccionado && (
          <div className="resultado-contenedor">
            <BotonesAccion alumno={alumnoSeleccionado} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { validarYLimpiarTexto } from "../utils/validations.js";

const BarraBusqueda = ({ busqueda, setBusqueda, buscarAlumno }) => {
  const [error, setError] = useState("");

  const manejarCambio = (e) => {
    const { textoLimpio, error } = validarYLimpiarTexto(e.target.value);
    setBusqueda(textoLimpio);
    setError(error);
  };

  const manejarEnter = (e) => {
    if (e.key === "Enter") buscarAlumno();
  };

  return (
    <div className="barra-busqueda">
      <input
        type="text"
        placeholder="Buscar por nombre o DNI"
        value={busqueda}
        onChange={manejarCambio}
        onKeyDown={manejarEnter}
        maxLength={50}
      />
      <button onClick={buscarAlumno}>Buscar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default BarraBusqueda;

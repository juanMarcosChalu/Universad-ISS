// src/components/VistaPreviaCertificado.jsx
import React from "react";
import Certificado from "./Certificado";

const VistaPreviaCertificado = ({ alumno }) => {
  if (!alumno) return null;

  return (
    <div
      style={{
        background: "#f0f0f0",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Certificado alumno={alumno} />
    </div>
  );
};

export default VistaPreviaCertificado;

// ...existing code...
import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Certificado from "./Certificado";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BotonesAccion = ({ alumno }) => {
  const certificadoRef = useRef();

  // Espera que todas las imágenes carguen
  const waitImagesLoaded = (el) => {
    const imgs = Array.from(el.querySelectorAll("img"));
    return Promise.all(
      imgs.map(img => img.complete ? Promise.resolve() : new Promise(res => {
        img.onload = res;
        img.onerror = res;
      }))
    );
  };

  const generarPdfHorizontal = async () => {
    const element = certificadoRef.current;
    if (!element) throw new Error("No se encontró el certificado");

    await waitImagesLoaded(element);

    // Medidas reales del elemento para evitar recortes/escala que provoca superposición
    const rect = element.getBoundingClientRect();
    const width = Math.ceil(rect.width);
    const height = Math.ceil(rect.height);

    // Capturar con html2canvas con width/height explícitos y onclone para forzar fondo blanco
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      width,
      height,
      windowWidth: Math.max(document.documentElement.clientWidth, width),
      windowHeight: Math.max(document.documentElement.clientHeight, height),
      scrollX: -window.scrollX,
      scrollY: -window.scrollY,
      onclone: (doc) => {
        doc.body.style.background = "#ffffff";
        doc.body.style.margin = "0";
        const cloned = doc.getElementById("certificado-root");
        if (cloned) {
          cloned.style.background = "#ffffff";
        }
      },
    });

    const imgData = canvas.toDataURL("image/png");

    // Crear PDF con tamaño exactamente igual al canvas (evita reescalados y superposiciones)
    const canvasW = canvas.width;
    const canvasH = canvas.height;

    const pdf = new jsPDF({
      unit: "px",
      format: [canvasW, canvasH],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvasW, canvasH);
    return pdf;
  };

  const manejarDescarga = async () => {
    try {
      const pdf = await generarPdfHorizontal();
      pdf.save("certificado_alumno_regular.pdf");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const manejarEnvioEmail = async () => {
    try {
      if (!alumno?.alumnoID) throw new Error("Falta el ID del alumno");

      const pdf = await generarPdfHorizontal();
      const pdfBlob = await pdf.output("blob");

      const formData = new FormData();
      formData.append("pdf", pdfBlob, "certificado.pdf");
      formData.append("alumnoID", alumno.alumnoID);

      const res = await fetch("http://localhost:3000/enviar-pdf", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error enviando correo");

      toast.success(data.message || "Correo enviado correctamente");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error enviando PDF");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Quitar padding aquí para que las dimensiones coincidan exactamente con Certificado */}
      <div ref={certificadoRef} style={{ background: "#fff", padding: 0, display: "inline-block" }}>
        <Certificado alumno={alumno} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={manejarEnvioEmail} style={{ marginRight: "10px" }}>Enviar por Gmail</button>
        <button onClick={manejarDescarga}>Descargar PDF</button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BotonesAccion;
// ...existing code...
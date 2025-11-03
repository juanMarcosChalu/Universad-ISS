// codigo de validación de barra de busqueda

const LIMITE_CARACTERES = 50;

// Permitir solo letras, números y espacios (incluye tildes y ñ)
const REGEX_VALIDO = /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]*$/;

/**
 * Limpia el texto eliminando caracteres inválidos
 * y aplica reglas de validación
 * @param {string} texto
 * @returns {{ textoLimpio: string, error: string }}
 */
export const validarYLimpiarTexto = (texto) => {
  let textoLimpio = texto;
  let error = "";

  if (texto.length > LIMITE_CARACTERES) {
    textoLimpio = texto.slice(0, LIMITE_CARACTERES);
    error = `Máximo ${LIMITE_CARACTERES} caracteres.`;
  }

  if (!REGEX_VALIDO.test(textoLimpio)) {
    textoLimpio = textoLimpio.replace(/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]/g, "");
    error = "Caracteres inválidos. Solo letras, números y espacios.";
  }

  return { textoLimpio, error };
};

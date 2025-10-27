function identificarTipo(input) {
    const valor = input.trim();

    // Verificar si es email
    if (valor.includes('@') && valor.includes('.')) {
        return 'email';
    }

    // Verificar si es DNI (solo números)
    if (/^\d+$/.test(valor)) {
        return 'dni';
    }

    // Verificar si es nombre (solo letras y espacios)
    if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
        return 'nombre';
    }

    // Si no cumple ninguna regla
    return 'desconocido';
}

// Ejemplos:
console.log(identificarTipo('carlos@example.com')); // "email"
console.log(identificarTipo('44556677'));           // "dni"
console.log(identificarTipo('Carlos Lopez'));       // "nombre"
console.log(identificarTipo('123abc'));             // "desconocido"

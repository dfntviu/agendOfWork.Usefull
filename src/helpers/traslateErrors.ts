    /**
     * Traducciones desde el management of DB de Supabase al Castellano
     */
export function errorsTranslate(error: any): string {
    const msg = error?.message || '';

    if (msg.includes('events_check')) {
        return 'La hora de Fin debe ser posterior a la de Inicio';
    }

    if (msg.includes('null value') && msg.includes('not-null')) {
        return 'Faltan campos por completar';
    }
    if (msg.includes('row level security') && msg.includes('violates')) {
        return 'NO tienes PERMISOS para revisar la acción';
    }
    // Cachar error de ingreso al Equipo en la vista de union
    if(msg.includes('Codigo no válido') || msg.includes( 'Código no válido')
       || msg.includes('Codigo no valido')  ) {
        return 'El código actual no corresponde a ningún Equipo. Revisa que lo hayas escrito tal cual como te lo compartieron(respeta los caracteres capitalizados)';
    }
    // || msg.toLowerCase().includes('invalid')  En las pruebas manuales. Solo revisas cuando parece que funciona.
    // Mientras que en las pruebas unitarias dado exactamente la entrada tendrá que devolver exactamente la misma salida

    // Capturar la excepsion de error de credenciales de supabase
    if (msg.includes('Invalid login credentials') || msg.toLowerCase().includes('invalid') && msg.toLowerCase().includes('credential') ) {
        return 'Alguno de sus credenciales es incorrecta. Verique las credenciales e intentalo nuevamente';
    }
    /** ---- ### Correo previamente registrado (doble registro)---- ###  */
    // Supabase devuelve "User already registered" al intentar registrar
    // Un correo que ya existe. Se guia al usuario a iniciar sesión
    if (msg.includes('already registered') || msg.includes('already been registered')) {
        return 'Este correo ya ha sido REGISTRADO. Si es tuyo, inicia sesión en lugar de Registrarte.'
    }

    // Cualquier otro
    return 'Ocurrió un error al guardar. Intenté Guardar nuevamente..';
}
import { describe, expect, it } from "vitest";
import { errorsTranslate } from "@/helpers/traslateErrors";

 describe('errorsTranslate', () => {
    it('traduce errores de credenciales al castellano', () => {
        const error = { message: 'Invalid login credentials'}

        // CUANDO: lo pasamos por la  traduccion
        const resultado = errorsTranslate(error)

        // Se ESPERA: Que el texto hable credenciales incorrectas (no solo Inglés crudo)
        expect(resultado).toContain('credencial')
    })

    it('traduce el error del código de equipo inexistente', () => {
        const error = {message: 'Código no válido'}
        const resultado = errorsTranslate(error);
        expect(resultado).toContain('código')
    })

    it('traduce el error de fecha de fin anterior al principio', () => {
        const error = {message: 'violates check constraint "events_check"'}
        const resultado = errorsTranslate(error);
        expect(resultado).toContain('posterior')
    })

    it('dev. un mensaje genérico para un error desconocido', () => {
        const error = {mesagge: 'paso algo totalmente inesperado xyz123'}
        const resultado = errorsTranslate(error);

        expect(resultado.length).toBeGreaterThan(0)
    })

    it('No truena ni el error viene sin mensaje', () => {
        const resultado = errorsTranslate({})
        expect(typeof resultado).toBe('string');
    })
 } )
import {describe,it, expect, beforeEach} from 'vitest';
import {render, screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import userEvent from '@testing-library/user-event';
import { use } from 'react';


    beforeEach(()=>{
        localStorage.clear()
        document.documentElement.removeAttribute('data-theme');
    })

    describe('-- ThemeToggle Component: Componente que efectua la transición entre temas --', () => {;

        // -------- Prueba 1: estado inicial --------
        // Por defecto arranca en 'light', y en light muestra la luna
        // el icono
    it("Arranca en el modo claro y muestra el emoji de (\\la luna)",async() =>  {
        const user = userEvent.setup()
        render(<ThemeToggle />);
        
         //  Antes de la transicion de obs-claro
        expect(screen.getByText('🌙')).toBeInTheDocument()
    })


    it("Cambia de modo obscuro al hacer clic y muestra el sol: ",async() => {
        // Hacemos click en el boton. lo que encuentra por su rol
            const user = userEvent.setup()
            render(<ThemeToggle />)
        
        // Antes del clic en el modo claro
        expect(screen.getByText('🌙')).toBeInTheDocument()
        
         // Hacemos clic en el botón. getByRole('button') lo encuentra por su rol
         // de accesibilidad, más robusto que buscar por el emoji    
        await user.click(screen.getByRole('button'))
        
        expect(screen.getByText('☀️')).toBeInTheDocument()
        expect(screen.queryByText('🌙 ')).not.toBeInTheDocument()
    })


    //  --- Prueba 3: Efecto secundario sobre el botón del documento ---
    // Concepto nuevo:  probar un EFECTO (useEffect). El componente no solo
    // cambia que se muestra; también escribe data-theme en el <html>
    //  Se verifica el efecto sobre el exterior
     it('Escribe data-theme="dark" en el documento al activar el mode obscuro: ',async() => {
        const user = userEvent.setup()
        render(<ThemeToggle />);

        await user.click(screen.getByRole('button'))
            // Comprobamos su atributo
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    })
})
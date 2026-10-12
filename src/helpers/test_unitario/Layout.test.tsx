import {describe,it, expect} from 'vitest';
import {render, screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import { Layout } from '@/components/Layout';

function renderEnRuta(ruta:string) {
    return render(
        <MemoryRouter  initialEntries={[ruta]} >
            <Layout />
        </MemoryRouter>
    )
}

    describe('Testing para el componente Principal Layout de la App Agend of Teams[Agenda de Equipos]');
    // --- Prueba 1: Renderiza sin detenerse y muestra la marca de Agua --
    it('Se renderiza y muestra la marca "Agenda"...', () => {
        renderEnRuta('/')
        expect(screen.getByText('Agenda')).toBeInTheDocument();
    })
    // --- Prueba 2: Muestra los 5 enlaces de Navegacion (como en la App) --
    it('Muestra los 5 enlaces de navegación..',  ()=>{
        renderEnRuta('/');
        expect(screen.getByText('Mis equipos')).toBeInTheDocument();
        expect(screen.getByText('Calendario')).toBeInTheDocument();
        expect(screen.getByText('Unirse a Equipo')).toBeInTheDocument();
        expect(screen.getByText('Estadísticas')).toBeInTheDocument();
        expect(screen.getByText('Mis Recursos')).toBeInTheDocument();
    })

    // --- Prueba 3: El enlace de la ruta actual, es la parte activa --
    it('\nmarcara como activo el enlace de la ruta actual\t\t', ()=>{
        renderEnRuta('/calendar');
        
        //  El texto "Calendario" vive dentro de un <i>, que vive dentro del <a> (Link).
        // Subimos al <a> más cercano con closest('a') para revisar SU className.
        const textoCalendario = screen.getByText('Calendario')
        const enlace = textoCalendario.closest('a')

        // El enlace activo debe tener la clave 'nav-link--active' como clase real
        // no pegada a otra. toHveClass lo busca como independiente.
        expect(enlace).toHaveClass('nav-link--active');
    })

    
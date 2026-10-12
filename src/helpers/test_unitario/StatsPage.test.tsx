import { describe, it,expect , vi } from "vitest";  
import {render, screen} from '@testing-library/react'
import { userEvent } from "@testing-library/user-event"

// --- MOCKEAR A LOS HIJOS
// Remplazar el TeamSelector y Daashboard por versiones falsas y simples.
//  Al hacerlo, cortamos TODAS sus dependencias(useQuery, Supabase, Chart.js):
// ninguno llama ya esas cosas, así que el StatsPage queda aislado y NO
// necesita QueryClientProvider ni ningún otro provider

// El componente 'TeamSelector' falso: un botón que, al pulsarlo, simula que el usuario
// eligió el equipo "equipo-1" (x ejemplo) invocando a onChange. Así podemos disparar el 
// cambio de estado del StatsPage desde el test

    vi.mock('@/components/Dashboard', ()=> ({
            Dashboard: (  {teamId}: {teamId: string} ) => (
            <div>Dashboard del equipo: {teamId} </div>
        ),
    }))

    vi.mock('@/components/TeamSelector', ()=> ({
        TeamSelector: ({ onChange}: {onChange: (id: string) => void}) => (
            <button onClick={() => onChange ('equipo-1') }>Elegir equipo(falso) </button>
        ),
    }))


    import { StatsPage } from "@/routes/StatsPage";    

    describe('StasPage Component' , () => {
        it('Muestra el mensaje de "selecciona un Equipo", cuando no hay equipo ', () => {
            render( <StatsPage />);

            expect(
                screen.getByText('Selecciona un equipo para ver sus estadísticas.')
            ).toBeInTheDocument();
        })
        
        it('monta el Dashboard al elegir un equipo', async () => {
        const user = userEvent.setup()
        render( <StatsPage /> );

        await user.click(screen.getByText('Elegir equipo(falso)'));
        
        expect(screen.getByText('Dashboard del equipo: equipo-1')).toBeInTheDocument()

        expect(screen.queryByText('Selecciona un equipo para ver sus estadísticas.'))
        
        })
    })

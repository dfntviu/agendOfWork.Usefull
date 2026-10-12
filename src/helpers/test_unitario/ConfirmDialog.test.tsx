import { describe, it,expect , vi } from "vitest";  
import {render, screen} from '@testing-library/react'
import { userEvent } from "@testing-library/user-event"
import { ConfirmDialog } from "@/components/ConfirmDialog";


 describe('Prueba Unitaria 02 - Componente: Cuadro de Dialogo de Confirmación', () => {
    

    it('No se muestra nada cuando open es false ', () => {
        render(<ConfirmDialog 
            open={false}
            message="¿Seguro"
            onConfirm={() => {}}
            onCancel={() => {}}
        />)
        expect(screen.queryByText('¿Estás seguro?')).not.toBeInTheDocument()
    })

        // ---Prueba # 2: Si=Verdadero, mustra el mensaje y los botones ---
   it('muestra del mensaje y los botones cuando es open es verdadero ', () => {
        render(<ConfirmDialog 
            open={true}
            message="Borrar el Evento?"
            confirmLabel="Si, borrar"
            onConfirm={() => {}}
            onCancel={() => {}}
        />)

        expect(screen.getByText('Borrar el Evento?')).toBeInTheDocument();
        expect(screen.getByText('Si, borrar')).toBeInTheDocument();
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
    })

        // ---Prueba # 3: Al hacer clic en confirmar, se llama onConfirm --
    it('Invoca a onConfirm al hacer click en el botón de confirmar', async () => {
        const onConfirm = vi.fn()
        const user = userEvent.setup()

        render(
            <ConfirmDialog
               open={true}
            message="¿Estás seguro?"
            confirmLabel="Confirmar"
            onConfirm={onConfirm}
            onCancel={() => {}}
            />
        )
            // se simulo el clic real del usuario en el boton confirmar
        await user.click(screen.getByText('Confirmar'));

         expect(onConfirm).toHaveBeenCalledTimes(1);
    })
        // Prueba # 4: Al hacer click en cancelar, se llama onCancel (no a onConfirm)
    it('llama al Evento Cancelar (onCancel), y no al OnConfirm', async () => {
        const onConfirm = vi.fn()
        const onCancel = vi.fn()
        const user = userEvent.setup()

        render(
            <ConfirmDialog
               open={true}
            message="Seguro?"
            confirmLabel="Confirmar"
            cancelLabel="Cancelar"
            onConfirm={onConfirm}
            onCancel={onCancel} 
            />
        )
            // se simulo el clic real del usuario en el boton confirmar
        await user.click(screen.getByText('Cancelar'));

        expect(onCancel).toHaveBeenCalledTimes(1) 
        expect(onConfirm).not.toHaveBeenCalledTimes();  // el boton confirmar, no debe dispararse.
         
    })

})

import { describe, it,expect , vi } from "vitest";  
import {render, screen} from '@testing-library/react'
import { userEvent } from "@testing-library/user-event"
import { Skeleton, SkeletonList } from "@/components/Skeleton";
  

    describe('SkeletonList', () => {
        //---  Test  Unitario # 1: Renderiza la cantidad de filas indicadas ---
        it('renderiza 3 filas cuando rows=3', ()=>{
            const {container} = render(<SkeletonList rows={3}/>);

            const filas = container.querySelectorAll('.skeleton-row')
            expect(filas).toHaveLength(3)
        })
        //---  Test  Unitario # 2: El número es dinamico, reacciona a la prop ---
        // Con otro valor deberá cambiar la cuenta. Esta es la prueba del Array.from({length: rows})
        // de verdad usa las propiedades: con la f(n) prop
        it('Renderizar 5 filas cuando permanecen 5 filas' , ()=>{
            const {container} = render(<SkeletonList rows={5}/>);

            const filas = container.querySelectorAll('.skeleton-row')
            expect(filas).toHaveLength(5)
        });    

        describe('Skeleton', () => {
            // --- Prueba 3: Aplica los estilos que recibe por props---
            // El Skeleton base escribe width/height/borderRadius en el atributo style
            // Verficamos que un prop concreta llega  al DOM

            it('Aplica el height recibido por el prop', () => {
                const {container} = render(<Skeleton height="44px"/>)

                const span = container.querySelector('.skeleton') as HTMLElement
                expect(span).toHaveStyle({height: '44px'})
            })
        })
    })

    
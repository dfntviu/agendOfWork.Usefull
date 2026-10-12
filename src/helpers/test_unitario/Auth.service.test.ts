import { describe, it, expect, vi, beforeEach}  from "vitest";


vi.mock('@/lib/supabase', () => ({
    supabase: {
        auth: {
            signUp: vi.fn(),
            signInWithPassword:vi.fn(),
            signOut: vi.fn(),
            getSession: vi.fn()
        },
    },
}))

import { authService } from '@/services/auth.service'
import {supabase} from '@/lib/supabase'
 
    beforeEach(()=> {
        vi.clearAllMocks()
    })

    describe('authService', () => {
         
         // --- Prueba  # 1: signIn llama a signInWithPassword con los datos correctos --- 
        it('signIn llama a supabase con el e-mail y password correctos', () => {
            authService.signIn('dgomez@mail.com','secret321')

            // Verificar que el metodo correcto fue llamado...
            expect(supabase.auth.signInWithPassword).toHaveBeenCalledTimes(1)

            // ...y con el objeto {correo, password} bien armado (fijo)
            expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
                email: 'dgomez@mail.com',
                password: 'secret321',
            })
        })

        // --- Prueba # 2: signIn llama a signInWithPassword con los datos correctos --- 
        it('signUp llama a supabase con el email y el password correctos', () =>{
            authService.signUp('newemail@mail.com','clavesecreta456')
            
             expect(supabase.auth.signUp).toHaveBeenCalledWith({
                email: 'newemail@mail.com',
                password: 'clavesecreta456',
             })
        })

        // --- Prueba # 3: signOut llama a sigOut de Supabase --- 
        it('signOut [cierre de sesión] de supabase ', () => {
            authService.signOut()

            expect(supabase.auth.signOut).toHaveBeenCalledTimes(1)
        })
    })
 
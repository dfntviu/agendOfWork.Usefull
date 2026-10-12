import { useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import { authService } from '@/services/auth.service'
import { ThemeToggle } from '@/components/ThemeToggle'
 import './LoginPage.css';  // ## debe de perm. en el mismo directorio  
import { errorsTranslate } from '@/helpers/traslateErrors';

export function LoginPageBest() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [advise, setAdvice] = useState('')
  const [cargando,setCargando] = useState(false)
  const navigate = useNavigate()


    async function handleSignUp() {
        setError(''); setAdvice(''); setCargando(true);
        const {error,data} = await authService.signUp(email, password);

        setCargando(false);

        if (error)  return setError(errorsTranslate(error));
        // Solución parcheada, porque la opcion automatizada de supabase estaba habilitada.
        if (data?.user && data.user && data.user.identities?.length === 0) {
          return setError('Este correo ya ha sido registrado. Si es tuyo, inicia sesión en lugar de registrarte.')
        }
          setAdvice('El usuario ha sido creado. Ahora inicia sesión.')
    }
          // if(error) return setError(error.message); --> Se cambio, la excepsión sencilla, a un metodo utilitario adecuado
  async function handleLogin() {
    setError(''); setAdvice(''); setCargando(true); 
    const {error} = await authService.signIn(email,password)
    
     setCargando(false);

     if (error)  return setError(errorsTranslate(error));
     
    navigate('/') 
      // if (error) return setError(error.message)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    handleLogin();
  }
  
  return (
    <div className='login-page'>
      {/* Nueva logica especializada, en la experiencia de usuario memorable */}
          <div className='login-topbar'>
             <ThemeToggle/>
          </div>
            
            <form className="login-card" onSubmit={onSubmit}>
                <div className='login-brand'>
                    <h1 className="login-title"> Agenda de Equipos</h1>
                    <p className="login-subtitle">Reserva de Recursos para tú Equipo</p>
                </div>

                <label className="login-field"> 
                    <span className="login-label">Correo</span>
                    <input className='login-input' 
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value) }
                        autoComplete='email'
                    />
                </label>

                <label className='login-field'>
                  <span className='login-label'
                  >Contraseña</span>
                  <input 
                    className="login-input"
                    type="password"
                    value={password}
                    onChange={ e=> setPassword(e.target.value)}
                    placeholder='••••••••'
                    autoComplete='current-password'
                  />
                </label>

                {/* Mensajes de diferenciador por color */}
                {error &&  <p className='login-msg login-msg--error'>{error} </p>}
                {advise &&  <p className='login-msg login-msg--success'>{advise} </p> }

                <div className='login-actions'>
                  <button
                    type='submit'
                    className='btn btn--primary'
                    disabled={cargando}
                  >
                      {cargando ? 'Ingresando...' : 'Ingresar'}
                  </button>
                  <button 
                  type='button'
                  className='btn btn--secondary'
                  onClick={handleSignUp}
                  disabled={cargando}
                  >
                    Registrarse
                  </button>
                </div>
            </form>
        {/* </div> */}
    </div>
  )
}
 // import { ThemeToggle } from '@/components/Themetoggle'
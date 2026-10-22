import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'
import { ThemeToggle } from '@/components/ThemeToggle'; 
import './Layout.css';
  
  // NOTA: TODO scrpit que modifique en App.tsx también será modificado en NAV (ya que es una especie de archivo gemelo).
  // Si algun alias no converge segun corresponda su posicion(ULT - PRIM | PRIM - ULT) ROMPERA su navegación
const NAV = [
  { to: '/dash-page',          label: 'Mis equipos',  icon: 'ti-users' },
  { to: '/calendar',  label: 'Calendario',   icon: 'ti-calendar' },
  { to: '/teams',      label: 'Unirse a Equipo',   icon: 'ti-user-plus' },  //Añadido, perfiles de Supabase
  { to: '/dashboard', label: 'Estadísticas', icon: 'ti-box' }, // Añadido, recientemente
  { to: '/resources', label: 'Mis Recursos', icon: 'ti-box' },
]

export function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
      // console.log('La barra de Navegación es funcional'); [inhabilitado]
  async function handleLogout() {
    await authService.signOut()
    navigate('/login')
  }
  // no ma era un error de escritura (por eso me pase revisando, cada archivo CSS que le corresponde)
  return (
    <div className='layout'>
      <nav className='sidebar'>
        {/* Marca */}
        <div className='sidebar-brand'>
          <div className='sidebar-brand-icon'>
            <i className="ti ti-calendar-event" style={{ fontSize: '16px', color: '#fff' }} />
          </div>
          <span className="sidebar-brand-name" >Agenda</span>
        </div>
        
        <div className='sidebar-nav'>
          { NAV.map(item => {
          const activo = location.pathname === item.to
          return (
            <Link key={item.to} 
                to={item.to}
                className={`nav-link ${activo ? 'nav-link--active' : ''}`} >
                  <i className={`ti ${item.icon} `}>
                     {item.label}
                  </i>
            </Link>
          ) 
        })}
        </div>
          {/* Deteccion de la linea 41, por las pruebas unitarias hacia falta un espacio en blaco. Por ende, la interfaz no aplica la clase CSS */}
       <div className='sidebar-footer' >
          <ThemeToggle />
           <button className='nav-link nav-link--logout' onClick={handleLogout}>
              <i className="ti ti-logout"></i>
              <span className="nav-link-label">Salir</span> 
           </button>
        </div> 
      </nav>
      <main className='content' >
        <Outlet />
      </main>
    </div>
    // style={{ fontSize: '15px', fontWeight: 500, color: '#fff' }}
  )
}

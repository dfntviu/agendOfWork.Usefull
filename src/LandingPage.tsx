// Script LandingPage correctamente transformado. 
// En caso de no solventar el uso mediante AuthContex regresar la
// configuración aplicada en el script App.tsx y mandar al rounting publico 
// a LandingPage.tsx o bien comentarla
    // NOTA: NO APLICAR COMMIT HASTA RESOLVER LA NAVEGACION
    // SI SE LLEGARÁ A ERRARSE, TENDRÁ QUE REGRESARSE AL COMMIT DEL: 12 DE SEPT. DEL 2026.
        // TITULADO : 'solvate mistake of Vercell'
 import './langindPage.css'; // Estilos para atributo de JSX
 import { Link } from 'react-router-dom';
  // import { LoginPageBest } from '@/routes/LoginPageBetter'

 export  function LandingPage () {
    
        function toggleTheme() {
             const root = document.documentElement;
          const current = root.getAttribute('data-theme')
          const isBlack = current ? current === 'dark' 
                    : window.matchMedia('prefers-color-scheme').matches
            
            root.setAttribute('data-theme', isBlack ? 'light' : 'dark')
        } //#Cierre de f(n) general
        // document.getElementById('enter').addEventListener('click', function(e){
        //    e.preventDefault();
      
    return(
        <main>
            <section className="wrap hero">
            <span className="eyebrow">App Full-Stack React + Supabase</span>
            <h1>Las oficinas no organizan sus recursos. Está app<span>Si</span>.</h1>
            <p className="lede">Agenda de Equipos centraliza las reservas de recurso compartidos salas, proyectores, vehículos — 
                y organiza los eventos del equipo sin choques. Todo a la mano, y lo mejor: se gestiona quién entra y quién no, 
                con permisos por rol.</p>
                <div className="cta-row">
                    <Link to="/login" className='btn btn-primary'>
                    Ingresar. a la App  
                    {/* <a href="" className="btn btn-primary" onClick={LoginPageBest}>Entrar a la App */} 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
                    strokeLinejoin="round">
                        <path  d="M5 12h14M13 6l6 6-6 6"></path>    
                    </svg>
                    </Link>
                    {/* </a> */}
                </div>
                <p className="demo-card">
                  <b>demo_usuario_26@demo.seed</b>
                   <b>.contraseña</b>
                   <b>Demo1234!  </b>
                </p>
            </section>
            <section className="wrap">
            <div className="problem">
                <div className="problem-grid">
                <div>
                    <h2>El problea real, y crece con el equipo</h2>
                    <p>Una oficina mediana agenda juntas, viajes y capacitaciones en un pizarrón o en la cabeza de alguien.
                    Funciona con cinco personas. Con veinte, se rompe.
                    </p>
                    <p>Dos equipos reservan la misma sala. El proyector desaparece. Nadie sabe qué está apartado ni quién lo aparto. 
                    Una agenda física no persiste, no se comparte, y no sabe quién tiene permiso de tocarla.
                    </p>
                </div>
                <div className="chaos">
                    <div className="chaos-item"><span>Dos juntas en la misma sala, a la misma hora.</span></div>
                    <div className="chaos-item"><span>¿Quién tiene el proyector?, en el chat, otra vez.</span></div>
                    <div className="chaos-item"><span>La agenda se construyó en una libreta o se pierde</span></div>
                    <div className="chaos-item"><span>Cualquiera borra el evento de cualquiera</span></div>
                </div>
                </div>
            </div>
            </section>

            <section className="wrap">
              <div className="section-label">
                <div className="feats">
                  <article className="fast">
                    <div className="ico">
                    <svg viewBox="0 0 24 24" fill="none"  stroke="currentColor" strokeWidth="2.2"  strokeLinecap="round" strokeLinejoin="round"> 
                        <rect  x="3" y="4"  width="18" height="18" rx="2"/>
                        <path  d="M16 2v4M8 2v4M3 10h18"/></svg>                   
                    </div>
                    <h3>Centralizado y sin choques</h3>
                    <p>Reservas y Eventos de un calendario que todo el equivo visualiza. Sin recurso ya está ocupado, el sistema lo rechaza antes de que lo duplique</p>
                    {/* <!-- <span className="note"> //</span> --> */}
                  </article>
                </div>
              </div>
            </section>

        <section className="wrap">
          <div className="section-label">
            <div className="shots">
              <figure className="shot">
                <div   className="shot-frame"> 
                  <div className="placeholder">Mis equipos<code>/docs/03_Teams.join_view.webp</code></div>
                  <img src="/docs/03_Teams.join_view.webp" alt="Mís Equipos" /> 
                </div>
                <figcaption className="shot-cap">
                  <span className="n">
                    <div>
                      <h4>Mis Equipos</h4>
                      <p>Crea equipos, únete por código de invitación y gestiona miembros.</p>
                    </div>
                  </span>
                </figcaption>
              </figure>
            </div>  
          </div>

            <figure className="shot">
                <div className="shot-fame">
                    <div className="placeholder"> Calendario <code>/docs/02_Calendar.view.webp</code>
                    <img src="/docs/02_Calendar.view.webp" alt="Capt. de la Vista_Calendario" /> 
                    </div>
                <figcaption className="shot-cap">
                    <span className="n">02</span>
                    <div>
                    <h4>
                        <p>Eventos de equipo en el mes, con el recurso reservado y al día de hoy resaltado.</p>
                    </h4>
                    </div>
                </figcaption>
                </div>
             </figure>

            <figure className="shot">
              <div className="shot-frame">
                <div className="placeholder">Estadistícas<code>/docs/04_Statistics.view.webp</code></div>
                <img src="/docs/04_Statistics.view.webp" alt="Capt. de la Vista_Estadistícas" />
              </div>
              <figcaption className="shot-cap">
                <span className="n">
                  <span>03
                    <div>
                      <h4>Estadísticas</h4>
                      <p>Un tablero con los eventos por recurso. De un vistazo, qué se usa y qué no</p>
                    </div>
                  </span>
                </span>
              </figcaption>
          </figure>
        </section>

        <section className="wrap">
          <div className="eng">
            <h2>Escrito a mano, con enfoque para mostrarse en producción</h2>
              <p>Todo el código se escribió a mano, con fines de aprendizaje. No es un prototipo de tutorial:
                está testeado, es accesible, y está desplegado.</p>

              <div className="stack">
                <span className="chip">React + TypeScript</span>
                <span className="chip">Supabase PostgreSQL + RLS</span>
                <span className="chip">TanStack Query</span>
                <span className="chip">23 pruebas automatizados</span>
                <span className="chip">Responsive</span>
                <span className="chip">Desplegado en Vercel</span>
              </div>
          </div>
           <button className='theme-btn' onClick={toggleTheme}>Tema</button>
        </section>

        <footer className="wrap">
            <span>Proyecto para Portfolio Daniel Gómez Pérez, Toluca México</span>
            <span><a href="https://github.com/dfntviu" target="_black" rel="noopener"></a></span>
        </footer>
     </main>
    ) //#Cierre de JSX#
} //#Cierre de  la f(n) del archivo  LandinPage JSX#
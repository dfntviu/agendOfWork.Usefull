import { useState } from 'react'
import { useEvents } from '../hooks/useEvents'
import { useDeleteEvent } from '../hooks/useDeleteEvent'
import { TeamSelector } from '../components/TeamSelector'
import { CalendarView } from '../components/CalendarView'
import { CreateEventForm } from '../components/CreateEventForm'
import { EditEventForm } from '../components/EditEventForm'
import { EventDetailModal } from '../components/EventDetailModal' //new_1 verificar los datos
 import { useProfiles } from '../hooks/useProfiles' 
 import { useResources } from '../hooks/useResources'
  import { ConfirmDialog } from '@/components/ConfirmDialog'  //* Libreria nueva -> Use of final user


export function CalendarPage() {
   const [detalleDelEvento, setdetalleDelEvento] = useState <any |null>(null); //change_1
  const [teamId, setTeamId] = useState('')
  // const [initialDate, setInitialDate] = useState('')
  const [editingEvent, setEditingEvent] = useState<any | null>(null)

  // nuevas variables p/los detalles del evento
  const {data: profiles =[] } = useProfiles()
  const {data: resources = [] } = useResources(teamId)

  const { data: events = [], isLoading } = useEvents(teamId)
  const deleteEvent = useDeleteEvent(teamId)
  // Posterior a hooks, aniadimos los diccionarios p/acelerar su busqueda
  const nombrePorId = profiles.reduce((acc: any, p: any) => {
    acc[p.id] = p.displayname
    return acc;
  }, {})

  const recursosPorId = resources.reduce((acc: any, r: any) => {
    acc[r.id] = r.name
    return acc;
  }, {})
  
  const [eventoABorrar,setEvetoABorrar] = useState<any | null>(null);
  /** function handleDayClick(date: Date) {
    const pad = (n: number) => String(n).padStart(2, '0')
    const local = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T09:00`
    //setInitialDate(local)
  } **/

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <TeamSelector value={teamId} onChange={setTeamId} />
      </div>

      {!teamId ? (
        <p>Selecciona un equipo para ver su calendario.</p>
      ) : isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="calendar-layout">
          <div>
            {/* Se quito valor */}
            <CreateEventForm teamId={teamId} />  
            <ul className="event-list">
              {/* Validacion en caso de inexistencia de evento */}
              {events.length===0 &&(
                <li className="event-list-empty">Aún no hay Eventos. Crea el primero por medio del formulario</li>)
              }   
              {events.map((ev: any) => (
                <li key={ev.id} className="event-item" >
                  <span className="event-item-title" onClick={() => setdetalleDelEvento(ev)} title='Ver detalle' >
                    {ev.title}
                  </span>
                  <div className="event-item-actions">
                    <button className="btn-sm btn-sm--edit" onClick={() => setEditingEvent(ev)}>Editar</button>
                     <button className="btn-sm btn-sm--delte" onClick={() => setEvetoABorrar(ev)}>Borrar</button>
                    {/* <button className="btn-sm btn-sm--edit" onClick={() => deleteEvent.mutate(ev.id)}>Borrar</button> */}
                  </div>
                </li>
              ))}
            </ul>
            {editingEvent && (
              <EditEventForm teamId={teamId} event={editingEvent} onDone={() => setEditingEvent(null)} />
            )}
          </div>  {/* Se quito Evento */}
          <CalendarView events={events} />
        </div>
      )}

      {/* El modal, al final, se muestra cuando hay un evento seleccionado */}
      <EventDetailModal
        event={detalleDelEvento}
        onClose={() => setdetalleDelEvento(null)}
        nombrePorId={nombrePorId}
        recursoPorId={recursosPorId}
      />

      {/* El nuevo componente de Cuadro de Dialogo (Interactivo) */}
      <ConfirmDialog  open={!!eventoABorrar}
        title="Borrar Evento"
        message={`¿Estás seguro de que deseas Borrar "${eventoABorrar?.title}?. Está acción será irreversible" `} 
        confirmLabel="Sí, borrar"
         danger
         onConfirm={()=> { 
           deleteEvent.mutate(eventoABorrar.id)
           setEvetoABorrar(null)
         }}
         onCancel={() => setEvetoABorrar(null)  }
      />
    </div>
  )
  // <button className="btn-sm btn-sm--edit" onClick={() => deleteEvent.mutate(ev.id)}>Borrar</button> se remplazo por el borrado interactivo
  // style={{ cursor: 'pointer' }}
}

// El error permanecía en la administracion de Supase y no en la Arquitectura de Desarrollo
// Es importante mejorar el olfato full.stack, para mapear sobre la capa correcta del Sistema completo
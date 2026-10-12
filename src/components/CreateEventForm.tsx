import { useState } from 'react'
import { useResources } from '../hooks/useResources'
import { useCreateEvent } from '../hooks/useCreateEvent'
 // nuevas librerias modulares, utiles p/fungir correctamente como: 'nme_caracter/function"
 import { useMembers } from '../hooks/useMembers'
 import { useProfiles } from '../hooks/useProfiles'
  // F(n)s auxiliar para desplegar errores en espaniol
 import { errorsTranslate } from '../helpers/traslateErrors'
  import './CreateEventForm.css';


export function CreateEventForm({ teamId }: { teamId: string }) {
  const { data: resources } = useResources(teamId)
  const createEvent = useCreateEvent(teamId)

  const [title, setTitle] = useState('')
  const [resourceId, setResourceId] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')

  // 2.Traer los miembros y perfiles, y un estado para el asignado (dentro del componente, con los otros):
   const {data: members = []} = useMembers(teamId)
   const {data: profiles = []} = useProfiles()
   const [assignedTo,setAssignedTo] = useState('')

  // diccionario para los nombres (mismo para el patron d costumbre)
  const nombrePorId = profiles.reduce((acc: any, p: any) => {
    acc[p.id] = p.displayname  //estarizado BD y la Arquitectura
      return acc;
  }, {})


  function handleSubmit() {
    createEvent.mutate(
      { resourceId, title, startsAt, endsAt,assignedTo },
      { onSuccess: () => { setTitle(''); setResourceId(''); setStartsAt(''); setEndsAt(''); setAssignedTo('') } }
    )
  }

  return (
    <div className="event-form">
       <h3 className="event-form-title">Nuevo Evento</h3>

       <label className="field">
        <input  className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título del evento" />
      </label>

      <label className="field">
          <span className="field-label">Recurso</span>
      {/* selector poblado desde recursos reales: previene id fantasma */}
        <select className="input" value={resourceId} onChange={e => setResourceId(e.target.value)}>
         <option value="">Elige un recurso</option>
          {resources?.map((r: any) => (
           <option key={r.id} value={r.id}>{r.name} ({r.type})</option>
         ))}
        </select>
      </label>
      
      <label className="field">
      <label className="field-label" >Asignar a:</label>
      <select  className="input" value={assignedTo} onChange={e => setAssignedTo(e.target.value)} >
        <option  value="">Sin Asignar</option>
          {members.map((m: any)=> (
            <option key={m.id} value={m.user_id}>
               {nombrePorId[m.user_id]|| 'Desconocido'}
            </option> 
          ))}
      </select>
      </label>

      <label className="field">
        <span className="field-label">Inicio:</span>
       <input className="input" type="datetime-local" value={startsAt} onChange={e => setStartsAt(e.target.value)} />
      </label>
        
    <label className="field">
      <label className="field-label">Fin:</label>
      <input className="input" type="datetime-local" value={endsAt} onChange={e => setEndsAt(e.target.value)} />
    </label>

      <button 
        className="btn btn--primary"
        onClick={handleSubmit}
        disabled={createEvent.isPending || !title || !resourceId || !startsAt || !endsAt || !assignedTo}
      >
        {createEvent.isPending ? 'Creando...' : 'Crear evento'}
      </button>
          {/* Se modifico de un mensage comun a un helper como funcion personalizada de errores en castellano*/}
      {createEvent.isError && <p className="form-error">Error: { errorsTranslate(createEvent.error) || 'Algo salio mal'}</p>}
    </div>
  )
}

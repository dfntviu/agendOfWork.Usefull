import { useState } from 'react'
import { useUpdateEvent } from '../hooks/useUpdateEvent'
import { useMembers } from '../hooks/useMembers'
import { useProfiles } from '../hooks/useProfiles'
import { errorsTranslate } from '../helpers/traslateErrors'
import './CreateEventForm.css'  // reutiliza clases del formulario de crear

interface EventItem { id: string; title: string; starts_at: string; ends_at: string; assigned_to: string | null }

export function EditEventForm({
  teamId, event, onDone,
}: { teamId: string; event: EventItem; onDone: () => void }) {
  const updateEvent = useUpdateEvent(teamId)
  const { data: members = [] } = useMembers(teamId)
  const { data: profiles = [] } = useProfiles()

  const [title, setTitle] = useState(event.title)
  const [startsAt, setStartsAt] = useState(toLocalInput(event.starts_at))
  const [endsAt, setEndsAt] = useState(toLocalInput(event.ends_at))
  const [assignedTo, setAssignedTo] = useState(event.assigned_to || '')

  const nombrePorId = profiles.reduce((acc: any, p: any) => {
    acc[p.id] = p.displayname
    return acc
  }, {})

  function handleSave() {
    updateEvent.mutate(
      { eventId: event.id, changes: { title, startsAt, endsAt, assignedTo } },
      { onSuccess: onDone }
    )
  }

  return (
    <div className="event-form event-form--edit">
      <h3 className="event-form-title">Editar evento</h3>

      <label className="field">
        <span className="field-label">Título:</span>
        <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
      </label>

      <label className="field">
        <span className="field-label">Asignar a:</span>
        <select className="input" value={assignedTo} onChange={e => setAssignedTo(e.target.value)}>
          <option value="">Sin asignar</option>
          {members.map((m: any) => (
            <option key={m.id} value={m.user_id}>
              {nombrePorId[m.user_id] || 'Desconocido'}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field-label">Inicio</span>
        <input className="input" type="datetime-local" value={startsAt} onChange={e => setStartsAt(e.target.value)} />
      </label>

      <label className="field">
        <span className="field-label">Fin</span>
        <input className="input" type="datetime-local" value={endsAt} onChange={e => setEndsAt(e.target.value)} />
      </label>

      <div className="event-form-actions">
        <button
          className="btn btn--primary"
          onClick={handleSave}
          disabled={updateEvent.isPending || !title || !startsAt || !endsAt}
        >
          {updateEvent.isPending ? 'Guardando…' : 'Guardar'}
        </button>
        <button className="btn btn--secondary" onClick={onDone}>Cancelar</button>
      </div>

      {updateEvent.isError && (
        <p className="form-error">{errorsTranslate(updateEvent.error) || 'Algo salió mal'}</p>
      )}
    </div>
  )
}

function toLocalInput(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

 // 1. style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '320px', border: '1px solid #ccc', padding: '12px', borderRadius: '8px' }}
 //2 style={{ display: 'flex', gap: '8px' }}
 /* <strong>Editar evento</strong> */
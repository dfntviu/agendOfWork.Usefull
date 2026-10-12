import { use, useEffect } from 'react'

import './EventDetailModal.css'

interface EventDetailModalProps {
  event: any
  onClose: () => void
  nombrePorId: any
  recursoPorId: any
}

export function EventDetailModal({ event, onClose, nombrePorId, recursoPorId }: EventDetailModalProps) {
  // ---- Accesibilidad: cerrar con la tecla Escape ----
  
  // Los hooks SIEMPRE se mostrarán antes de cualquier return condicional
  useEffect(()=>{
     function  handleKeyESC(e: KeyboardEvent){
       if (e.key === 'Escape') onClose() 
     }  
    // Comenzar el evento al presionar
      document.addEventListener('keydown', handleKeyESC);
      // Quitar el evento despues de soltar
      return () => document.removeEventListener( 'keydown', handleKeyESC)
  }, [onClose])
  
  // El return condicional va DESPUÉS de los hooks.
  if (!event) return null

  const fmt = (iso: string) => new Date(iso).toLocaleString()

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} 
         role='dialog' aria-modal="true" aria-labelledby='modal-title-id'> 
        <h2 className="modal-title" id='modal-title-id'>{event.title}</h2>
        {/* Usuarios discapacitados: Activar con Windows + Ctrl + Enter */}
        <dl className="modal-data">
          <div className="modal-row">
            <dt>Recurso</dt>
            <dd>{recursoPorId[event.resource_id] || 'Sin recurso'}</dd>
          </div>
          <div className="modal-row">
            <dt>Creado por</dt>
            <dd>{nombrePorId[event.created_by] || 'Desconocido'}</dd>
          </div>
          <div className="modal-row">
            <dt>Inicio</dt>
            <dd>{fmt(event.starts_at)}</dd>
          </div>
          <div className="modal-row">
            <dt>Fin</dt>
            <dd><time dateTime={event.starts_at}> {fmt(event.ends_at)}</time></dd>
          </div>
          <div className="modal-row">
            <dt>Asignado a</dt>
            <dd>{nombrePorId[event.assigned_to] || 'Sin asignar'}</dd>
          </div>
        </dl>

        <button className="modal-close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}
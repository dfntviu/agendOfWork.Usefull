import { useEffect } from 'react';
import '../styles/Confirm.Dialog.css';

 interface ConfirDialogProps {
    open: boolean;
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    danger?: boolean;
    onConfirm: () => void
    onCancel: () => void
 }

  /**Dialogo de confirmación reutilizable 
   * No se sabe QUÉ se confirma; solo se pregunta y avisa al padre.
   * Se usa igual para "borrar evento" que para "expulsar miembro" 
  */
  
   export function ConfirmDialog(
    {
     open, title='¿Estás seguro?',
     message, confirmLabel='Confirmar',
     cancelLabel='Cancelar', danger = false,
     onConfirm, onCancel,
    } : ConfirDialogProps){
      // ---- Accesibilidad: cerrar con Escape ----
      // Hook ANTES del return condicional (regla de hierro de los hooks).
        useEffect(()=>{
             function handleEsc(e: KeyboardEvent){
                if (e.key === 'Escape') onCancel()
             }
            document.addEventListener('keydown',handleEsc)
            
            return () => document.removeEventListener('keydown',handleEsc)
        }, [onCancel])
        
        if (!open) return null;
        
        return (
            <div className="confirm-overlay-diag" onClick={onCancel} role="dialog" aria-modal="true" aria-labelledby="confirm-title-id">
                <div className="confirm-card" onClick={e => e.stopPropagation()}>
                    <h3 className="confirm-title" id='confirm-title-id'> {title} </h3>
                    <p className="confirm-message">  {message} </p>
                    <div className="confirm-actions">
                        <button className="confirm-btn confirm-btn--cancel" onClick={onCancel}> {cancelLabel} </button>
                        <button className={`confirm-btn ${danger ? 'confirm-btn--danger' : 'confirm-btn--primary'}`} onClick={onConfirm}> {confirmLabel} </button>
                    </div>
                </div>
            </div>
        )
   }    
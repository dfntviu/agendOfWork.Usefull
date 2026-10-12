import './classes/Skeleton.css'

 interface SkeletonProps {
    width?: string
    height?: string
    radius?: string   //x ejemp a: 8px con radio al: 50% (circulo)
    clasName?: string
 }


  /**
   * 
   * Skeleton — el bloque gris animado que se ocupa en lugar del contenido
   * mientras carga. Transmite la sensación de inmediatez. Reutilizable: una linea,
   * un avatar, una tarjeta ... todo se compone con varios Skeleton.
   */
 export function Skeleton({width = '100%',
                    height = '16px',
                    radius ='6px',
                    clasName = ''}: SkeletonProps) {
                    
            return (
                <span className={`skeleton ${clasName}`}
                    style={{width, height, borderRadius: radius}}
                    aria-hidden="true"
                ></span>
            )
 }

 /**
  * Lista Skeleton — Varias filas de skeleton, para listas (miembros, eventos...).
  * @returns 
  */
  export function SkeletonList({rows= 3}: {rows: number}) {
                    
            return (
                <div className="skeleton-list">
                    {Array.from({length: rows}).map( (_,i) => (
                        <div key={i} className='skeleton-row'>
                        <Skeleton height="44px" radius="8px" />
                        </div>
                    )
                )}
                </div>
            )
 }
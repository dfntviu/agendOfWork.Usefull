  import { useMyTeams } from '@/hooks/useMyTeams'
  import './Team.Selector.css'; /**estilos del selector */
  import { Skeleton } from '@/components/Skeleton';
    
  export function TeamSelector({
    value, onChange,
  }: { value: string; onChange: (teamId: string) => void }) {
    const { data: teams, isLoading } = useMyTeams()
  
    if (isLoading) return <Skeleton width='220px' height='40px' radius='8px' />
    if (!teams || teams.length === 0) return <p className="selector-msg">No perteneces a ningún equipo aún.</p>
    return (
      <select  className="team-selector"
        value={value} onChange={e => onChange(e.target.value)}>
        <option value="">Elige un equipo</option>
        {teams.map((t: any) => <option key={t.id} value={t.id}>{t.name}</option>)}
      </select>
    )
  }

//  <p className="selector-msg">Cargando equipos...</p>

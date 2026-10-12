import { useState } from 'react'
import { TeamSelector } from '../components/TeamSelector'
import { useMyTeams } from '../hooks/useMyTeams'
import { useMembers } from '../hooks/useMembers'
import { useProfiles } from '../hooks/useProfiles'
import { useJoinTeam } from '../hooks/useJoinTeam'
import { useRemoveMember } from '../hooks/useRemoveMember'
import { useUpdateRole } from '../hooks/useUpdateRole'
import { useAuth } from '../context/AuthContext' 
import { errorsTranslate } from '@/helpers/traslateErrors'  //capturar los bugs (si es que existen) o excepsiones 
  import { SkeletonList } from '@/components/Skeleton'  /**listado de miembros */
import { ConfirmDialog } from '@/components/ConfirmDialog' //logic of eject of member a theam
import './Theme.page.css'  //estilos aplicados a la view de Join of Teams  [TeamPage]


export function TeamPage() {
  const { session } = useAuth()
  const miUserId = session?.user?.id

  const [teamId, setTeamId] = useState('')
  const [codigoInput, setCodigoInput] = useState('')
  // Expulsar miembro
  const [miembroAExpulsar, setMiembroAExpulsar] = useState<any|null>(null);

  const { data: teams = [] } = useMyTeams()
  const { data: members = [],isLoading: isLoagingMembers, isPlaceholderData } = useMembers(teamId)
  const { data: profiles = [] } = useProfiles()

  const updateRole = useUpdateRole(teamId)
  const removeMember = useRemoveMember(teamId)

  const myMember = members.find((m: any) => m.user_id === miUserId)
  const ImAdmin = myMember?.role === 'owner' || myMember?.role === 'admin'

  const joinTeam = useJoinTeam()
  const equipoActual = teams.find((t: any) => t.id === teamId)

  const nombrePorId = profiles.reduce((acc: any, p: any) => {
    acc[p.id] = p.displayname
    return acc
  }, {})

  function handleJoin() {
    joinTeam.mutate(codigoInput, { onSuccess: () => setCodigoInput('') })
  }

  return (
    <div className="team-page">
      <h1 className="page-title">Mi equipo</h1>

      {/* unirse a un equipo con código */}
      <div className="team-card">
        <h3 className="team-card-title">Unirse a un equipo</h3>
        <div className="join-row">
          <input
            className="input"
            value={codigoInput}
            onChange={e => setCodigoInput(e.target.value)}
            placeholder="Código de invitación"
          />
          <button
            className="btn btn--primary"
            onClick={handleJoin}
            disabled={joinTeam.isPending || !codigoInput}
          >
            {joinTeam.isPending ? 'Uniéndose…' : 'Unirse'}
          </button>
        </div>  
        {/* Fue modificado para mantener un error personalizado, de no aceptacion */}
          {joinTeam.isError && <p className="form-error">{errorsTranslate(joinTeam.error)}</p>}
      </div>
      
      {/* seleccionar equipo para ver detalles */}
      <div className="team-selector-wrap">
        <TeamSelector value={teamId} onChange={setTeamId} />
      </div>

      {equipoActual && (
        <div className="team-detail">
          {/* código del equipo */}
          <div className="invite-code">
            <span className="invite-code-label">Código para invitar</span>
            <code className="invite-code-value">{equipoActual.code}</code>
          </div>

          {/* lista de miembros */}
          <h3 className="members-title">Miembros</h3>
              {isLoagingMembers  ? (
                <SkeletonList rows={3}/>
              ): (  
                 // Efecto de desvanicimiento fino, despliega un toque sutil al desvanecer el cambio de registros a otros, la espera se hace tolerante
          <ul className="members-list" style={{opacity: isPlaceholderData ? 0.6:1, transition: 'opacity 0.15s'}}>
            {members.map((m: any) => {
              const esYo = m.user_id === miUserId
              const puedeGestionar = ImAdmin && m.role !== 'owner' && !esYo
              return (
                <li key={m.id} className="member-item">
                  <span className="member-name">
                    {nombrePorId[m.user_id] || 'Desconocido'}
                    {esYo && <span className="member-you"> (tú)</span>}
                  </span>
                  <span className={`member-role member-role--${m.role}`}>{m.role}</span>

                  {puedeGestionar && (
                    <div className="member-actions">
                      {m.role === 'member' ? (
                        <button
                          className="btn-sm btn-sm--edit"
                          onClick={() => updateRole.mutate({ membershipId: m.id, newRole: 'admin' })}
                        >
                          Hacer admin
                        </button>
                      ) : (
                        <button
                          className="btn-sm btn-sm--edit"
                          onClick={() => updateRole.mutate({ membershipId: m.id, newRole: 'member' })}
                        >
                          Hacer member
                        </button>
                      )}
                      <button
                        className="btn-sm btn-sm--delete"
                        onClick={() => setMiembroAExpulsar(m)}
                      >
                        Expulsar
                      </button>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>)}
        </div>
      )}

      <ConfirmDialog 
        open={!!miembroAExpulsar}
        title="Explulsar a miembro"
        message={`¿Estas seguro de expulsar a: ${nombrePorId[miembroAExpulsar?.user_id] || 'este miembro'} del equipo `}
        confirmLabel="Si expulsar"
        danger
         onConfirm={() =>{
            removeMember.mutate(miembroAExpulsar.id)
            setMiembroAExpulsar(null)
         }}
         onCancel={() => setMiembroAExpulsar(null)}
      />
      {/* {joinTeam.isError && <p className="form-error">{String(joinTeam.error)}</p>} */}
      {/* <button
                        className="btn-sm btn-sm--delete"
                        onClick={() => removeMember.mutate(m.id)}
                      >
                        Expulsar */}
    </div>
  )
}
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
} from 'chart.js'
import { useEvents } from '@/hooks/useEvents'
import { useProfiles } from '@/hooks/useProfiles'
 import { useResources } from '@/hooks/useResources' //temporal

// import { title } from 'process'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function Dashboard({ teamId }: { teamId: string }) {
  const { data: events = [] } = useEvents(teamId)
  const { data: resources = [] } = useResources(teamId)
    // const { data: profiles = [] } = useProfiles()
    
    // quitar cuando sea funcional
  // console.log('EVENTOS:', events)        // (inhabilitado) ← agrega esto
  //console.log('RECURSOS:', resources)    //  (inhabilitado) ← /temporal
    //temporal_2 [x2]
  // console.log('UN RECURSO CRUDO:', resources[0]); (inhabilitado)
  const conteoPorRecurso = events.reduce((acc: any, ev: any) => {
      if (ev.resource_id) acc[ev.resource_id] = (acc[ev.resource_id] || 0) + 1
      return acc
  }, {})

    /**
      *  const conteoPorUsuario = events.reduce((acc: any, ev: any) => {
      acc[ev.created_by] = (acc[ev.created_by] || 0) + 1
      return acc
    }, {})
    */
 
  const nombrePorId = resources.reduce((acc: any, r: any) => {
     acc[r.id] = r.name
    return acc
  }, {})
     // acc[p.id] = p.display_name

  const ids = Object.keys(conteoPorRecurso)
  const labels = ids.map(id => nombrePorId[id] || 'Desconocido')
  const valores = ids.map(id => conteoPorRecurso[id])

  // console.log('DICCIONARIO (claves=r.id) => ', nombrePorId); #(inhabilitado)#
  // console.log('IDs del conteo (recursos x ID: ) => ', ids);  #(inhabilitado)#

  const data = {
    labels: labels,
    datasets: [
      { label: 'Eventos por miembro', data: valores, backgroundColor: '#3b82f6', borderRadius: 6, },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
      plugins:{
        legend: {display: false},
        title: {display: true, text: 'Eventos por Recurso', font: {size: 16}},
        tooltip:{
           callbacks:{
              label:(ctx: any) => ` ${ctx.parsed.y} ${ctx.parsed.y === 1 ? 'evento' : 'eventos'}`,
           },
        },
      },
      scales: {
        y: {beginAtZero: true, ticks:{precision:0}},
      },
  }
  
  /** Si la grafica aún no tiene ningun recurso registrado. Por lo que, no hay nada que graficar*/
  if (ids.length===0) {
    return (
       <p className="selector-msg">Este equipo aún NO TIENE eventos con recursos reservados.</p>
    )
  }

  return (
    <div style={{ maxWidth: '600', height: '400' }}>
        <Bar data={data} options={options}/>
    </div>
  )
}

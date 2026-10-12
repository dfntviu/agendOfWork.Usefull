import { getMonthGrid } from '@/lib/calendar'

interface EventItem {
  id: string
  title: string
  starts_at: string
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function MonthCalendar({
  year, month, events,
}: { year: number; month: number; events: EventItem[] }) {
  const days = getMonthGrid(year, month)
  const weekdays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const today = new Date(); //

  return (
    <div>
      <div className="cal-weekdays">
        {weekdays.map(d => (
          <div key={d} className="cal-weekday">{d}</div>
        ))}
      </div>

      <div className="cal-grid">
        {days.map((day, i) => {
          const dayEvents = events.filter(ev => isSameDay(new Date(ev.starts_at), day.date))
          const isToday = isSameDay(day.date,today)

          const clases = [
             'cal-cell',
             day.isCurrentMonth ? '' : 'cal-cell-muted',
             isToday ? 'cal-cell-today' : '',
             dayEvents.length > 0 ? 'cal-cell--has-events' : '',
          ].filter(Boolean).join(' ')

          return (
            <div key={i} className={clases} >
              <div className="cal-daynum" >{day.dayNumber}</div>
              {dayEvents.map(ev => (
                <div key={ev.id} className="cal-event" title={ev.title} >
                  {ev.title}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
      // style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '4px' }}
  // style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}
  // style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}}
  // style={{
  //             minHeight: '80px', padding: '6px', border: '1px solid #e0e0e0', borderRadius: '6px',
  //             color: day.isCurrentMonth ? '#1a1a1a' : '#bbb',
  //             background: day.isCurrentMonth ? '#fff' : '#f7f7f7',
  //           }}
  // style={{
  //                 fontSize: '0.7rem', background: '#3b82f6', color: '#fff',
  //                 borderRadius: '4px', padding: '1px 4px', marginTop: '2px',
  //                 overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  //               }}
  )
}

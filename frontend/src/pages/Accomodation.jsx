import { api } from '../../api';
import { Card, Load, useAsync, Badge, Table, Empty, PageHead } from '../../components/ui';
import { fmtDate, fmtTime, floorName } from '../../util';

export default function Accommodation() {
  const acc = useAsync(() => api.get('/accommodations/me'), []); const log = useAsync(() => api.get('/entry-exit/me'), []);
  return (
    <>
      <PageHead title="My Accommodation" />
      <Load state={acc}>{(d) => (
        <>
          <Card title="Current allocation">
            {!d.current ? <Empty text="You have not been allocated a room yet. The hostel office will assign one after enrollment." /> : (
              <dl className="kv">
                <dt>Hostel</dt><dd>{d.current.room.hostel.name} ({d.current.room.hostel.code})</dd>
    
               <dt>Floor</dt><dd>{floorName(d.current.room.floor)}</dd>
                <dt>Room</dt><dd>{d.current.room.roomNumber} · {d.current.room.roomType} (capacity {d.current.room.capacity})</dd>
                <dt>Status</dt><dd><Badge>{d.current.status}</Badge></dd>
                <dt>Start date</dt><dd>{fmtDate(d.current.startDate)}</dd>
                {d.current.room.hostel.location && <><dt>Location</dt><dd>{d.current.room.hostel.location}</dd></>}
              </dl>)}
          </Card>
          {d.history.length > 0 && <Card title="Previous allocations"><Table rows={d.history} cols={[
            { h: 'Hostel', r: (r) => r.room.hostel.name }, { h: 'Room', r: (r) => r.room.roomNumber }, { h: 'From', r: (r) => fmtDate(r.startDate) }, { h: 'To', r: (r) => fmtDate(r.endDate) }, { h: 'Status', r: (r) => <Badge>{r.status}</Badge> }]} /></Card>}
        </>)}</Load>
      <Card title="My entry / exit history"><Load state={log}>{(rows) => <Table rows={rows} empty="No entry/exit records yet." cols={[
        { h: 'Exit', r: (r) => fmtTime(r.exitAt) }, { h: 'Entry', r: (r) => fmtTime(r.entryAt) }, { h: 'Status', r: (r) => <Badge>{r.status}</Badge> }, { h: 'Late return', r: (r) => (r.lateReturn ? <Badge tone="red">Late</Badge> : '—') }]} />}</Load></Card>
    </>
  );
}




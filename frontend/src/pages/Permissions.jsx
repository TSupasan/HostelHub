import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { api } from '../services/studentApi';
import { Card, Load, useAsync, Badge, Table, Btn, FormModal, Input, Select, Textarea, useForm, PageHead, useAction } from '../components/ui';
import { fmtDate, toInputDate } from '../services/util';

function NewRequest({ onClose }) {
  const today = toInputDate(new Date());
  const { v, bind } = useForm({ type: 'Home Visit', fromDate: today, toDate: today, reason: '' });
  return (
    <FormModal title="Request permission" onClose={onClose} done="Request sent to the warden" submitText="Send request" onSubmit={() => api.post('/permissions', v)}>
      <Select label="Type" options={['Home Visit', 'Town Visit', 'Other']} {...bind('type')} />
      <div className="two"><Input label="From" type="date" min={today} {...bind('fromDate')} required /><Input label="To" type="date" min={v.fromDate || today} {...bind('toDate')} required /></div>
      <Textarea label="Reason" {...bind('reason')} required maxLength={1000} />
    </FormModal>
  );
}
export default function Permissions() {
  const st = useAsync(() => api.get('/permissions/me'), []); const [sp, setSp] = useSearchParams(); const [add, setAdd] = useState(sp.get('new') === '1');
  const act = useAction(st.reload);
  return (
    <>
      <PageHead title="Permissions" sub="Ask your warden for leave, home visits or town visits." action={<Btn onClick={() => setAdd(true)}><Plus size={16} /> Request permission</Btn>} />
      <Card><Load state={st}>{(rows) => <Table rows={rows} empty="No permission requests yet." cols={[
        { h: 'Type', r: (r) => <strong>{r.type}</strong> }, { h: 'From', r: (r) => fmtDate(r.fromDate) }, { h: 'To', r: (r) => fmtDate(r.toDate) }, { h: 'Reason', r: (r) => r.reason },
        { h: 'Status', r: (r) => <Badge>{r.status}</Badge> }, { h: 'Remarks', r: (r) => r.remarks || '—' },
        { h: '', r: (r) => r.status === 'Pending' && <Btn kind="ghost" className="sm" onClick={() => act(() => api.patch(`/permissions/${r._id}/cancel`), 'Request cancelled')}>Cancel</Btn> }]} />}</Load></Card>
      {add && <NewRequest onClose={(ch) => { setAdd(false); setSp({}); if (ch) st.reload(); }} />}
    </>
  );
}

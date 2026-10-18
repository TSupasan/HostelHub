import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { api } from '../../api';
import { Card, Load, useAsync, Badge, Table, Btn, FormModal, Input, Select, Textarea, useForm, PageHead } from '../../components/ui';
import { fmtDate } from '../../util';

function NewComplaint({ onClose }) {
  const { v, bind } = useForm({ title: '', description: '', category: 'Electrical', priority: 'Medium' });
  return (
    <FormModal title="Submit a complaint" onClose={onClose} done="Complaint submitted" submitText="Submit" onSubmit={() => api.post('/complaints', v)}>
      <Input label="Title" {...bind('title')} required maxLength={120} />
      <div className="two"><Select label="Category" options={['Electrical', 'Plumbing', 'Room', 'Other']} {...bind('category')} /><Select label="Priority" options={['Low', 'Medium', 'High']} {...bind('priority')} /></div>
      <Textarea label="Description" {...bind('description')} required maxLength={2000} />
    </FormModal>
  );
}
export default function Complaints() {
  const st = useAsync(() => api.get('/complaints/me'), []); const [sp, setSp] = useSearchParams();
  const [add, setAdd] = useState(sp.get('new') === '1');
  return (
    <>
      <PageHead title="Complaints & Maintenance" sub="Report problems with your room or the hostel and follow their progress." action={<Btn onClick={() => setAdd(true)}><Plus size={16} /> New complaint</Btn>} />
      <Card><Load state={st}>{(rows) => <Table rows={rows} empty="You have not submitted any complaints." cols={[
        { h: 'Title', r: (r) => <strong>{r.title}</strong> }, { h: 'Category', r: (r) => r.category }, { h: 'Priority', r: (r) => <Badge>{r.priority}</Badge> },
        { h: 'Submitted', r: (r) => fmtDate(r.submittedAt) }, { h: 'Status', r: (r) => <Badge>{r.status}</Badge> }, { h: 'Response', r: (r) => r.remarks || '—' }]} />}</Load></Card>
      {add && <NewComplaint onClose={(ch) => { setAdd(false); setSp({}); if (ch) st.reload(); }} />}
    </>
  );
}

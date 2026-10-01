import { useState } from 'react';

// fields: [{ name, label, type: 'text' | 'textarea' | 'select' | 'date', options?, required? }]
export default function FormModal({ title, fields, submitLabel, onSubmit, onClose }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.type === 'select' ? f.options[0] : '']))
  );
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await onSubmit(values);
      onClose();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <form
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={submit}
      >
        <h2>{title}</h2>

        {fields.map((f) => (
          <label key={f.name} className="modal-field">
            {f.label}
            {f.type === 'textarea' ? (
              <textarea rows={4} value={values[f.name]} onChange={set(f.name)} required={f.required} />
            ) : f.type === 'select' ? (
              <select value={values[f.name]} onChange={set(f.name)}>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input type={f.type} value={values[f.name]} onChange={set(f.name)} required={f.required} />
            )}
          </label>
        ))}

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? 'Saving...' : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const set = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setBusy(true);
    try {
      await login(form.username, form.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={submit}>
        <img src="/logo.svg" alt="University of Vavuniya crest" className="login-logo" />
        <h1>HostelHub</h1>
        <p className="uni">UNIVERSITY OF VAVUNIYA</p>

        <div className="field">
          <User size={17} className="lead" aria-hidden="true" />
          <input
            type="text"
            placeholder="Username"
            aria-label="Username"
            autoComplete="username"
            value={form.username}
            onChange={set('username')}
            required
          />
        </div>

        <div className="field">
          <Lock size={17} className="lead" aria-hidden="true" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            aria-label="Password"
            autoComplete="current-password"
            value={form.password}
            onChange={set('password')}
            required
          />
          <button
            type="button"
            className="eye"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        <div className="forgot-row">
          <button
            type="button"
            className="link-btn"
            onClick={() => setInfo('Contact the hostel office to reset your password.')}
          >
            Forgot Password?
          </button>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}
        {info && <p className="form-info" role="status">{info}</p>}

        <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
          {busy ? 'Logging in...' : 'Login'}
        </button>

        <p className="legal">
          By logging in, you agree to the university's IT Security Policy. Secure connection verified.
        </p>
      </form>
    </main>
  );
}

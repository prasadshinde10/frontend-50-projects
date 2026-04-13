import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, loginUser, registerUser } from '../redux/authSlice';

const AuthPage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(clearAuthError());

    if (isLogin) {
      dispatch(loginUser({ email: form.email, password: form.password }));
      return;
    }

    dispatch(registerUser(form));
  };

  if (user) {
    return <p>You are logged in as {user.name}.</p>;
  }

  return (
    <section className="form-page">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={onSubmit} className="form">
        {!isLogin && (
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
        )}
        <input
          required
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
        />
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <button type="button" onClick={() => setIsLogin((value) => !value)} className="link-button">
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </section>
  );
};

export default AuthPage;

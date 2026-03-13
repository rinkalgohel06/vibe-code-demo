'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type UserRole = 'doctor' | 'patient';

type MessageState = {
  type: 'error' | 'success';
  text: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [message, setMessage] = useState<MessageState | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          full_name: fullName
        },
        emailRedirectTo: `${location.origin}/auth/callback`
      }
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
      return;
    }

    if (data.session) {
      router.replace('/dashboard');
      router.refresh();
      return;
    }

    setMessage({ type: 'success', text: 'Check your email to confirm your account.' });
    setLoading(false);
  }

  return (
    <>
      <div className="auth-header">
        <span className="pill">Create account</span>
        <h1>Get started</h1>
        <p className="muted">Choose your role to unlock the right workspace.</p>
      </div>
      {message ? <div className={`message ${message.type}`}>{message.text}</div> : null}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="form-field">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(event) => setRole(event.target.value as UserRole)}
          >
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <div className="form-footer">
        <span className="muted">
          Already have an account?{' '}
          <Link className="link" href="/auth/sign-in">
            Sign in
          </Link>
        </span>
      </div>
    </>
  );
}

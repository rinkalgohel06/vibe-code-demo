'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type MessageState = {
  type: 'error' | 'success';
  text: string;
};

export default function UpdatePasswordPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<MessageState | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        setMessage({
          type: 'error',
          text: 'This reset link has expired. Please request a new one.'
        });
      }
    });
  }, [supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
      return;
    }

    setMessage({ type: 'success', text: 'Password updated. Redirecting...' });
    router.replace('/dashboard');
    router.refresh();
  }

  return (
    <>
      <div className="auth-header">
        <span className="pill">Set new password</span>
        <h1>Update your password</h1>
        <p className="muted">Choose a strong password for your account.</p>
      </div>
      {message ? <div className={`message ${message.type}`}>{message.text}</div> : null}
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="password">New password</label>
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
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update password'}
        </button>
      </form>
      <div className="form-footer">
        <Link className="link" href="/auth/sign-in">
          Back to sign in
        </Link>
      </div>
    </>
  );
}

'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

type MessageState = {
  type: 'error' | 'success';
  text: string;
};

export default function ForgotPasswordPage() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<MessageState | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/callback?next=/auth/update-password`
    });

    if (error) {
      setMessage({ type: 'error', text: error.message });
      setLoading(false);
      return;
    }

    setMessage({ type: 'success', text: 'Check your email for a reset link.' });
    setLoading(false);
  }

  return (
    <>
      <div className="auth-header">
        <span className="pill">Reset password</span>
        <h1>Forgot your password?</h1>
        <p className="muted">We will email you a secure reset link.</p>
      </div>
      {message ? <div className={`message ${message.type}`}>{message.text}</div> : null}
      <form className="form" onSubmit={handleSubmit}>
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
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Sending link...' : 'Send reset link'}
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

'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callbackError = searchParams.get('error');
  const redirectedFrom = searchParams.get('redirectedFrom');
  const displayMessage =
    message ?? (callbackError ? 'We could not complete sign in. Please try again.' : null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const safeRedirect =
      redirectedFrom && redirectedFrom.startsWith('/') ? redirectedFrom : '/dashboard';
    router.replace(safeRedirect);
    router.refresh();
  }

  return (
    <>
      <div className="auth-header">
        <span className="pill">Sign in</span>
        <h1>Welcome back</h1>
        <p className="muted">Access doctor and patient workspaces securely.</p>
      </div>
      {displayMessage ? <div className="message error">{displayMessage}</div> : null}
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
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <div className="form-footer">
        <Link className="link" href="/auth/forgot-password">
          Forgot password?
        </Link>
        <span className="muted">
          New here?{' '}
          <Link className="link" href="/auth/sign-up">
            Create account
          </Link>
        </span>
      </div>
    </>
  );
}

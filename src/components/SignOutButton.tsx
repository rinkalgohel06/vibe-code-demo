'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function SignOutButton() {
  const supabase = createSupabaseBrowserClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    await supabase.auth.signOut();
    router.replace('/auth/sign-in');
    router.refresh();
  }

  return (
    <button className="btn ghost" type="button" onClick={handleSignOut} disabled={loading}>
      {loading ? 'Signing out...' : 'Sign out'}
    </button>
  );
}
